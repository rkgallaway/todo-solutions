import { useContext } from 'react';
import { Link } from 'react-router-dom'
import { AuthContext } from '../../Context/Auth';
import Login from '../Login';

import './styles.scss';

const Header = ({ incomplete }) => {
  const { isLoggedIn, logout } = useContext(AuthContext)

  return (
    <header>
      <nav>
        {
          isLoggedIn ?
            <>
              <Link default to="/" >Home</Link>
              <Link to="/settings">Settings</Link>
              <button onClick={logout}>Logout</button>
            </> :
            <Login />
        }
      </nav>
      <h1>To Do List: {incomplete} items pending</h1>
    </header>
  );
};

export default Header;
