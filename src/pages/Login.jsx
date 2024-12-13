import { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { setIsLoggedIn } = useOutletContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch(`${import.meta.env.VITE_APP_HOST}/api/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error || 'Login failed');
      }
  
      const { customer_id } = await response.json(); 
      // Store in cookies
      Cookies.set('customer_id', customer_id, { expires: 7 }); 
  
      setIsLoggedIn(true);
      navigate('/');
    } catch (error) {
      console.error('Login Error:', error.message);
      alert(error.message);
    }
  };
  

  return (
    <div>
      <h1>Login</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>Email: <input type="email" name="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required /></label>
        <label>Password: <input type="password" name="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} required /></label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
