import {LOGIN_MODES} from '../utils/appConstants';

export const initialState = {
  app: {
    emitter: null,
    isLoading: false,
    auth: {
      accessToken: '',
      email: '',
      isLoggedIn: false,
      loginMode: '',
      departmentId: '',
      deviceName: '',
    },
  },
  profile: {
    id: '',
    companyName: '',
    email: '',
    industry: '',
    name: '',
    phone: '',
    status: '',
    subscriptionId: '',
    subscriptionStartDate: '',
    titlePosition: '',
    profilePic: '',
    videoTitle: '',
    video: '',
  },
  location: {
    storeLocations: [],
    storeLocationVideos: [
      {
        id: 101,
        name: 'Locaton One',
        videoUrl:
          'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        video: '',
      },
      {
        id: 102,
        name: 'Locaton Two',
        videoUrl:
          'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        video: '',
      },
      {
        id: 103,
        name: 'Locaton Three',
        videoUrl:
          'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        video: '',
      },
      {
        id: 104,
        name: 'Locaton Four',
        videoUrl:
          'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        video: '',
      },
    ],
  },
  department: {
    storeDepartments: [],
  },
  device: {
    storeDevices: [],
    deviceData: {},
  },
  login: {
    loginErrors: {
      email: '',
      password: '',
    },
  },
  shopVideoPreview: {
    shopVideoTitle: '',
    shopVideo: null,
  },
  chat: {
    zim: null,
    chatMap: {},
    isZimLoggedIn: false,
    userMap: {},
    user: {
      userName: '',
      userID: '',
      extendedData: 'My extendedData',
      userAvatar: '',
    },
  },
  call: {
    callQueue: [
      // {
      //   storeId: '25',
      //   shopperId: '1',
      //   shopperName: 'Sohel Patel',
      //   departmentId: '1',
      //   departmentCallerId: 'd1',
      //   callId: 'rn1234567',
      //   callStartTime: '10:00 am',
      // },
      // {
      //   storeId: '25',
      //   shopperId: '2',
      //   shopperName: 'Rakesh Sarkar',
      //   departmentId: '2',
      //   departmentCallerId: 'd2',
      //   callId: 'rn0987654',
      //   callStartTime: '11:00 am',
      // },
    ],
  },
  subscription: {
    alreadyAddedDeviceCount: 0,
    deviceBaseLimit: 0,
    perDeviceFee: 0,
    perDeviceFeeAboveBaseLimit: 0,
  },
};
