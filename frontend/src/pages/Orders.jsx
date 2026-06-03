import { useEffect, useState } from "react";
import axios from "axios";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/orders/")
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

 return (
  <div>
    <h1>Orders</h1>

    {orders.map((order) => (
      <div className="card" key={order.id}>
        <h3>Order #{order.id}</h3>
        <p>Customer ID: {order.customer_id}</p>
        <p>Total Amount: ₹{order.total_amount}</p>
      </div>
    ))}
  </div>
);
}

export default Orders;