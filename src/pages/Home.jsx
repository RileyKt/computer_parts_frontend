import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_APP_HOST}/api/products/all`)
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

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
                  <Link to={`/details/${product.product_id}`} className="btn btn-primary btn-sm">
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
  
  
}
