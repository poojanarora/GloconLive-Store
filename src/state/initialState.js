import { LOGIN_MODES } from "../utils/appConstants";

export const initialState = {
  app: {
    isLoading: false,
    auth: {
      accessToken: '',
      email: '',
      isLoggedIn: false,
    },
    loginMode: LOGIN_MODES.STORE,
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
};
