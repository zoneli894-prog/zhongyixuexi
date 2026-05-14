import json
import os
from datetime import datetime
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models import Herb, Microbe
from app.pipeline.resolver import resolve_herb, resolve_microbe, get_herb_aliases, get_microbe_aliases

DATA_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "data")


def import_herbs_from_json(filepath: str, db: Session | None = None) -> dict:
    close_db = False
    if db is None:
        db = SessionLocal()
        close_db = True

    with open(filepath, "r", encoding="utf-8") as f:
        herbs_data = json.load(f)

    inserted, updated, skipped = 0, 0, 0
    for item in herbs_data:
        canonical = resolve_herb(item["name"])
        existing = db.query(Herb).filter(Herb.name == canonical).first()

        aliases = get_herb_aliases(canonical)
        fields = {
            "pinyin": item.get("pinyin", ""),
            "taste": item.get("taste", ""),
            "nature": item.get("nature", ""),
            "channel_tropism": item.get("channel_tropism", ""),
            "functions": item.get("functions", ""),
            "usage_dosage": item.get("usage_dosage", ""),
            "cautions": item.get("cautions", ""),
            "preparation": item.get("preparation"),
            "chemical_composition": item.get("chemical_composition"),
            "category": item.get("category"),
            "aliases": ",".join(aliases) if aliases else None,
            "source_url": item.get("source_url"),
            "imported_at": datetime.utcnow(),
        }

        if existing:
            for k, v in fields.items():
                if v is not None:
                    setattr(existing, k, v)
            updated += 1
        else:
            herb = Herb(name=canonical, **fields)
            db.add(herb)
            inserted += 1

    db.commit()
    if close_db:
        db.close()
    return {"inserted": inserted, "updated": updated, "skipped": skipped}


def import_microbes_from_json(filepath: str, db: Session | None = None) -> dict:
    close_db = False
    if db is None:
        db = SessionLocal()
        close_db = True

    with open(filepath, "r", encoding="utf-8") as f:
        microbes_data = json.load(f)

    inserted, updated, skipped = 0, 0, 0
    for item in microbes_data:
        canonical = resolve_microbe(item["name"])
        existing = db.query(Microbe).filter(Microbe.name == canonical).first()

        aliases = get_microbe_aliases(canonical)
        clinical = item.get("clinical_diseases", [])
        if isinstance(clinical, list):
            clinical = "、".join(clinical)

        fields = {
            "pinyin": item.get("pinyin", ""),
            "genus": item.get("genus", ""),
            "gram_stain": item.get("gram_stain", ""),
            "shape": item.get("shape", ""),
            "pathogenesis": item.get("pathogenesis", ""),
            "clinical_diseases": clinical,
            "transmission": item.get("transmission", ""),
            "prevention": item.get("prevention", ""),
            "drug_resistance": item.get("drug_resistance"),
            "biosafety_level": item.get("biosafety_level"),
            "tcm_correlation": item.get("tcm_correlation"),
            "taxonomy": item.get("taxonomy"),
            "aliases": ",".join(aliases) if aliases else None,
            "source_url": item.get("source_url"),
            "imported_at": datetime.utcnow(),
        }

        if existing:
            for k, v in fields.items():
                if v is not None:
                    setattr(existing, k, v)
            updated += 1
        else:
            microbe = Microbe(name=canonical, **fields)
            db.add(microbe)
            inserted += 1

    db.commit()
    if close_db:
        db.close()
    return {"inserted": inserted, "updated": updated, "skipped": skipped}


if __name__ == "__main__":
    from app.database import Base, engine
    Base.metadata.create_all(bind=engine)

    herb_file = os.path.join(DATA_DIR, "herbs_expansion.json")
    microbe_file = os.path.join(DATA_DIR, "microbes_expansion.json")

    db = SessionLocal()
    if os.path.exists(herb_file):
        result = import_herbs_from_json(herb_file, db)
        print(f"Herbs: {result}")
    if os.path.exists(microbe_file):
        result = import_microbes_from_json(microbe_file, db)
        print(f"Microbes: {result}")
    db.close()
