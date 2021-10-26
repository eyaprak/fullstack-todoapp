import TodoActions from '../todoActions/TodoActions';
import TodoList from '../todoList/TodoList';
import SortList from '../components/SortList/SortList';
import './home.scss';
import Footer from '../components/Footer/Footer';
import { motion } from 'framer-motion';
function Home() {
  return (
    <motion.div
      className='homeWrapper'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 2 } }}
      exit={{ opacity: 0 }}
    >
      <TodoActions />
      <SortList />
      <TodoList />
      <Footer />
    </motion.div>
  );
}

export default Home;
