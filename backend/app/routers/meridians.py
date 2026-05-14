from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session, joinedload
from app.database import get_db
from app.models import Meridian
from app.schemas import MeridianOut

router = APIRouter(prefix="/api/meridians", tags=["meridians"])


@router.get("", response_model=list[MeridianOut])
def list_meridians(db: Session = Depends(get_db)):
    return db.query(Meridian).options(joinedload(Meridian.acupoints)).order_by(Meridian.id).all()
