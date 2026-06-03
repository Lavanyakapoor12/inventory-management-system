import { useEffect, useState } from "react";
import axios from "axios";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/products/")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
  <div>
    <h1>Products</h1>

    {products.map((product) => (
      <div className="card" key={product.id}>
        <h3>{product.name}</h3>
        <p>SKU: {product.sku}</p>
        <p>Price: ₹{product.price}</p>
        <p>Stock: {product.stock_quantity}</p>
      </div>
    ))}
  </div>
);
}

export default Products;