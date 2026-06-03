import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/products/")
      .then((response) => {
        setProducts(response.data);
      });

    axios.get("http://127.0.0.1:8000/customers/")
      .then((response) => {
        setCustomers(response.data);
      });

    axios.get("http://127.0.0.1:8000/orders/")
      .then((response) => {
        setOrders(response.data);
      });
  }, []);

  return (
    <div className="dashboard">
      <div className="stat-card">
        <h2>{products.length}</h2>
        <p>Total Products</p>
      </div>

      <div className="stat-card">
        <h2>{customers.length}</h2>
        <p>Total Customers</p>
      </div>

      <div className="stat-card">
        <h2>{orders.length}</h2>
        <p>Total Orders</p>
      </div>
    </div>
  );
}

export default Dashboard;