import './Header.css';
//import logo from './logo.svg'
import { Link } from 'react-router-dom';
// import HamburgerMenu from "./HamburgerMenu.svg";
/**
 * Our QuizVerse Header!
 */
const Header = (props) => {
  return (
    <header className=".Header-header">
      <nav className="Header-navbar">
        <h1>QuizVerse</h1>
        <ul className="nav-links">
          {/*Coins and streak will be eventually pulled from backend*/}
          <li className="nav-item">
            <Link to="/shop">Current Streak: 3</Link>
          </li>
          <li className="nav-item">
            <Link to="/shop">Coins: 100</Link>
          </li>
          {/*This will be set to the right eventually with css*/}
          <li className="nav-item">
            <Link to="/daily-quiz">Daily Quiz!</Link>
          </li>
          <li className="nav-item">
            <Link to="/my-account">My Account</Link>
          </li>
        </ul>
        {/*These are filler just to be used for current navigation purposes*/}
        <li className="nav-item">
          <Link to="/">Landing</Link>
        </li>
        <li className="nav-item">
          <Link to="/home">Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/items">Items</Link>
        </li>
      </nav>
    </header>
  );
};

// make this component available to be imported into any other file
export default Header;
