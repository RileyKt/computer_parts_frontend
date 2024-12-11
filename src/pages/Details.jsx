import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Details() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_APP_HOST}/api/products/${id}`)
      .then((response) => response.json())
      .then((data) => setProduct(data));
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div>
      <img src={`${import.meta.env.VITE_APP_HOST}/public/images/${product.image_filename}`} alt={product.name} />
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>Price: ${product.cost}</p>
      <button>Add to Cart</button>
      <Link to="/">Go Back</Link>
    </div>
  );
}
