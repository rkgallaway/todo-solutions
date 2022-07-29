import { Link } from 'react-router-dom'
import './styles.scss';

const Header = ({ incomplete }) => {

  return (
    <header>
      <nav>
        <Link default to="/" >Home</Link>
        <Link to="/settings">Settings</Link>
      </nav>
      <h1>To Do List: {incomplete} items pending</h1>
    </header>
  );
};

export default Header;
