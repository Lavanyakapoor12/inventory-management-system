from pydantic import BaseModel


class ProductCreate(BaseModel):
    name: str
    sku: str
    price: float
    stock_quantity: int

class CustomerCreate(BaseModel):
    name: str
    email: str
    phone: str

from typing import List
class OrderItemCreate(BaseModel):
    product_id: int
    quantity: int

class OrderCreate(BaseModel):
    customer_id: int
    items: List[OrderItemCreate]