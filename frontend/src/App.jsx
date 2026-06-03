import "./App.css";

import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Customers from "./pages/Customers";
import Orders from "./pages/Orders";

function App() {
  return (
    <div>
      <nav className="navbar">
        <h2>📦 Inventory Management System</h2>
      </nav>

      <div className="container">

        <Dashboard />

        <div className="section">
          <Products />
        </div>

        <div className="section">
          <Customers />
        </div>

        <div className="section">
          <Orders />
        </div>

      </div>
    </div>
  );
}

export default App;