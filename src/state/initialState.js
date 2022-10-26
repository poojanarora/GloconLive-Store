export const initialState = {
  app: {
    isLoading: false,
    authConfig: {
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
