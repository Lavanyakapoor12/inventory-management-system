# Inventory Management System

A full-stack Inventory Management System built using **React, FastAPI, PostgreSQL and Docker**. It helps users manage products, customers and orders while automatically updating stock quantities.

## 🌐 Live Demo

- **Frontend:** https://inventory-management-system-five-khaki.vercel.app
- **Backend API:** https://inventory-management-system-1-ht93.onrender.com
- **API Documentation:** https://inventory-management-system-1-ht93.onrender.com/docs

## ✨ Features

- Add and manage products.
- Maintain unique product SKUs.
- Add and manage customer details.
- Create and view customer orders.
- Automatically reduce product stock after an order.
- Prevent orders when available stock is insufficient.
- Store application data in PostgreSQL.
- REST API built with FastAPI.
- Responsive React frontend.
- Docker-based application setup.

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| React | Frontend |
| Vite | Frontend development and build |
| Python | Backend programming |
| FastAPI | REST API |
| PostgreSQL | Database |
| SQLAlchemy | Database ORM |
| Docker | Containerization |
| Docker Compose | Multi-container setup |
| Vercel | Frontend hosting |
| Render | Backend hosting |
| Neon | Cloud PostgreSQL database |

## 📁 Project Structure

```text
inventory/
│
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── models/
│   │   └── routes/
│   ├── Dockerfile
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   ├── Dockerfile
│   └── package.json
│
├── docker-compose.yml
├── .env.example
├── .gitignore
└── README.md
```

## ⚙️ Run the Project Locally Using Docker

### Prerequisites

- Docker Desktop installed.
- Git installed.

### 1. Clone the repository

```bash
git clone https://github.com/Lavanyakapoor12/inventory-management-system.git
```

### 2. Open the project folder

```bash
cd inventory-management-system
```

### 3. Start the application

```bash
docker compose up --build
```

Docker Compose starts the PostgreSQL database, FastAPI backend and React frontend.

### 4. Open the application

- Frontend: http://localhost:5174
- Backend: http://localhost:8000
- API Documentation: http://localhost:8000/docs

### 5. Stop the application

Press `Ctrl + C` in the terminal.

To stop and remove the containers while keeping the database volume:

```bash
docker compose down
```

## 🔄 Application Workflow

1. Add products with their names, SKUs, prices and stock quantities.
2. Add customer information.
3. Create an order by selecting a customer and product.
4. The backend checks the available stock.
5. If sufficient stock is available, the order is created and stock is reduced automatically.
6. If stock is insufficient, the system rejects the order.

## 🧪 Tested Functionalities

- Product creation.
- Customer creation.
- Order creation.
- Automatic stock reduction.
- Insufficient stock validation.
- PostgreSQL database connectivity.
- Docker-based local application execution.

## 👩‍💻 Author

**Lavanya Kapoor**

B.Tech Student | Computer Science and Business Systems

GitHub: https://github.com/Lavanyakapoor12