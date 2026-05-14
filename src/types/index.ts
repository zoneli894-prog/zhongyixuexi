export interface Herb {
  id: number;
  name: string;
  pinyin: string;
  taste: string;
  nature: string;
  channel_tropism: string;
  functions: string;
  usage_dosage: string;
  cautions: string;
  preparation?: string;           // 炮制方法（生用/炙用/酒制/醋制等）
  chemical_composition?: string;  // 主要化学成分
  category?: string;              // 功能分类（便于筛选）
}

export interface FormulaComposition {
  herb_id: number;
  herb_name: string;
  role: '君' | '臣' | '佐' | '使';
  dosage: string;
}

export interface Formula {
  id: number;
  name: string;
  pinyin: string;
  source: string;
  functions: string;
  indications: string;
  usage_dosage: string;
  mnemonic: string;
  cautions: string;
  composition: FormulaComposition[];
}

export interface Syndrome {
  id: number;
  name: string;
  pinyin: string;
  description: string;
  category: string;
  disease_id?: number;
  symptoms?: string;
  tongue_pulse?: string;
  treatment_method?: string;
  formula_ids?: number[];
}

export interface Acupoint {
  name: string;
  pinyin: string;
  location: string;
}

export interface Meridian {
  id: number;
  name: string;
  pinyin: string;
  organ: string;
  pathway_desc: string;
  acupoints: Acupoint[];
}

export interface ReviewCard {
  id: number;
  card_type: 'herb' | 'formula' | 'microbe' | 'diagnostic';
  card_id: number;
  name: string;
  pinyin: string;
  details: string;
  easiness_factor: number;
  interval_days: number;
  repetitions: number;
  next_review_date: string;
}

export interface QuizQuestion {
  formula_id: number;
  formula_name: string;
  blanked_mnemonic: string;
  blank_positions: number[];
  blank_answers: string[];
}

export interface QuizAnswer {
  position: number;
  expected: string;
  correct: boolean;
}

export type ReviewQuality = 'forgot' | 'hard' | 'normal' | 'easy';

// === 新增：疾病 ===
export interface Disease {
  id: number;
  name: string;
  western_name: string;
  category: string;
  description: string;
  syndrome_ids: number[];
  common_herbs?: number[];
  common_formulas?: number[];
}

// === 新增：微生物 ===
export interface Microbe {
  id: number;
  name: string;
  pinyin: string;
  genus: string;
  gram_stain: '阳性' | '阴性' | '不适用';
  shape: string;
  pathogenesis: string;
  clinical_diseases: string[];
  transmission: string;
  prevention: string;
  drug_resistance?: string;       // 耐药机制
  biosafety_level?: 'BSL-1' | 'BSL-2' | 'BSL-3' | 'BSL-4';  // 生物安全等级
  tcm_correlation?: string;       // 中医证候关联
}

// === 新增：诊断影像 ===
export interface DiagnosticMedia {
  id: number;
  type: '舌诊' | '脉诊' | '面诊' | 'ECG' | 'X光' | '实验室';
  name: string;
  description: string;
  image_url: string;
  linked_disease?: string;
  linked_syndrome?: string;
}

// === 新增：临床病例 ===
export interface ClinicalCase {
  id: number;
  title: string;
  chief_complaint: string;
  present_illness: string;
  four_examinations: {
    inspection: string;
    auscultation: string;
    inquiry: string;
    palpation: string;
  };
  lab_results?: string;
  correct_western_dx: string;
  correct_tcm_dx: string;
  correct_syndrome: string;
  correct_method: string;
  correct_formula: string;
  explanation: string;
}

// === 新增：知识图谱节点 ===
export interface PathwayNode {
  id: string;
  type: 'disease' | 'syndrome' | 'method' | 'formula' | 'herb';
  name: string;
  children?: string[];
}

export interface PathwayEdge {
  source: string;
  target: string;
}
