import { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  // Access the setIsLoggedIn method passed via Outlet context
  const setIsLoggedIn = useOutletContext(); 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    console.log('Attempting login with:', formData);

    try {
      const response = await fetch(`${import.meta.env.VITE_APP_HOST}/api/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      console.log('Response Status:', response.status);

      if (!response.ok) {
        const { error } = await response.json();
        console.error('Backend Error:', error);
        throw new Error(error || 'An error occurred. Please try again later.');
      }

      const data = await response.json();
      console.log('Login successful:', data);

      // Set the user as logged in
      setIsLoggedIn(true);

      // Navigate to the home page
      navigate('/');
    } catch (error) {
      console.error('Login Error:', error.message);
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <a href="/signup">Sign up</a>
      </p>
    </div>
  );
}
