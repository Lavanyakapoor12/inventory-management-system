import { useEffect, useState } from "react";
import axios from "axios";

function Customers() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/customers/")
      .then((response) => {
        setCustomers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
  <div>
    <h1>Customers</h1>

    {customers.map((customer) => (
      <div className="card" key={customer.id}>
        <h3>{customer.name}</h3>
        <p>Email: {customer.email}</p>
        <p>Phone: {customer.phone}</p>
      </div>
    ))}
  </div>
);
}

export default Customers;