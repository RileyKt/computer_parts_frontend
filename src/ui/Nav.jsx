import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import './Nav.css'; 

export default function Nav({ isLoggedIn }) {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        {!isLoggedIn && <li><Link to="/signup">Signup</Link></li>}
        {!isLoggedIn && <li><Link to="/login">Login</Link></li>}
        {isLoggedIn && (
          <>
            <li><Link to="/logout">Logout</Link></li>
            <li>
              <Link to="/cart">
                <FaShoppingCart /> Cart
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
