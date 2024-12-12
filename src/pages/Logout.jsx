import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_APP_HOST}/api/users/logout`, {
          method: 'POST',
          credentials: 'include', 
        });

        if (response.ok) {
          alert('You have been logged out.');
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
  }, [navigate]);

  return (
    <div className="container">
      <h1>You have been logged out.</h1>
      <p>
        <a href="/login">Login</a> | <a href="/">Home</a>
      </p>
    </div>
  );
}
