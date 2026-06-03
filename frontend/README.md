# Inventory Management System

## Overview

A Full Stack Inventory Management System developed using FastAPI, React, SQLAlchemy, SQLite, Docker, Git, and GitHub.

The system allows users to manage products, customers, and orders while automatically tracking inventory stock.

---

## Features

### Product Management

* Add products
* View products
* Track stock quantity
* Manage product pricing

### Customer Management

* Add customers
* View customer information
* Email and phone tracking

### Order Management

* Create orders
* Associate orders with customers
* Store ordered products and quantities
* Calculate total order amount automatically

### Inventory Tracking

* Automatic stock deduction when an order is placed
* Prevents ordering when stock is insufficient

### API Documentation

* Interactive Swagger UI using FastAPI

### Frontend Dashboard

* Product listing
* Customer listing
* Order listing
* Dashboard interface built with React

---

## Technology Stack

### Backend

* FastAPI
* SQLAlchemy
* SQLite
* Pydantic

### Frontend

* React
* Vite
* Axios

### DevOps

* Docker
* Docker Compose
* Git
* GitHub

---

## Project Structure

inventory/

├── backend/

├── frontend/

├── docker-compose.yml

└── README.md

---

## Run Backend

```bash
uvicorn main:app --reload
```

## Run Frontend

```bash
npm run dev
```

## API Documentation

```text
http://127.0.0.1:8000/docs
```

---

## Author

Lavanya Kapoor
