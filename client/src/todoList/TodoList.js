import './todoList.scss';
import TodoItem from '../todoItem/TodoItem';
import { useContext, useEffect } from 'react';
import { TodoListContext } from '../context/TodoListContext';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

function TodoList() {
  const { todoList, isFetching } = useContext(TodoListContext);
  return (
    <div className='todoList'>
      <ul className='list'>
        {isFetching ? (
          <>
            <li className='todoItem'>
              <div className='loading'></div>
            </li>
            <li className='todoItem'>
              <div className='loading'></div>
            </li>
            <li className='todoItem'>
              <div className='loading'></div>
            </li>
          </>
        ) : todoList.length === 0 ? (
          <li className='todoItem'>There is no task. Let's add one.</li>
        ) : (
          todoList.map((todo) => <TodoItem key={todo._id} todo={todo} />)
        )}
      </ul>
    </div>
  );
}

export default TodoList;
