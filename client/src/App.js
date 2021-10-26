import { useContext } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import { TodoListContext } from './context/TodoListContext';
import Home from './home/Home';
import Login from './login/Login';
import { AnimatePresence } from 'framer-motion';
import Register from './register/Register';
function App() {
  const { user } = useContext(AuthContext);
  const { error } = useContext(TodoListContext);
  return (
    <Router>
      <AnimatePresence exitBeforeEnter>
        <Switch>
          <Route path='/login' exact>
            {!error && user ? <Redirect to='/' /> : <Login />}
          </Route>
          <Route path='/' exact>
            {error ? (
              <Redirect to='/login' />
            ) : user ? (
              <Home />
            ) : (
              <Redirect to='/login' />
            )}
          </Route>
          <Route path='/register'>
            {!error && user ? <Redirect to='/' /> : <Register />}
          </Route>
        </Switch>
      </AnimatePresence>
    </Router>
  );
}

export default App;
