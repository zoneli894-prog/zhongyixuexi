from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import ClinicalCase
from app.schemas import ClinicalCaseOut

router = APIRouter(prefix="/api/clinical", tags=["clinical"])


@router.get("", response_model=list[ClinicalCaseOut])
def list_cases(db: Session = Depends(get_db)):
    return db.query(ClinicalCase).order_by(ClinicalCase.id).all()


@router.get("/{case_id}", response_model=ClinicalCaseOut)
def get_case(case_id: int, db: Session = Depends(get_db)):
    case = db.query(ClinicalCase).filter(ClinicalCase.id == case_id).first()
    if not case:
        raise HTTPException(status_code=404, detail="Case not found")
    return case
