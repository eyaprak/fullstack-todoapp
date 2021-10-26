import axios from 'axios';
import { createContext, useEffect, useReducer } from 'react';
import TodoListReducer from './TodoListReducer';
const initialState = {
  todoList: [],
  isFetching: false,
  isSorting: false,
  sort: JSON.parse(localStorage.getItem('sort')) || 'asc',
  error: null,
};

export const TodoListContext = createContext();

const TodoListProvider = ({ children }) => {
  const [state, dispatch] = useReducer(TodoListReducer, initialState);

  const getTodoList = async () => {
    dispatch({ type: 'GET_TODOLIST_START' });
    try {
      const { data } = await axios.get(
        '/api/todolist' + (state.sort === 'asc' ? '?sort=asc' : '?sort=desc'),
        {
          headers: {
            'x-auth-token': JSON.parse(localStorage.getItem('user')).token,
          },
        }
      );

      dispatch({ type: 'GET_TODOLIST_SUCCESS', payload: data });
    } catch (err) {
      if (err?.response.status === 401) localStorage.setItem('user', null);
      dispatch({ type: 'GET_TODOLIST_ERROR', payload: err.response.data });
    }
  };

  const addTodo = async (todo) => {
    dispatch({ type: 'ADD_TODO_START' });
    try {
      const { data } = await axios.post('/api/todolist', todo, {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': JSON.parse(localStorage.getItem('user')).token,
        },
      });
      dispatch({
        type: 'ADD_TODO_SUCCESS',
        payload: data,
      });
    } catch (err) {
      if (err.response.status === 401) localStorage.setItem('user', null);
      dispatch({ type: 'ADD_TODO_ERROR', payload: err.response.data });
    }
  };

  const removeTodo = async (id) => {
    dispatch({ type: 'REMOVE_TODO_START' });
    try {
      await axios.delete('/api/todolist/' + id, {
        headers: {
          'x-auth-token': JSON.parse(localStorage.getItem('user')).token,
        },
      });
      dispatch({ type: 'REMOVE_TODO_SUCCESS', payload: id });
    } catch (err) {
      if (err.response.status === 401) localStorage.setItem('user', null);
      dispatch({ type: 'REMOVE_TODO_ERROR', payload: err.response.data });
    }
  };

  const updateTodo = async (todo) => {
    dispatch({ type: 'UPDATE_TODO_START' });
    try {
      const { data } = await axios.put('/api/todolist/' + todo.id, todo, {
        headers: {
          'x-auth-token': JSON.parse(localStorage.getItem('user')).token,
        },
      });
      dispatch({ type: 'UPDATE_TODO_SUCCESS', payload: data });
    } catch (err) {
      if (err.response.status === 401) localStorage.setItem('user', null);
      dispatch({ type: 'UPDATE_TODO_ERROR', payload: err.response.data });
    }
  };

  const sortTodoList = (params) => {
    localStorage.setItem('sort', JSON.stringify(params));
    dispatch({ type: 'SORT_TODOLIST_SUCCESS', payload: params });
  };

  const clearErrors = () => {
    dispatch({ type: 'CLEAR_ERRORS' });
  };

  return (
    <TodoListContext.Provider
      value={{
        test: 1,
        todoList: state.todoList,
        isFetching: state.isFetching,
        isSorting: state.isSorting,
        error: state.error,
        sort: state.sort,
        getTodoList,
        addTodo,
        removeTodo,
        sortTodoList,
        updateTodo,
        clearErrors,
      }}
    >
      {children}
    </TodoListContext.Provider>
  );
};

export default TodoListProvider;
