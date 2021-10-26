import './footer.scss';
import { AiOutlineHome } from 'react-icons/ai';
import { RiLogoutBoxLine } from 'react-icons/ri';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';
import { motion } from 'framer-motion';
function Footer() {
  const { logoutUser } = useContext(AuthContext);
  const clickHandler = (e) => {
    e.preventDefault();
    logoutUser();
  };

  const footerVariants = {
    hidden: {
      y: 100,
    },
    visible: {
      y: 0,
      transition: {
        duration: 2,
        ease: 'easeInOut',
      },
    },
  };
  return (
    <motion.div
      className='footerWrapper'
      variants={footerVariants}
      animate='visible'
      initial='hidden'
    >
      <ul className='footerList'>
        <li className='footerItem' onClick={(e) => clickHandler(e)}>
          <RiLogoutBoxLine size={25} />
          <span>Logout</span>
        </li>
      </ul>
    </motion.div>
  );
}

export default Footer;
