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
  login: {
    loginErrors: {
      email: '',
      password: '',
    },
  },
};
