import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react'; 
import Cookies from 'js-cookie';

export default function Details() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_APP_HOST}/api/products/${id}`)
      .then((response) => {
        if (!response.ok) throw new Error('Failed to fetch product details');
        return response.json();
      })
      .then((data) => setProduct(data))
      .catch((error) => console.error('Error fetching product:', error));
  }, [id]);
  

  const addToCart = () => {
    // Get existing cart or empty
    const cart = Cookies.get('cart') || ''; 
    // Append product ID
    const updatedCart = cart ? `${cart},${id}` : id; 
     // Save updated cart
    Cookies.set('cart', updatedCart, { expires: 7 });
    alert('Product added to cart!');
  };

  if (!product) return <p>Loading...</p>;
  return (
    <div className="container">
      <h1 className="text-center mb-4">{product.name}</h1>
      <div className="row">
        <div className="col-md-6">
          {product.image_filename ? (
            <img
              src={`${import.meta.env.VITE_APP_HOST}/public/images/${product.image_filename}`}
              className="img-fluid"
              alt={product.name}
            />
          ) : (
            <p>No Image Available</p>
          )}
        </div>
        <div className="col-md-6">
          <table className="table table-bordered">
            <tbody>
              <tr>
                <th>Description</th>
                <td>{product.description}</td>
              </tr>
              <tr>
                <th>Price</th>
                <td>${product.cost}</td>
              </tr>
            </tbody>
          </table>
          <button onClick={addToCart} className="btn btn-success me-2">Add to Cart</button>
          <Link to="/" className="btn btn-secondary">Go Back</Link>
        </div>
      </div>
    </div>
  );
  
  
}


