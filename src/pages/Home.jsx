import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_APP_HOST}/api/products/all`)
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  const addToCart = (id) => {
    const cart = Cookies.get('cart') || '';
    const updatedCart = cart ? `${cart},${id}` : id;
    Cookies.set('cart', updatedCart, { expires: 7 });
    alert('Product added to cart!');
  };

  return (
    <div className="container">
      <h2>Products</h2>
      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.product_id}>
                <td style={{ width: '150px', textAlign: 'center' }}>
                  {product.image_filename ? (
                    <img
                      src={`${import.meta.env.VITE_APP_HOST}/public/images/${product.image_filename}`}
                      alt={product.name}
                      className="img-thumbnail"
                    />
                  ) : (
                    <p>No Image</p>
                  )}
                </td>
                <td>{product.name}</td>
                <td>${product.cost.toFixed(2)}</td>
                <td>
                  <div className="d-flex justify-content-between">
                    <Link
                      to={`/details/${product.product_id}`}
                      className="btn btn-primary btn-sm me-2"
                    >
                      View Details
                    </Link>
                    <button
                      onClick={() => addToCart(product.product_id)}
                      className="btn btn-success btn-sm"
                    >
                      Add to Cart
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
