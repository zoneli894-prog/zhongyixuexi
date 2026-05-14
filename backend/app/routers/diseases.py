from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload
from app.database import get_db
from app.models import Disease
from app.schemas import DiseaseOut

router = APIRouter(prefix="/api/diseases", tags=["diseases"])


@router.get("", response_model=list[DiseaseOut])
def list_diseases(db: Session = Depends(get_db)):
    return db.query(Disease).options(joinedload(Disease.syndromes)).order_by(Disease.id).all()


@router.get("/{disease_id}", response_model=DiseaseOut)
def get_disease(disease_id: int, db: Session = Depends(get_db)):
    disease = db.query(Disease).options(joinedload(Disease.syndromes)).filter(Disease.id == disease_id).first()
    if not disease:
        raise HTTPException(status_code=404, detail="Disease not found")
    return disease
