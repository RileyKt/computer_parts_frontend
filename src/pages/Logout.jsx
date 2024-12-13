import { useEffect } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';

export default function Logout() {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useOutletContext();

  useEffect(() => {
    const logout = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_APP_HOST}/api/users/logout`, {
          method: 'POST',
          credentials: 'include',
        });

        if (response.ok) {
          setIsLoggedIn(false);
          navigate('/login');
        } else {
          alert('Logout failed. Please try again.');
        }
      } catch (error) {
        console.error('Error during logout:', error);
        alert('An error occurred. Please try again later.');
      }
    };

    logout();
  }, [navigate, setIsLoggedIn]);

  return (
    <div>
      <h1>You have been logged out.</h1>
      <p>
        <Link to="/login">Login</Link> | <Link to="/">Home</Link>
      </p>
    </div>
  );
}
