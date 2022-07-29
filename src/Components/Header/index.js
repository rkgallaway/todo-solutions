import { Link } from 'react-router-dom'
import { AuthContext } from './Context/Auth';

import './styles.scss';
import { useContext } from 'react';

const Header = ({ incomplete }) => {
  const { isLoggedIn, can} = useContext(AuthContext)

  return (
    <header>
      <nav>
        {
        isLoggedIn ? 
        <><Link default to="/" >Home</Link>
        <Link to="/settings">Settings</Link></> :
        <Login />
        }
      </nav>
      <h1>To Do List: {incomplete} items pending</h1>
    </header>
  );
};

export default Header;
