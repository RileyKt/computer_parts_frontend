import { useEffect, useState } from 'react';

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_APP_HOST}/api/products/all`)
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div>
      <h2>Products</h2>
      <ul>
        {products.map((product) => (
          <li key={product.product_id}>
            <img src={`${import.meta.env.VITE_APP_HOST}/public/images/${product.image_filename}`} alt={product.name} />
            <p>{product.name} - ${product.cost}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
