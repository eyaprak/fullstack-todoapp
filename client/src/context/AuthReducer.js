const AuthReducer = (state, action) => {
  switch (action.type) {
    case 'GET_USER_START':
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case 'GET_USER_SUCCESS':
      return {
        user: action.payload,
        isFetching: false,
        error: false,
      };
    case 'GET_USER_ERROR':
      return {
        user: null,
        isFetching: false,
        error: action.payload,
      };
    case 'LOGOUT_USER':
      return {
        user: null,
        isFetching: false,
        error: null,
      };
  }
};

export default AuthReducer;
