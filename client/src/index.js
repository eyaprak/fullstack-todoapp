import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './main.scss';
import TodoListProvider from './context/TodoListContext';
import AuthContextProvider from './context/AuthContext';
ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <TodoListProvider>
        <App />
      </TodoListProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
