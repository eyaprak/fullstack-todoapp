import './todoActions.scss';
import { MdOutlinePlaylistAdd } from 'react-icons/md';
import { useContext, useState } from 'react';
import { TodoListContext } from '../context/TodoListContext';
import { AuthContext } from '../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function TodoActions() {
  const [task, setTask] = useState('');
  const [error, setError] = useState(false);
  const { addTodo, sortTodoList, sort } = useContext(TodoListContext);
  const { user } = useContext(AuthContext);

  const clickHandler = (e) => {
    e.preventDefault();
    if (task !== '') {
      addTodo({ description: task, status: 'waiting', user: user._id });
      toast.success('New task added!');
      setError(false);
      setTask('');
    } else {
      setError(true);
      toast.error('All fields are required!');
    }
  };

  return (
    <div className='todoActions'>
      <h2 className='title'>TODO LIST</h2>
      <div
        className='innerDiv'
        style={{ boxShadow: error && '0px 0px 36px -10px red' }}
      >
        <form>
          <div className='search'>
            <input
              type='text'
              className='input'
              placeholder='Create a new task'
              onChange={(e) => setTask(e.target.value)}
              value={task}
            />
            <button type='submit' className='icon' onClick={clickHandler}>
              <MdOutlinePlaylistAdd size={26} />
            </button>
          </div>
        </form>
      </div>

      <ToastContainer />
    </div>
  );
}

export default TodoActions;
