export const initialState = {
  app: {
    isLoading: false,
    auth: {
      accessToken: '',
      email: '',
      isLoggedIn: false,
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
  },
  location: [],
  department: [],
  device: [],
  login: {
    loginErrors: {
      email: '',
      password: '',
    },
  },
  shopVideoPreview: {
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
};
