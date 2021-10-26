import './todoItem.scss';
import { MdDelete } from 'react-icons/md';
import { TodoListContext } from '../context/TodoListContext';
import { useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';
import { BsFillCheckCircleFill } from 'react-icons/bs';

function TodoItem({ todo: { _id: id, description, status } }) {
  const { removeTodo, isSorting, updateTodo } = useContext(TodoListContext);
  const removeHandler = (e) => {
    e.preventDefault();
    let result = window.confirm('Do you really want to delete this todo?');
    if (result) {
      removeTodo(id);
      toast.success('Task has been removed!');
    }
  };

  const updateHandler = (e) => {
    e.preventDefault();
    let newStatus = status === 'waiting' ? 'done' : 'waiting';
    updateTodo({ id, description, status: newStatus });
    toast.success(
      newStatus === 'waiting' ? 'Task added queue!' : 'Task finished!'
    );
  };

  const listVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 },
    exit: { opactiy: 0, x: -100 },
  };

  return (
    <>
      <motion.li
        initial='false'
        className='todoItem'
        variants={listVariants}
        initial='hidden'
        animate='visible'
        exit={{ opactiy: 0, y: -100 }}
        transition={{
          type: 'spring',
          stiffness: 160,
          ease: 'easeInOut',
        }}
      >
        {isSorting ? (
          <div className='loading'></div>
        ) : (
          <>
            <div className='leftSide'>
              <BsFillCheckCircleFill
                size={22}
                className={status + ' svg'}
                onClick={updateHandler}
              />
              <span className={status}>{description}</span>
            </div>
            <div className='actions'>
              <MdDelete size={22} onClick={removeHandler} />
            </div>
          </>
        )}
      </motion.li>
      {isSorting && <div className='sortingSpinner'></div>}
      <ToastContainer />
    </>
  );
}

export default TodoItem;
