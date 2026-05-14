from pydantic import BaseModel
from typing import Optional


class HerbBase(BaseModel):
    name: str
    pinyin: str
    taste: str
    nature: str
    channel_tropism: str
    functions: str
    usage_dosage: str
    cautions: str
    preparation: Optional[str] = None
    chemical_composition: Optional[str] = None
    category: Optional[str] = None

class HerbCreate(HerbBase):
    pass

class HerbOut(HerbBase):
    id: int
    model_config = {"from_attributes": True}


class FormulaCompositionOut(BaseModel):
    herb_id: int
    herb_name: str
    role: str
    dosage: str
    model_config = {"from_attributes": True}

class FormulaBase(BaseModel):
    name: str
    pinyin: str
    source: str
    functions: str
    indications: str
    usage_dosage: str
    mnemonic: str
    cautions: str

class FormulaCreate(FormulaBase):
    pass

class FormulaOut(FormulaBase):
    id: int
    compositions: list[FormulaCompositionOut] = []
    model_config = {"from_attributes": True}


class AcupointOut(BaseModel):
    name: str
    pinyin: str
    location: str
    model_config = {"from_attributes": True}

class MeridianBase(BaseModel):
    name: str
    pinyin: str
    organ: str
    pathway_desc: str

class MeridianOut(MeridianBase):
    id: int
    acupoints: list[AcupointOut] = []
    model_config = {"from_attributes": True}


class SyndromeBase(BaseModel):
    name: str
    pinyin: str
    description: str
    category: str
    symptoms: Optional[str] = None
    tongue_pulse: Optional[str] = None
    treatment_method: Optional[str] = None

class SyndromeOut(SyndromeBase):
    id: int
    model_config = {"from_attributes": True}


class DiseaseBase(BaseModel):
    name: str
    western_name: str
    category: str
    description: str

class DiseaseOut(DiseaseBase):
    id: int
    syndromes: list[SyndromeOut] = []
    model_config = {"from_attributes": True}


class MicrobeBase(BaseModel):
    name: str
    pinyin: str
    genus: str
    gram_stain: str
    shape: str
    pathogenesis: str
    clinical_diseases: str
    transmission: str
    prevention: str
    drug_resistance: Optional[str] = None
    biosafety_level: Optional[str] = None
    tcm_correlation: Optional[str] = None

class MicrobeOut(MicrobeBase):
    id: int
    model_config = {"from_attributes": True}


class ClinicalCaseOut(BaseModel):
    id: int
    title: str
    chief_complaint: str
    present_illness: str
    inspection: str
    auscultation: str
    inquiry: str
    palpation: str
    lab_results: Optional[str] = None
    correct_western_dx: str
    correct_tcm_dx: str
    correct_syndrome: str
    correct_method: str
    correct_formula: str
    explanation: str
    model_config = {"from_attributes": True}


class SearchResult(BaseModel):
    type: str
    id: int
    name: str
    matched_field: str
    excerpt: str


class AdminStats(BaseModel):
    herbs: int
    formulas: int
    syndromes: int
    diseases: int
    meridians: int
    microbes: int
    clinical_cases: int
    herbs_without_preparation: int
    herbs_without_chemical: int
    microbes_without_resistance: int
    microbes_without_biosafety: int
    microbes_without_tcm: int

class ImportResult(BaseModel):
    entity_type: str
    inserted: int
    updated: int
    skipped: int

class HerbUpdate(BaseModel):
    name: Optional[str] = None
    pinyin: Optional[str] = None
    taste: Optional[str] = None
    nature: Optional[str] = None
    channel_tropism: Optional[str] = None
    functions: Optional[str] = None
    usage_dosage: Optional[str] = None
    cautions: Optional[str] = None
    preparation: Optional[str] = None
    chemical_composition: Optional[str] = None
    category: Optional[str] = None
