export const initialState = {
  app: {
    isLoading: false,
    auth: {
      accessToken: '',
      storeId: '',
      email: '',
      isLoggedIn: false,
    },
  },
  login: {
    loginErrors: {
      email: '',
      password: '',
    },
  },
};
