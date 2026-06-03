from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from database import get_db
from models import Product
from schemas import ProductCreate

router = APIRouter(
    prefix="/products",
    tags=["Products"]
)


@router.post("/")
def create_product(
    product: ProductCreate,
    db: Session = Depends(get_db)
):

    existing = db.query(Product).filter(
        Product.sku == product.sku
    ).first()

    if existing:
        raise HTTPException(
            status_code=400,
            detail="SKU already exists"
        )

    new_product = Product(
        name=product.name,
        sku=product.sku,
        price=product.price,
        stock_quantity=product.stock_quantity
    )

    db.add(new_product)
    db.commit()
    db.refresh(new_product)

    return new_product

@router.get("/")
def get_products(
    db: Session = Depends(get_db)
):
    return db.query(Product).all()