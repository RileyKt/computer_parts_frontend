import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_APP_HOST}/api/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert('Login successful! Redirecting to home...');
        navigate('/');
      } else {
        const errorData = await response.json();
        alert(errorData.error || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Email</label>
          <input
            type="email"
            {...register('email', { required: 'Email is required' })}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            {...register('password', { required: 'Password is required' })}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>

        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <a href="/signup">Sign up here</a>.
      </p>
    </div>
  );
}
