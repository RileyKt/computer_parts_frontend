import { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function Checkout() {
  const { isLoggedIn } = useOutletContext();
  const navigate = useNavigate();

  // Redirect to login if not logged in
  if (!isLoggedIn) {
    return (
      <div>
        <h1>Checkout</h1>
        <p>You need to be logged in to complete a purchase.</p>
        <button onClick={() => navigate('/login')} className="btn btn-primary">
          Login
        </button>
      </div>
    );
  }

  const cart = Cookies.get('cart') || '';
  const productIds = cart ? cart.split(',').map(Number) : [];

  if (!productIds.length) {
    return <p>Your cart is empty. Add items to your cart before proceeding.</p>;
  }

  const [formData, setFormData] = useState({
    street: '',
    city: '',
    province: '',
    country: '',
    postal_code: '',
    credit_card: '',
    credit_expire: '',
    credit_cvv: '',
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch(`${import.meta.env.VITE_APP_HOST}/api/purchases`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          customer_id: 1,
          cart,
        }),
      });

      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error || 'Failed to complete the purchase.');
      }

      // Clear the cart cookie after successful purchase
      Cookies.remove('cart');
      alert('Purchase successful!');
      navigate('/confirmation');
    } catch (error) {
      console.error('Error during checkout:', error.message);
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>Checkout</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Street:
          <input
            type="text"
            name="street"
            value={formData.street}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          City:
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Province:
          <input
            type="text"
            name="province"
            value={formData.province}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Country:
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Postal Code:
          <input
            type="text"
            name="postal_code"
            value={formData.postal_code}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Credit Card:
          <input
            type="text"
            name="credit_card"
            value={formData.credit_card}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Expiry Date:
          <input
            type="text"
            name="credit_expire"
            value={formData.credit_expire}
            onChange={handleChange}
            placeholder="MM/YY"
            required
          />
        </label>
        <label>
          CVV:
          <input
            type="text"
            name="credit_cvv"
            value={formData.credit_cvv}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit" className="btn btn-primary">
          Complete Purchase
        </button>
      </form>
    </div>
  );
}
