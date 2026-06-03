from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Customer
from app.schemas import CustomerCreate

router = APIRouter(
    prefix="/customers",
    tags=["Customers"]
)
@router.post("/")
def create_customer(
    customer: CustomerCreate,
    db: Session = Depends(get_db)
):

    existing = db.query(Customer).filter(
        Customer.email == customer.email
    ).first()

    if existing:
        raise HTTPException(
            status_code=400,
            detail="Email already exists"
        )

    new_customer = Customer(
        name=customer.name,
        email=customer.email,
        phone=customer.phone
    )

    db.add(new_customer)
    db.commit()
    db.refresh(new_customer)

    return new_customer
@router.get("/")
def get_customers(
    db: Session = Depends(get_db)
):
    return db.query(Customer).all()
@router.get("/")
def get_customers(
    db: Session = Depends(get_db)
):
    return db.query(Customer).all()