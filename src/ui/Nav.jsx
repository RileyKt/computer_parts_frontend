import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';

export default function Nav({ isLoggedIn }) {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        {!isLoggedIn && <li><Link to="/signup">Signup</Link></li>}
        {!isLoggedIn && <li><Link to="/login">Login</Link></li>}
        {isLoggedIn && <li><Link to="/cart">Cart</Link></li>}
        {isLoggedIn && <li><Link to="/logout">Logout</Link></li>}
      </ul>
    </nav>
  );
}
