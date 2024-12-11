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
    <div>
      <img
        src={`${import.meta.env.VITE_APP_HOST}/public/images/${product.image_filename}`}
        alt={product.name}
      />
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>Price: ${product.cost}</p>
      <button onClick={addToCart}>Add to Cart</button>
      <Link to="/">Go Back</Link>
    </div>
  );
}
