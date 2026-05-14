from datetime import datetime
from sqlalchemy import Column, Integer, String, Text, ForeignKey, Table, DateTime
from sqlalchemy.orm import relationship
from app.database import Base

syndrome_formula = Table(
    "syndrome_formula",
    Base.metadata,
    Column("syndrome_id", Integer, ForeignKey("syndromes.id"), primary_key=True),
    Column("formula_id", Integer, ForeignKey("formulas.id"), primary_key=True),
)

disease_syndrome = Table(
    "disease_syndrome",
    Base.metadata,
    Column("disease_id", Integer, ForeignKey("diseases.id"), primary_key=True),
    Column("syndrome_id", Integer, ForeignKey("syndromes.id"), primary_key=True),
)


class Herb(Base):
    __tablename__ = "herbs"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(50), nullable=False, index=True)
    pinyin = Column(String(100))
    taste = Column(String(50))
    nature = Column(String(50))
    channel_tropism = Column(String(100))
    functions = Column(Text)
    usage_dosage = Column(String(100))
    cautions = Column(Text)
    preparation = Column(String(200))
    chemical_composition = Column(Text)
    category = Column(String(50))
    aliases = Column(String(200))
    source_url = Column(String(500))
    imported_at = Column(DateTime, default=datetime.utcnow)


class Formula(Base):
    __tablename__ = "formulas"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(50), nullable=False, index=True)
    pinyin = Column(String(100))
    source = Column(String(100))
    functions = Column(Text)
    indications = Column(Text)
    usage_dosage = Column(String(100))
    mnemonic = Column(Text)
    cautions = Column(Text)
    compositions = relationship("FormulaComposition", back_populates="formula", cascade="all, delete-orphan")
    syndromes = relationship("Syndrome", secondary=syndrome_formula, back_populates="formulas")


class FormulaComposition(Base):
    __tablename__ = "formula_compositions"
    id = Column(Integer, primary_key=True, index=True)
    formula_id = Column(Integer, ForeignKey("formulas.id"), nullable=False)
    herb_id = Column(Integer, ForeignKey("herbs.id"), nullable=False)
    herb_name = Column(String(50))
    role = Column(String(10))
    dosage = Column(String(20))
    formula = relationship("Formula", back_populates="compositions")
    herb = relationship("Herb")


class Meridian(Base):
    __tablename__ = "meridians"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(50), nullable=False)
    pinyin = Column(String(100))
    organ = Column(String(20))
    pathway_desc = Column(Text)
    acupoints = relationship("Acupoint", back_populates="meridian", cascade="all, delete-orphan")


class Acupoint(Base):
    __tablename__ = "acupoints"
    id = Column(Integer, primary_key=True, index=True)
    meridian_id = Column(Integer, ForeignKey("meridians.id"), nullable=False)
    name = Column(String(30))
    pinyin = Column(String(50))
    location = Column(String(200))
    meridian = relationship("Meridian", back_populates="acupoints")


class Syndrome(Base):
    __tablename__ = "syndromes"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(50), nullable=False, index=True)
    pinyin = Column(String(100))
    description = Column(Text)
    category = Column(String(30))
    symptoms = Column(Text)
    tongue_pulse = Column(String(200))
    treatment_method = Column(String(100))
    formulas = relationship("Formula", secondary=syndrome_formula, back_populates="syndromes")
    diseases = relationship("Disease", secondary=disease_syndrome, back_populates="syndromes")


class Disease(Base):
    __tablename__ = "diseases"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(50), nullable=False, index=True)
    western_name = Column(String(100))
    category = Column(String(30))
    description = Column(Text)
    syndromes = relationship("Syndrome", secondary=disease_syndrome, back_populates="diseases")


class Microbe(Base):
    __tablename__ = "microbes"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False, index=True)
    pinyin = Column(String(200))
    genus = Column(String(100))
    gram_stain = Column(String(20))
    shape = Column(String(100))
    pathogenesis = Column(Text)
    clinical_diseases = Column(Text)
    transmission = Column(String(200))
    prevention = Column(Text)
    drug_resistance = Column(Text)
    biosafety_level = Column(String(10))
    tcm_correlation = Column(Text)
    taxonomy = Column(String(200))
    aliases = Column(String(200))
    source_url = Column(String(500))
    imported_at = Column(DateTime, default=datetime.utcnow)


class ClinicalCase(Base):
    __tablename__ = "clinical_cases"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(100))
    chief_complaint = Column(Text)
    present_illness = Column(Text)
    inspection = Column(Text)
    auscultation = Column(Text)
    inquiry = Column(Text)
    palpation = Column(Text)
    lab_results = Column(Text)
    correct_western_dx = Column(String(100))
    correct_tcm_dx = Column(String(50))
    correct_syndrome = Column(String(50))
    correct_method = Column(String(100))
    correct_formula = Column(String(50))
    explanation = Column(Text)
