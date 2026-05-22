import { shopVideoActionTypes } from '../actionTypes/actionTypes';
import { emitEvent, setLoading } from './appAction';
import { storeProfile } from './profileActions';
import axiosPrivate from '../config/privateApi';
import { MESSAGE_CONST, SUBSCRIPTION_EVENTS } from '../utils/appConstants';
import showAlertPopup from '../components/AlertComp';
import { buildMultipartVideoFilename } from '../utils/videoUploadFilename';

export const handleVideoSelection = video => {
  return {
    type: shopVideoActionTypes.SET_SHOP_VIDEO,
    payload: video,
  };
};

export const handelVideoTitle = videoTitle => {
  return {
    type: shopVideoActionTypes.SET_SHOP_VIDEO_TITLE,
    payload: videoTitle,
  };
};

export const setShopVideoUploadState = payload => {
  return {
    type: shopVideoActionTypes.SET_SHOP_VIDEO_UPLOAD_STATE,
    payload,
  };
};

export const dismissShopVideoUploadBanner = () => {
  return {
    type: shopVideoActionTypes.DISMISS_SHOP_VIDEO_UPLOAD_BANNER,
  };
};

export const resetShopVideoForm = () => {
  return {
    type: shopVideoActionTypes.RESET_SHOP_VIDEO_FORM,
  };
};

export const handelVideoUpload =
  (storeId, videoTitle, video, options = {}) =>
  async dispatch => {
    const {
      showLoader = true,
      showSuccessPopup = true,
      showErrorPopup = true,
    } = options;
    const uploadRequestStartedAt = Date.now();
    const uploadRequestStartedIso = new Date(
      uploadRequestStartedAt,
    ).toISOString();
    try {
      if (showLoader) {
        dispatch(setLoading(true));
      }
      dispatch(
        setShopVideoUploadState({
          status: 'uploading',
          visible: true,
          message: 'Uploading video in background...',
          videoTitle,
          startedAt: uploadRequestStartedIso,
          completedAt: null,
          error: '',
        }),
      );
      const formdata = new FormData();
      formdata.append('store_id', storeId);
      formdata.append('video_title', videoTitle);
      const videoPartName = buildMultipartVideoFilename(
        video,
        `${videoTitle}_${storeId}`,
      );
      formdata.append('video', {
        uri: video.uri,
        type: video.type,
        name: videoPartName,
        filename: videoPartName,
      });
      console.log('formData', formdata);
      console.log('[video-upload] request_started', {
        endpoint: '/store/upload-video',
        startedAt: uploadRequestStartedIso,
        fileName: video?.fileName || video?.name,
        fileSizeBytes: video?.fileSize,
        durationInSeconds: video?.duration,
        type: video?.type,
        uploadUri: video?.uri,
        usesOriginalFile: true,
      });

      const response = await axiosPrivate.post('/store/upload-video', formdata);
      const uploadRequestEndedAt = Date.now();
      console.log('[video-upload] request_completed', {
        endpoint: '/store/upload-video',
        startedAt: uploadRequestStartedIso,
        completedAt: new Date(uploadRequestEndedAt).toISOString(),
        elapsedMs: uploadRequestEndedAt - uploadRequestStartedAt,
        status: response?.status,
        success: response?.data?.success,
      });

      if (response.data.success === true) {
        console.log(response.data);
        const data = response.data?.data;
        const profileObj = {
          videoTitle: data.video_title,
          video: data.video_url,
        };
        dispatch(storeProfile(profileObj));
        dispatch(resetShopVideoForm());
        dispatch(
          setShopVideoUploadState({
            status: 'success',
            visible: true,
            message: response.data?.message || 'Video uploaded successfully.',
            completedAt: new Date(uploadRequestEndedAt).toISOString(),
            error: '',
          }),
        );
        if (showLoader) {
          dispatch(setLoading(false));
        }
        if (showSuccessPopup) {
          showAlertPopup('Success', response.data?.message, 'Ok');
        }
        return true;
      } else {
        dispatch(
          setShopVideoUploadState({
            status: 'error',
            visible: true,
            message: response.data?.message || 'Video upload failed.',
            completedAt: new Date(uploadRequestEndedAt).toISOString(),
            error: response.data?.message || 'Video upload failed.',
          }),
        );
        if (showLoader) {
          dispatch(setLoading(false));
        }
        if (showErrorPopup) {
          showAlertPopup('Oops', response.data?.message, 'Cancel');
        }
        return false;
      }
    } catch (error) {
      const uploadRequestEndedAt = Date.now();
      console.log('[video-upload] request_failed', {
        endpoint: '/store/upload-video',
        startedAt: uploadRequestStartedIso,
        failedAt: new Date(uploadRequestEndedAt).toISOString(),
        elapsedMs: uploadRequestEndedAt - uploadRequestStartedAt,
        status: error?.response?.status,
        message: error?.message,
      });
      console.log('In upload video catch block');
      console.log(error);
      dispatch(
        setShopVideoUploadState({
          status: 'error',
          visible: true,
          message: error?.message || 'Video upload failed.',
          completedAt: new Date(uploadRequestEndedAt).toISOString(),
          error: error?.message || 'Video upload failed.',
        }),
      );
      if (showLoader) {
        dispatch(setLoading(false));
      }
      const { status, data } = error.response || {};
      if (
        status === 401 &&
        data &&
        'is_subscribed' in data &&
        !data.is_subscribed
      ) {
        dispatch(emitEvent(SUBSCRIPTION_EVENTS.SUBSCRIPTION_ENDED));
      } else if (showErrorPopup) {
        showAlertPopup(
          MESSAGE_CONST.OOPS,
          error?.message,
          MESSAGE_CONST.CANCEL,
        );
      }
      return false;
    }
  };
