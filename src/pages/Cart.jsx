import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Cart() {
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    const cart = Cookies.get('cart') || '';
    const productIds = cart ? cart.split(',').map(Number) : [];
  
    if (productIds.length > 0) {
      fetch(`${import.meta.env.VITE_APP_HOST}/api/products/all`)
        .then((response) => {
          if (!response.ok) throw new Error('Failed to fetch products');
          return response.json();
        })
        .then((data) => {
          const cartDetails = productIds.reduce((acc, id) => {
            const product = data.find((p) => p.product_id === id);
            if (product) {
              const existing = acc.find((item) => item.product_id === id);
              if (existing) {
                existing.quantity++;
                existing.total += product.cost;
              } else {
                acc.push({
                  ...product,
                  quantity: 1,
                  total: product.cost,
                });
              }
            }
            return acc;
          }, []);
          setCartProducts(cartDetails);
        })
        .catch((error) => console.error('Error fetching cart products:', error));
    }
  }, []);

  const removeFromCart = (id) => {
    const cart = Cookies.get('cart') || '';
    const updatedCart = cart.split(',').filter((itemId) => Number(itemId) !== id).join(',');
    Cookies.set('cart', updatedCart, { expires: 7 });
    setCartProducts(cartProducts.filter((product) => product.product_id !== id));
  };

  const subTotal = cartProducts.reduce((sum, product) => sum + product.total, 0);
  const tax = subTotal * 0.15; 
  const grandTotal = subTotal + tax;

  if (cartProducts.length === 0) return <p>Your cart is empty.</p>;

  return (
    <div>
      <h1>Your Cart</h1>
      {cartProducts.map((product) => (
        <div key={product.product_id}>
          <img
            src={`${import.meta.env.VITE_APP_HOST}/public/images/${product.image_filename}`}
            alt={product.name}
            style={{ width: '100px' }}
          />
          <h2>{product.name}</h2>
          <p>Price: ${product.cost}</p>
          <p>Quantity: {product.quantity}</p>
          <p>Total: ${product.total.toFixed(2)}</p>
          <button onClick={() => removeFromCart(product.product_id)}>Remove</button>
        </div>
      ))}
      <h3>Subtotal: ${subTotal.toFixed(2)}</h3>
      <h3>Tax: ${tax.toFixed(2)}</h3>
      <h3>Total: ${grandTotal.toFixed(2)}</h3>
      <Link to="/">Continue Shopping</Link>
      <Link to="/checkout">Complete Purchase</Link>
    </div>
  );
}
