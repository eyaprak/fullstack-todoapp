import './login.scss';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { TodoListContext } from '../context/TodoListContext';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('test@gmail.com');
  const [password, setPassword] = useState('test@gmail.com');
  const [fieldControl, setFieldControl] = useState(false);
  const [mailError, setMailError] = useState(false);

  const { loginUser, error } = useContext(AuthContext);
  const { error: TodoError, clearErrors } = useContext(TodoListContext);

  const emailValidation = (email) => {
    const regex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!email || regex.test(email) === false) {
      setMailError(true);
      return false;
    }
    setMailError(false);
    return true;
  };

  const clickHandler = (e) => {
    e.preventDefault();
    clearErrors();
    if (email === '' || password === '') {
      toast.error('All fields are required.');
      setFieldControl(true);
    } else if (!emailValidation(email)) {
      toast.error('Email is not valid.');
    } else {
      loginUser({ email, password });
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      setFieldControl(true);
      setMailError(true);
    }
    if (TodoError) {
      toast.error(TodoError);
      setMailError(true);
    }
  }, [error, TodoError]);

  return (
    <motion.div
      className='loginWrapper'
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 2 } }}
      exit={{ opacity: 0, y: 500 }}
    >
      <h2 className='title'>LOGIN</h2>
      <form>
        <div className='formGroup'>
          <div className='formInput'>
            <input
              type='text'
              placeholder='Email'
              autoComplete='off'
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              style={{
                boxShadow:
                  (mailError || fieldControl) && '0px 0px 36px -10px red',
              }}
            />
          </div>
          <div className='formInput'>
            <input
              type='password'
              placeholder='Password'
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              style={{ boxShadow: fieldControl && '0px 0px 36px -10px red' }}
              autoComplete='off'
            />
          </div>
          <button className='btn btn-1' onClick={(e) => clickHandler(e)}>
            LOGIN
          </button>
          <span>Don't you have an account?</span>
          <Link to='/register'>
            <button className='btn btn-1'>REGISTER</button>
          </Link>
        </div>
        <ToastContainer />
      </form>
    </motion.div>
  );
}

export default Login;
