from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from database import get_db
from models import Product
from models import Order
from models import OrderItem

from schemas import OrderCreate

router = APIRouter(
    prefix="/orders",
    tags=["Orders"]
)
@router.post("/")
def create_order(
    order: OrderCreate,
    db: Session = Depends(get_db)
):

    total_amount = 0

    for item in order.items:

        product = db.query(Product).filter(
            Product.id == item.product_id
        ).first()

        if not product:
            raise HTTPException(
                status_code=404,
                detail="Product not found"
            )

        if product.stock_quantity < item.quantity:
            raise HTTPException(
                status_code=400,
                detail="Insufficient stock"
            )

        total_amount += (
            product.price * item.quantity
        )

    new_order = Order(
        customer_id=order.customer_id,
        total_amount=total_amount
    )

    db.add(new_order)
    db.commit()
    db.refresh(new_order)

    for item in order.items:

        product = db.query(Product).filter(
            Product.id == item.product_id
        ).first()

        order_item = OrderItem(
            order_id=new_order.id,
            product_id=item.product_id,
            quantity=item.quantity,
            price=product.price
        )

        db.add(order_item)

        product.stock_quantity -= item.quantity

    db.commit()

    return {
        "message": "Order created successfully",
        "order_id": new_order.id,
        "total_amount": total_amount
    }
@router.get("/")
def get_orders(
    db: Session = Depends(get_db)
):
    return db.query(Order).all()