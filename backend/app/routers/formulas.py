from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload
from app.database import get_db
from app.models import Formula
from app.schemas import FormulaOut

router = APIRouter(prefix="/api/formulas", tags=["formulas"])


@router.get("", response_model=list[FormulaOut])
def list_formulas(db: Session = Depends(get_db)):
    return db.query(Formula).options(joinedload(Formula.compositions)).order_by(Formula.id).all()


@router.get("/{formula_id}", response_model=FormulaOut)
def get_formula(formula_id: int, db: Session = Depends(get_db)):
    formula = db.query(Formula).options(joinedload(Formula.compositions)).filter(Formula.id == formula_id).first()
    if not formula:
        raise HTTPException(status_code=404, detail="Formula not found")
    return formula
