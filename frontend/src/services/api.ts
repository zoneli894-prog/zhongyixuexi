import type { Herb, Formula, Meridian, Syndrome, Disease, Microbe, ClinicalCase } from '../types';

const BASE = '/api';

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(`${BASE}${url}`);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

// Herbs
export async function fetchHerbs(params?: { category?: string; search?: string }): Promise<Herb[]> {
  const q = new URLSearchParams();
  if (params?.category) q.set('category', params.category);
  if (params?.search) q.set('search', params.search);
  const suffix = q.toString() ? `?${q}` : '';
  return fetchJson<Herb[]>(`/herbs${suffix}`);
}

export async function fetchHerb(id: number): Promise<Herb> {
  return fetchJson<Herb>(`/herbs/${id}`);
}

// Formulas - backend returns `compositions`, frontend expects `composition`
interface FormulaApi {
  id: number;
  name: string;
  pinyin: string;
  source: string;
  functions: string;
  indications: string;
  usage_dosage: string;
  mnemonic: string;
  cautions: string;
  compositions: { herb_id: number; herb_name: string; role: string; dosage: string }[];
}

function mapFormula(f: FormulaApi): Formula {
  return { ...f, composition: f.compositions } as unknown as Formula;
}

export async function fetchFormulas(): Promise<Formula[]> {
  const data = await fetchJson<FormulaApi[]>('/formulas');
  return data.map(mapFormula);
}

export async function fetchFormula(id: number): Promise<Formula> {
  const data = await fetchJson<FormulaApi>(`/formulas/${id}`);
  return mapFormula(data);
}

// Meridians
export async function fetchMeridians(): Promise<Meridian[]> {
  return fetchJson<Meridian[]>('/meridians');
}

// Syndromes
export async function fetchSyndromes(params?: { category?: string }): Promise<Syndrome[]> {
  const suffix = params?.category ? `?category=${encodeURIComponent(params.category)}` : '';
  return fetchJson<Syndrome[]>(`/syndromes${suffix}`);
}

// Diseases - backend returns `syndromes` array, frontend wants `syndrome_ids`
interface DiseaseApi {
  id: number;
  name: string;
  western_name: string;
  category: string;
  description: string;
  syndromes: { id: number }[];
}

function mapDisease(d: DiseaseApi): Disease {
  return {
    ...d,
    syndrome_ids: d.syndromes.map(s => s.id),
  };
}

export async function fetchDiseases(): Promise<Disease[]> {
  const data = await fetchJson<DiseaseApi[]>('/diseases');
  return data.map(mapDisease);
}

export async function fetchDisease(id: number): Promise<Disease> {
  const data = await fetchJson<DiseaseApi>(`/diseases/${id}`);
  return mapDisease(data);
}

// Microbes - backend returns `clinical_diseases` as string, frontend wants string[]
interface MicrobeApi {
  id: number;
  name: string;
  pinyin: string;
  genus: string;
  gram_stain: string;
  shape: string;
  pathogenesis: string;
  clinical_diseases: string;
  transmission: string;
  prevention: string;
  drug_resistance?: string;
  biosafety_level?: string;
  tcm_correlation?: string;
}

function mapMicrobe(m: MicrobeApi): Microbe {
  return {
    ...m,
    clinical_diseases: m.clinical_diseases
      ? m.clinical_diseases.split(/[,，、；]/).map(s => s.trim()).filter(Boolean)
      : [],
    gram_stain: m.gram_stain as Microbe['gram_stain'],
    biosafety_level: m.biosafety_level as Microbe['biosafety_level'] | undefined,
  };
}

export async function fetchMicrobes(params?: { gram_stain?: string; search?: string }): Promise<Microbe[]> {
  const q = new URLSearchParams();
  if (params?.gram_stain) q.set('gram_stain', params.gram_stain);
  if (params?.search) q.set('search', params.search);
  const suffix = q.toString() ? `?${q}` : '';
  const data = await fetchJson<MicrobeApi[]>(`/microbes${suffix}`);
  return data.map(mapMicrobe);
}

export async function fetchMicrobe(id: number): Promise<Microbe> {
  const data = await fetchJson<MicrobeApi>(`/microbes/${id}`);
  return mapMicrobe(data);
}

// Clinical Cases - backend flattens four_examinations, frontend nests them
interface ClinicalCaseApi {
  id: number;
  title: string;
  chief_complaint: string;
  present_illness: string;
  inspection: string;
  auscultation: string;
  inquiry: string;
  palpation: string;
  lab_results?: string;
  correct_western_dx: string;
  correct_tcm_dx: string;
  correct_syndrome: string;
  correct_method: string;
  correct_formula: string;
  explanation: string;
}

function mapClinicalCase(c: ClinicalCaseApi): ClinicalCase {
  return {
    ...c,
    four_examinations: {
      inspection: c.inspection,
      auscultation: c.auscultation,
      inquiry: c.inquiry,
      palpation: c.palpation,
    },
  };
}

export async function fetchClinicalCases(): Promise<ClinicalCase[]> {
  const data = await fetchJson<ClinicalCaseApi[]>('/clinical');
  return data.map(mapClinicalCase);
}

export async function fetchClinicalCase(id: number): Promise<ClinicalCase> {
  const data = await fetchJson<ClinicalCaseApi>(`/clinical/${id}`);
  return mapClinicalCase(data);
}

// Search
export interface ApiSearchResult {
  type: string;
  id: number;
  name: string;
  matched_field: string;
  excerpt: string;
}

export async function searchAll(q: string): Promise<ApiSearchResult[]> {
  return fetchJson<ApiSearchResult[]>(`/search?q=${encodeURIComponent(q)}`);
}
