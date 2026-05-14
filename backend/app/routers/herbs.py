from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Herb
from app.schemas import HerbOut

router = APIRouter(prefix="/api/herbs", tags=["herbs"])


@router.get("", response_model=list[HerbOut])
def list_herbs(
    category: str = Query(None),
    search: str = Query(None),
    db: Session = Depends(get_db),
):
    q = db.query(Herb)
    if category:
        q = q.filter(Herb.category == category)
    if search:
        q = q.filter(
            (Herb.name.contains(search))
            | (Herb.pinyin.ilike(f"%{search}%"))
            | (Herb.functions.contains(search))
        )
    return q.order_by(Herb.id).all()


@router.get("/{herb_id}", response_model=HerbOut)
def get_herb(herb_id: int, db: Session = Depends(get_db)):
    herb = db.query(Herb).filter(Herb.id == herb_id).first()
    if not herb:
        raise HTTPException(status_code=404, detail="Herb not found")
    return herb
