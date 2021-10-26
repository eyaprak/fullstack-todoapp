import { createContext, useEffect, useReducer } from 'react';
import AuthReducer from './AuthReducer';
import axois from 'axios';
import { TodoListContext } from './TodoListContext';
const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  isFetching: false,
  error: null,
};

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const loginUser = async (user) => {
    dispatch({ type: 'GET_USER_START' });
    try {
      const { data } = await axois.post('/api/auth/login', user);
      dispatch({ type: 'GET_USER_SUCCESS', payload: data });
    } catch (err) {
      dispatch({ type: 'GET_USER_ERROR', payload: err.response.data });
    }
  };

  const logoutUser = async () => {
    dispatch({ type: 'LOGOUT_USER' });
  };
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(state.user));
  }, [state.user]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
