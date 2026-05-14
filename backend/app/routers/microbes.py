from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Microbe
from app.schemas import MicrobeOut

router = APIRouter(prefix="/api/microbes", tags=["microbes"])


@router.get("", response_model=list[MicrobeOut])
def list_microbes(
    gram_stain: str = Query(None),
    search: str = Query(None),
    db: Session = Depends(get_db),
):
    q = db.query(Microbe)
    if gram_stain:
        q = q.filter(Microbe.gram_stain == gram_stain)
    if search:
        q = q.filter(
            (Microbe.name.contains(search))
            | (Microbe.pinyin.ilike(f"%{search}%"))
            | (Microbe.clinical_diseases.contains(search))
        )
    return q.order_by(Microbe.id).all()


@router.get("/{microbe_id}", response_model=MicrobeOut)
def get_microbe(microbe_id: int, db: Session = Depends(get_db)):
    microbe = db.query(Microbe).filter(Microbe.id == microbe_id).first()
    if not microbe:
        raise HTTPException(status_code=404, detail="Microbe not found")
    return microbe
