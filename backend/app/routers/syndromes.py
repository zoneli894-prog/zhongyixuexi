from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Syndrome
from app.schemas import SyndromeOut

router = APIRouter(prefix="/api/syndromes", tags=["syndromes"])


@router.get("", response_model=list[SyndromeOut])
def list_syndromes(
    category: str = Query(None),
    db: Session = Depends(get_db),
):
    q = db.query(Syndrome)
    if category:
        q = q.filter(Syndrome.category == category)
    return q.order_by(Syndrome.id).all()
