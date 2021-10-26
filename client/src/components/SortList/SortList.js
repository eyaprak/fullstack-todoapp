import './sortList.scss';
import { BsSortDownAlt, BsSortUp } from 'react-icons/bs';
import { useContext, useEffect, useState } from 'react';
import { TodoListContext } from '../../context/TodoListContext';

function SortList() {
  const { sortTodoList, sort, getTodoList } = useContext(TodoListContext);

  const sortItems = (e) => {
    e.preventDefault();
    let value = JSON.parse(localStorage.getItem('sort'));
    sortTodoList(value === 'asc' ? 'desc' : 'asc');
  };

  useEffect(() => {
    getTodoList();
  }, [sort]);

  return (
    <div className='sortList' onClick={sortItems}>
      <span>SORT ITEMS</span>
      <BsSortUp
        size={35}
        color='white'
        style={{
          transform:
            JSON.parse(localStorage.getItem('sort')) === 'desc'
              ? 'rotate(0deg)'
              : 'rotate(180deg)',
          transition: '300ms all',
        }}
      />
    </div>
  );
}

export default SortList;
