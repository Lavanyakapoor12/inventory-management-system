import { useCallback, useEffect, useMemo, useState } from "react";
import api from "./api";
import "./App.css";

const sections = [
  { id: "dashboard", label: "Dashboard", icon: "▦" },
  { id: "products", label: "Products", icon: "▣" },
  { id: "customers", label: "Customers", icon: "♙" },
  { id: "orders", label: "Orders", icon: "▤" },
];

function money(value) {
  return `₹${Number(value || 0).toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;
}

function App() {
  const [active, setActive] = useState("dashboard");
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const loadData = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const [p, c, o] = await Promise.all([
        api.get("/products/"),
        api.get("/customers/"),
        api.get("/orders/"),
      ]);
      setProducts(Array.isArray(p.data) ? p.data : []);
      setCustomers(Array.isArray(c.data) ? c.data : []);
      setOrders(Array.isArray(o.data) ? o.data : []);
    } catch (err) {
      setError(err.response?.data?.detail || err.message || "Could not load data. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  const showNotice = (message) => {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 3500);
  };

  const totalUnits = useMemo(
    () => products.reduce((sum, product) => sum + Number(product.stock_quantity || 0), 0),
    [products]
  );
  const inventoryValue = useMemo(
    () => products.reduce((sum, product) => sum + Number(product.price || 0) * Number(product.stock_quantity || 0), 0),
    [products]
  );

  async function createProduct(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const payload = {
      name: form.get("name").trim(),
      sku: form.get("sku").trim(),
      price: Number(form.get("price")),
      stock_quantity: Number(form.get("stock_quantity")),
    };
    try {
      await api.post("/products/", payload);
      event.currentTarget.reset();
      await loadData();
      showNotice("Product added successfully.");
    } catch (err) {
      showNotice(err.response?.data?.detail || "Could not add product.");
    }
  }

  async function createCustomer(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const payload = {
      name: form.get("name").trim(),
      email: form.get("email").trim(),
      phone: form.get("phone").trim(),
    };
    try {
      await api.post("/customers/", payload);
      event.currentTarget.reset();
      await loadData();
      showNotice("Customer added successfully.");
    } catch (err) {
      showNotice(err.response?.data?.detail || "Could not add customer.");
    }
  }

  async function createOrder(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const payload = {
      customer_id: Number(form.get("customer_id")),
      items: [{
        product_id: Number(form.get("product_id")),
        quantity: Number(form.get("quantity")),
      }],
    };
    try {
      await api.post("/orders/", payload);
      event.currentTarget.reset();
      await loadData();
      showNotice("Order created and inventory updated.");
    } catch (err) {
      showNotice(err.response?.data?.detail || "Could not create order.");
    }
  }

  const current = sections.find((item) => item.id === active);

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">IM</div>
          <div><strong>Stockwise</strong><span>INVENTORY SUITE</span></div>
        </div>
        <div className="side-label">WORKSPACE</div>
        <nav className="nav-list">
          {sections.map((item) => (
            <button key={item.id} className={`nav-item ${active === item.id ? "active" : ""}`} onClick={() => setActive(item.id)}>
              <span className="nav-icon">{item.icon}</span>{item.label}
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="online-dot" />
          <div><strong>System status</strong><span>Connected to API</span></div>
        </div>
      </aside>

      <main className="main-area">
        <header className="topbar">
          <div className="breadcrumb">Workspace <span>/</span> {current?.label}</div>
          <div className="top-actions">
            <span className="live-pill"><i /> Live environment</span>
            <button className="refresh-button" onClick={loadData} title="Refresh data">↻ <span>Refresh</span></button>
          </div>
        </header>

        <div className="page-content">
          <div className="page-heading">
            <div>
              <p className="eyebrow">INVENTORY MANAGEMENT</p>
              <h1>{active === "dashboard" ? "Good to see you" : current?.label}</h1>
              <p className="subheading">
                {active === "dashboard" ? "Here is what is happening with your store today." :
                  active === "products" ? "Track products, pricing and available stock." :
                  active === "customers" ? "Keep your customer information organized." :
                  "Review orders and manage stock movement."}
              </p>
            </div>
            <div className="date-chip">● &nbsp; Backend connected</div>
          </div>

          {error && <div className="alert error-alert"><strong>Unable to load live data</strong><span>{error}</span><button onClick={loadData}>Try again</button></div>}
          {notice && <div className="toast">{notice}</div>}
          {loading && <div className="loading-line">Loading your latest inventory data…</div>}

          {!loading && !error && active === "dashboard" && (
            <>
              <section className="stats-grid">
                <StatCard label="Total products" value={products.length} detail="Products in catalogue" icon="▣" tone="violet" />
                <StatCard label="Total customers" value={customers.length} detail="Registered customers" icon="♙" tone="blue" />
                <StatCard label="Total orders" value={orders.length} detail="Orders recorded" icon="▤" tone="orange" />
                <StatCard label="Units in stock" value={totalUnits.toLocaleString("en-IN")} detail="Available inventory units" icon="◫" tone="green" />
              </section>
              <section className="dashboard-grid">
                <div className="panel inventory-panel">
                  <div className="panel-heading"><div><h2>Recent products</h2><p>Your latest inventory items</p></div><button className="text-button" onClick={() => setActive("products")}>View all →</button></div>
                  <ProductTable products={products.slice(0, 5)} />
                </div>
                <div className="panel overview-panel">
                  <div className="panel-heading"><div><h2>Inventory overview</h2><p>Current stock summary</p></div></div>
                  <div className="overview-value">{money(inventoryValue)}</div>
                  <div className="overview-caption">Estimated value of current stock</div>
                  <div className="overview-divider" />
                  <div className="overview-row"><span>Total stock units</span><strong>{totalUnits.toLocaleString("en-IN")}</strong></div>
                  <div className="overview-row"><span>Products tracked</span><strong>{products.length}</strong></div>
                  <div className="overview-row"><span>Orders processed</span><strong>{orders.length}</strong></div>
                </div>
              </section>
              <section className="panel quick-panel">
                <div className="panel-heading"><div><h2>Quick actions</h2><p>Jump straight into your daily tasks</p></div></div>
                <div className="quick-actions">
                  <button onClick={() => setActive("products")}><b>＋</b><span><strong>Add a product</strong><small>Create a new inventory item</small></span><em>→</em></button>
                  <button onClick={() => setActive("customers")}><b>＋</b><span><strong>Add a customer</strong><small>Register a new customer</small></span><em>→</em></button>
                  <button onClick={() => setActive("orders")}><b>＋</b><span><strong>Create an order</strong><small>Place an order and update stock</small></span><em>→</em></button>
                </div>
              </section>
            </>
          )}

          {!loading && active === "products" && (
            <section className="content-grid">
              <div className="panel form-panel">
                <div className="panel-heading"><div><h2>Add product</h2><p>Enter the details of a new product.</p></div></div>
                <form onSubmit={createProduct} className="data-form">
                  <Field label="Product name"><input name="name" placeholder="e.g. Wireless Mouse" required /></Field>
                  <Field label="SKU"><input name="sku" placeholder="e.g. WM-001" required /></Field>
                  <div className="form-row">
                    <Field label="Price (₹)"><input name="price" type="number" min="0" step="0.01" placeholder="0.00" required /></Field>
                    <Field label="Opening stock"><input name="stock_quantity" type="number" min="0" step="1" placeholder="0" required /></Field>
                  </div>
                  <button className="primary-button" type="submit">＋ Add product</button>
                </form>
              </div>
              <div className="panel table-panel"><div className="panel-heading"><div><h2>All products</h2><p>{products.length} products in your catalogue</p></div></div><ProductTable products={products} /></div>
            </section>
          )}

          {!loading && active === "customers" && (
            <section className="content-grid">
              <div className="panel form-panel">
                <div className="panel-heading"><div><h2>Add customer</h2><p>Save a customer to your directory.</p></div></div>
                <form onSubmit={createCustomer} className="data-form">
                  <Field label="Full name"><input name="name" placeholder="e.g. Rahul Sharma" required /></Field>
                  <Field label="Email address"><input name="email" type="email" placeholder="name@example.com" required /></Field>
                  <Field label="Phone number"><input name="phone" placeholder="10-digit phone number" required /></Field>
                  <button className="primary-button" type="submit">＋ Add customer</button>
                </form>
              </div>
              <div className="panel table-panel"><div className="panel-heading"><div><h2>Customer directory</h2><p>{customers.length} registered customers</p></div></div><CustomerTable customers={customers} /></div>
            </section>
          )}

          {!loading && active === "orders" && (
            <>
              <section className="panel order-form-panel">
                <div className="panel-heading"><div><h2>Create a new order</h2><p>Select a customer, product and quantity. Stock will be reduced automatically.</p></div></div>
                {(!customers.length || !products.length) ? <p className="empty-state">Add at least one customer and one product before creating an order.</p> :
                  <form onSubmit={createOrder} className="order-form">
                    <Field label="Customer"><select name="customer_id" required defaultValue=""><option value="" disabled>Select customer</option>{customers.map(c => <option key={c.id} value={c.id}>{c.name} (#{c.id})</option>)}</select></Field>
                    <Field label="Product"><select name="product_id" required defaultValue=""><option value="" disabled>Select product</option>{products.map(p => <option key={p.id} value={p.id}>{p.name} — {p.stock_quantity} in stock</option>)}</select></Field>
                    <Field label="Quantity"><input name="quantity" type="number" min="1" step="1" placeholder="1" required /></Field>
                    <button className="primary-button" type="submit">Create order →</button>
                  </form>}
              </section>
              <section className="panel table-panel order-list"><div className="panel-heading"><div><h2>Order history</h2><p>{orders.length} orders recorded</p></div></div><OrderTable orders={orders} /></section>
            </>
          )}
          <footer className="footer">Stockwise Inventory Suite <span>•</span> Built with React, FastAPI & PostgreSQL</footer>
        </div>
      </main>
    </div>
  );
}

function StatCard({ label, value, detail, icon, tone }) {
  return <div className="stat-card"><div className={`stat-icon ${tone}`}>{icon}</div><p>{label}</p><strong>{value}</strong><small>{detail}</small></div>;
}
function Field({ label, children }) { return <label className="field"><span>{label}</span>{children}</label>; }

function ProductTable({ products }) {
  if (!products.length) return <EmptyState text="No products found yet." />;
  return <div className="table-wrap"><table><thead><tr><th>PRODUCT</th><th>SKU</th><th>PRICE</th><th>STOCK</th><th>STATUS</th></tr></thead><tbody>
    {products.map(p => <tr key={p.id}><td><div className="product-name"><span className="product-avatar">{(p.name || "P").charAt(0).toUpperCase()}</span><span><strong>{p.name}</strong><small>Product #{p.id}</small></span></div></td><td className="muted-cell">{p.sku}</td><td>{money(p.price)}</td><td>{p.stock_quantity}</td><td><span className={`status ${Number(p.stock_quantity) > 0 ? "in-stock" : "out-stock"}`}>{Number(p.stock_quantity) > 0 ? "In stock" : "Out of stock"}</span></td></tr>)}
  </tbody></table></div>;
}
function CustomerTable({ customers }) {
  if (!customers.length) return <EmptyState text="No customers found yet." />;
  return <div className="table-wrap"><table><thead><tr><th>CUSTOMER</th><th>EMAIL</th><th>PHONE</th></tr></thead><tbody>
    {customers.map(c => <tr key={c.id}><td><div className="product-name"><span className="customer-avatar">{(c.name || "C").charAt(0).toUpperCase()}</span><span><strong>{c.name}</strong><small>Customer #{c.id}</small></span></div></td><td>{c.email}</td><td>{c.phone || "—"}</td></tr>)}
  </tbody></table></div>;
}
function OrderTable({ orders }) {
  if (!orders.length) return <EmptyState text="No orders found yet." />;
  return <div className="table-wrap"><table><thead><tr><th>ORDER</th><th>CUSTOMER ID</th><th>TOTAL AMOUNT</th><th>STATUS</th></tr></thead><tbody>
    {orders.map(o => <tr key={o.id}><td><strong>Order #{o.id}</strong></td><td>{o.customer_id}</td><td>{money(o.total_amount)}</td><td><span className="status in-stock">Created</span></td></tr>)}
  </tbody></table></div>;
}
function EmptyState({ text }) { return <div className="empty-state"><span>▤</span>{text}</div>; }

export default App;
