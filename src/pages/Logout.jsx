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
          navigate('/');
        } else {
          alert('Logout failed. Please try again.');
        }
      } catch (err) {
        alert('An error occurred. Please try again later.');
      }
    };

    logout();
  }, [navigate, setIsLoggedIn]);

  return <h1>Logging out...</h1>;
}
