import axios from "axios";

const API_URL = (import.meta.env.VITE_API_URL || "https://inventory-management-system-1-ht93.onrender.com").replace(/\/$/, "");

const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

export default api;
