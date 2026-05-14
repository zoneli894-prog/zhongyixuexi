import os
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Herb, Formula, Syndrome, Disease, Meridian, Microbe, ClinicalCase
from app.schemas import AdminStats, ImportResult, HerbUpdate, HerbOut

router = APIRouter(prefix="/api/admin", tags=["admin"])

DATA_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "data")


@router.get("/stats", response_model=AdminStats)
def get_stats(db: Session = Depends(get_db)):
    return AdminStats(
        herbs=db.query(Herb).count(),
        formulas=db.query(Formula).count(),
        syndromes=db.query(Syndrome).count(),
        diseases=db.query(Disease).count(),
        meridians=db.query(Meridian).count(),
        microbes=db.query(Microbe).count(),
        clinical_cases=db.query(ClinicalCase).count(),
        herbs_without_preparation=db.query(Herb).filter(Herb.preparation.is_(None)).count(),
        herbs_without_chemical=db.query(Herb).filter(Herb.chemical_composition.is_(None)).count(),
        microbes_without_resistance=db.query(Microbe).filter(Microbe.drug_resistance.is_(None)).count(),
        microbes_without_biosafety=db.query(Microbe).filter(Microbe.biosafety_level.is_(None)).count(),
        microbes_without_tcm=db.query(Microbe).filter(Microbe.tcm_correlation.is_(None)).count(),
    )


@router.post("/import/herbs", response_model=ImportResult)
def import_herbs(db: Session = Depends(get_db)):
    filepath = os.path.join(DATA_DIR, "herbs_expansion.json")
    if not os.path.exists(filepath):
        raise HTTPException(status_code=404, detail="herbs_expansion.json not found")
    from app.pipeline.importer import import_herbs_from_json
    from app.pipeline.linker import auto_link_herbs_aliases
    result = import_herbs_from_json(filepath, db)
    auto_link_herbs_aliases(db)
    return ImportResult(entity_type="herb", **result)


@router.post("/import/microbes", response_model=ImportResult)
def import_microbes(db: Session = Depends(get_db)):
    filepath = os.path.join(DATA_DIR, "microbes_expansion.json")
    if not os.path.exists(filepath):
        raise HTTPException(status_code=404, detail="microbes_expansion.json not found")
    from app.pipeline.importer import import_microbes_from_json
    from app.pipeline.linker import auto_link_microbes_aliases, auto_link_microbe_to_tcm
    result = import_microbes_from_json(filepath, db)
    auto_link_microbes_aliases(db)
    auto_link_microbe_to_tcm(db)
    return ImportResult(entity_type="microbe", **result)


@router.post("/link")
def run_auto_linking(db: Session = Depends(get_db)):
    from app.pipeline.linker import auto_link_herbs_aliases, auto_link_microbes_aliases, auto_link_microbe_to_tcm
    h = auto_link_herbs_aliases(db)
    m = auto_link_microbes_aliases(db)
    t = auto_link_microbe_to_tcm(db)
    return {"herb_aliases_linked": h, "microbe_aliases_linked": m, "tcm_correlations_linked": t}


@router.put("/herbs/{herb_id}", response_model=HerbOut)
def update_herb(herb_id: int, data: HerbUpdate, db: Session = Depends(get_db)):
    herb = db.query(Herb).filter(Herb.id == herb_id).first()
    if not herb:
        raise HTTPException(status_code=404, detail="Herb not found")
    for field, value in data.model_dump(exclude_unset=True).items():
        setattr(herb, field, value)
    db.commit()
    db.refresh(herb)
    return herb
