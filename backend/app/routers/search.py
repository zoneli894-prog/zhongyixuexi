from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Herb, Formula, Disease, Microbe, Syndrome
from app.schemas import SearchResult

router = APIRouter(prefix="/api/search", tags=["search"])


@router.get("", response_model=list[SearchResult])
def global_search(q: str = Query(..., min_length=1), db: Session = Depends(get_db)):
    results: list[SearchResult] = []

    for herb in db.query(Herb).filter(
        (Herb.name.contains(q)) | (Herb.pinyin.ilike(f"%{q}%")) | (Herb.functions.contains(q))
    ).limit(10).all():
        results.append(SearchResult(
            type="herb", id=herb.id, name=herb.name,
            matched_field="name" if q in herb.name else "functions",
            excerpt=herb.functions[:80],
        ))

    for formula in db.query(Formula).filter(
        (Formula.name.contains(q)) | (Formula.pinyin.ilike(f"%{q}%")) | (Formula.functions.contains(q))
    ).limit(10).all():
        results.append(SearchResult(
            type="formula", id=formula.id, name=formula.name,
            matched_field="name" if q in formula.name else "functions",
            excerpt=formula.indications[:80],
        ))

    for disease in db.query(Disease).filter(
        (Disease.name.contains(q)) | (Disease.western_name.contains(q))
    ).limit(10).all():
        results.append(SearchResult(
            type="disease", id=disease.id, name=disease.name,
            matched_field="name",
            excerpt=disease.description[:80] if disease.description else "",
        ))

    for microbe in db.query(Microbe).filter(
        (Microbe.name.contains(q)) | (Microbe.pinyin.ilike(f"%{q}%"))
    ).limit(10).all():
        results.append(SearchResult(
            type="microbe", id=microbe.id, name=microbe.name,
            matched_field="name",
            excerpt=microbe.pathogenesis[:80] if microbe.pathogenesis else "",
        ))

    for syndrome in db.query(Syndrome).filter(
        (Syndrome.name.contains(q)) | (Syndrome.pinyin.ilike(f"%{q}%"))
    ).limit(10).all():
        results.append(SearchResult(
            type="syndrome", id=syndrome.id, name=syndrome.name,
            matched_field="name",
            excerpt=syndrome.description[:80] if syndrome.description else "",
        ))

    return results
