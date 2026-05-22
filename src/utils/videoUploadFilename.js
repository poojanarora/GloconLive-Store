/**
 * Builds a multipart filename with extension for React Native FormData uploads.
 * Image picker often sets fileName but not name; fallback strings without "." break server-side extension detection.
 */
const MIME_TO_EXT = {
  'video/mp4': 'mp4',
  'video/quicktime': 'mov',
  'video/x-m4v': 'm4v',
  'video/3gpp': '3gp',
};

const hasExtension = filename =>
  typeof filename === 'string' && /\.[a-zA-Z0-9]{2,8}$/i.test(filename.trim());

/** RN / OS sometimes sends type as "video/quicktime; codecs=..." — lookup must use base MIME only. */
const normalizeMime = mime =>
  typeof mime === 'string' ? mime.split(';')[0].trim().toLowerCase() : '';

export function extensionFromMime(mime) {
  const key = normalizeMime(mime);
  return MIME_TO_EXT[key] || '';
}

export function buildMultipartVideoFilename(video, fallbackBase = 'video') {
  const candidates = [
    video?.fileName,
    video?.filename,
    video?.name,
  ].filter(Boolean);

  let picked = '';

  for (const c of candidates) {
    const t = String(c).trim();
    if (t && hasExtension(t)) {
      picked = t;
      break;
    }
    if (t && !picked) {
      picked = t;
    }
  }

  const uri = video?.uri || video?.fileCopyUri || '';
  const uriTail = uri.split('/').pop()?.split('?')[0] || '';
  if (!picked || !hasExtension(picked)) {
    if (uriTail && hasExtension(uriTail)) {
      picked = uriTail;
    }
  }

  const extFromMime = extensionFromMime(video?.type);
  const ext = extFromMime || 'mp4';

  if (!picked) {
    const base = String(fallbackBase || 'video').replace(/\.[^/.]+$/, '');
    return `${base}.${ext}`;
  }

  if (!hasExtension(picked)) {
    const base = String(picked).replace(/\.[^/.]+$/, '');
    return `${base}.${ext}`;
  }

  return picked;
}
