import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_APP_HOST}/api/users/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert('Signup successful! Redirecting to login...');
        navigate('/login');
      } else {
        const errorData = await response.json();
        alert(errorData.error || 'Signup failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during signup:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="container">
      <h1>Signup</h1>
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
            {...register('password', {
              required: 'Password is required',
              minLength: { value: 8, message: 'Password must be at least 8 characters long' },
            })}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>

        <div>
          <label>First Name</label>
          <input
            type="text"
            {...register('first_name', { required: 'First name is required' })}
          />
          {errors.first_name && <p>{errors.first_name.message}</p>}
        </div>

        <div>
          <label>Last Name</label>
          <input
            type="text"
            {...register('last_name', { required: 'Last name is required' })}
          />
          {errors.last_name && <p>{errors.last_name.message}</p>}
        </div>

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
