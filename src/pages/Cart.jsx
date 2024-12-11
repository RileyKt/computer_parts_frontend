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
  

  const subTotal = cartProducts.reduce((sum, product) => sum + product.total, 0);

  if (cartProducts.length === 0) return <p>Your cart is empty.</p>;
  return (
    <div className="container">
      <h1 className="text-center mb-4">Your Cart</h1>
      {cartProducts.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {cartProducts.map((product) => (
                <tr key={product.product_id}>
                  <td style={{ width: '120px' }}>
                    <img
                      src={`${import.meta.env.VITE_APP_HOST}/public/images/${product.image_filename}`}
                      alt={product.name}
                      className="img-thumbnail"
                      style={{ width: '100px' }}
                    />
                  </td>
                  <td>{product.name}</td>
                  <td>${product.cost}</td>
                  <td>{product.quantity}</td>
                  <td>${product.total.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="4" className="text-end"><strong>Subtotal:</strong></td>
                <td><strong>${subTotal.toFixed(2)}</strong></td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}
      <div className="text-center mt-4">
        <Link to="/" className="btn btn-primary me-2">Continue Shopping</Link>
        <Link to="/checkout" className="btn btn-success">Complete Purchase</Link>
      </div>
    </div>
  );
  
  
}
