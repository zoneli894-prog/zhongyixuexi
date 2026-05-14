import { Microbe, ReviewCard } from '../types';
import { extendedMicrobes } from './microbeData';

const coreMicrobes: Microbe[] = [
  {
    id: 1, name: '金黄色葡萄球菌', pinyin: 'Jin Huang Se Pu Tao Qiu Jun', genus: '葡萄球菌属 (Staphylococcus)',
    gram_stain: '阳性', shape: '球形（葡萄串状排列）',
    pathogenesis: '产生多种毒素（如肠毒素、剥脱毒素）和酶（如凝固酶），导致化脓性感染和食物中毒。',
    clinical_diseases: ['皮肤脓肿', '肺炎', '败血症', '食物中毒', '心内膜炎'],
    transmission: '皮肤接触、飞沫传播、食物污染',
    prevention: '严格无菌操作，合理使用抗生素，注意食品安全',
  },
  {
    id: 2, name: '大肠杆菌', pinyin: 'Da Chang Gan Jun', genus: '埃希菌属 (Escherichia)',
    gram_stain: '阴性', shape: '杆状',
    pathogenesis: '肠道正常菌群，但某些血清型（如O157:H7）可产生志贺毒素导致出血性肠炎。',
    clinical_diseases: ['尿路感染', '腹泻', '败血症', '新生儿脑膜炎'],
    transmission: '粪-口传播、食物污染、医源性感染',
    prevention: '注意饮食卫生，生熟分开，灭菌操作',
  },
  {
    id: 3, name: '结核分枝杆菌', pinyin: 'Jie He Fen Zhi Gan Jun', genus: '分枝杆菌属 (Mycobacterium)',
    gram_stain: '阳性', shape: '细长杆状，略弯曲（抗酸染色阳性）',
    pathogenesis: '含有大量脂质（分枝菌酸），抗吞噬能力强，在巨噬细胞内寄生，形成结核结节和干酪样坏死。',
    clinical_diseases: ['肺结核', '骨结核', '肾结核', '结核性脑膜炎'],
    transmission: '飞沫传播（主要）',
    prevention: '卡介苗接种（BCG），改善通风，早期发现和治疗',
  },
  {
    id: 4, name: '幽门螺杆菌', pinyin: 'You Men Luo Gan Jun', genus: '螺杆菌属 (Helicobacter)',
    gram_stain: '阴性', shape: '螺旋形杆状',
    pathogenesis: '产生尿素酶中和胃酸，在胃黏膜定植，引起慢性炎症，与胃溃疡和胃癌密切相关。',
    clinical_diseases: ['慢性胃炎', '消化性溃疡', '胃癌', '胃MALT淋巴瘤'],
    transmission: '粪-口传播、口-口传播',
    prevention: '注意饮食卫生，分餐制，三联/四联疗法根除',
  },
  {
    id: 5, name: '肺炎链球菌', pinyin: 'Fei Yan Lian Qiu Jun', genus: '链球菌属 (Streptococcus)',
    gram_stain: '阳性', shape: '矛头状成对排列',
    pathogenesis: '荚膜多糖抗吞噬，溶血素和神经氨酸酶导致组织损伤。是社区获得性肺炎最常见病原。',
    clinical_diseases: ['大叶性肺炎', '中耳炎', '脑膜炎', '败血症'],
    transmission: '飞沫传播',
    prevention: '肺炎球菌疫苗接种，增强免疫力',
  },
  {
    id: 6, name: '霍乱弧菌', pinyin: 'Huo Luan Hu Jun', genus: '弧菌属 (Vibrio)',
    gram_stain: '阴性', shape: '弧形（逗点状）',
    pathogenesis: '产生霍乱肠毒素（CT），激活腺苷酸环化酶，导致大量水样腹泻。',
    clinical_diseases: ['霍乱'],
    transmission: '粪-口传播，污染水源',
    prevention: '安全饮水，霍乱疫苗，及时补液治疗',
  },
  {
    id: 7, name: '流感病毒', pinyin: 'Liu Gan Bing Du', genus: '正黏病毒科 (Orthomyxoviridae)',
    gram_stain: '不适用', shape: '球形（RNA病毒）',
    pathogenesis: '血凝素(HA)和神经氨酸酶(NA)抗原变异（抗原漂移和抗原转换）导致反复流行和大流行。',
    clinical_diseases: ['流行性感冒'],
    transmission: '飞沫传播、接触传播',
    prevention: '每年接种流感疫苗，戴口罩，勤洗手',
  },
  {
    id: 8, name: '乙肝病毒', pinyin: 'Yi Gan Bing Du', genus: '嗜肝病毒科 (Hepadnaviridae)',
    gram_stain: '不适用', shape: '球形（部分双链DNA病毒）',
    pathogenesis: '通过免疫介导的肝细胞损伤导致肝炎，可慢性化导致肝硬化和肝细胞癌。',
    clinical_diseases: ['急性乙型肝炎', '慢性乙型肝炎', '肝硬化', '肝细胞癌'],
    transmission: '血液传播、母婴传播、性传播',
    prevention: '乙肝疫苗接种，避免高危行为',
  },
  {
    id: 9, name: '白色念珠菌', pinyin: 'Bai Se Nian Zhu Jun', genus: '念珠菌属 (Candida)',
    gram_stain: '阳性', shape: '卵圆形（可形成假菌丝）',
    pathogenesis: '条件致病菌，当机体免疫力低下或菌群失调时致病。形成生物膜增强耐药性。',
    clinical_diseases: ['口腔念珠菌病', '阴道念珠菌病', '全身性念珠菌感染'],
    transmission: '内源性感染（主要）、接触传播',
    prevention: '合理使用抗生素，控制血糖，增强免疫力',
  },
  {
    id: 10, name: '铜绿假单胞菌', pinyin: 'Tong Lv Jia Dan Bao Jun', genus: '假单胞菌属 (Pseudomonas)',
    gram_stain: '阴性', shape: '杆状',
    pathogenesis: '产生绿色色素（绿脓素）和外毒素A，多药耐药，是医院感染的重要病原菌。',
    clinical_diseases: ['烧伤感染', '呼吸机相关性肺炎', '尿路感染', '角膜炎'],
    transmission: '医源性传播、环境传播',
    prevention: '严格消毒隔离，合理使用抗生素',
  },
];

// 合并核心微生物 + 扩展微生物 = 30种
export const microbes: Microbe[] = [...coreMicrobes, ...extendedMicrobes];

// 免疫学通路（Mermaid 语法）
export const immunePathways = [
  {
    id: 'innate',
    name: '固有免疫反应通路',
    mermaid: `graph TD
    A[病原体入侵] --> B{模式识别受体 PRRs}
    B -->|TLRs| C[巨噬细胞活化]
    B -->|NLRs| D[NLRP3炎症小体组装]
    B -->|RLRs| E[干扰素产生]
    C --> F[吞噬杀菌]
    C --> G[促炎细胞因子分泌]
    G --> H[TNF-α / IL-1 / IL-6]
    D --> I[Caspase-1激活]
    I --> J[IL-1β / IL-18成熟释放]
    E --> K[I型干扰素]
    K --> L[抗病毒状态建立]
    H --> M[炎症反应]
    F --> N[抗原提呈]
    N --> O[连接适应性免疫]`,
  },
  {
    id: 'tcell',
    name: 'T细胞分化通路',
    mermaid: `graph TD
    A[胸腺T细胞前体] --> B[阳性选择 MHC限制性]
    B --> C[阴性选择 自身耐受]
    C --> D[成熟T细胞输出]
    D --> E{外周抗原刺激}
    E -->|CD4+ T细胞| F[辅助性T细胞]
    F -->|IL-12| G[Th1]
    F -->|IL-4| H[Th2]
    F -->|TGF-β| I[Treg]
    F -->|IL-6 + TGF-β| J[Th17]
    G --> K[细胞免疫 IFN-γ]
    H --> L[体液免疫 IL-4/IL-5]
    I --> M[免疫抑制 IL-10/TGF-β]
    J --> N[黏膜防御 IL-17]
    E -->|CD8+ T细胞| O[细胞毒性T细胞 CTL]
    O --> P[穿孔素/颗粒酶杀伤]`,
  },
  {
    id: 'complement',
    name: '补体系统激活通路',
    mermaid: `graph TD
    A[经典途径] -->|抗原抗体复合物 C1q| B[C4/C2活化]
    B --> C[C3转化酶 C4b2a]
    D[旁路途径] -->|C3水解 + B因子| E[C3转化酶 C3bBb]
    F[凝集素途径] -->|MBL + MASP| B
    C --> G[C3b沉积]
    E --> G
    G --> H[C5转化酶]
    H --> I[膜攻击复合物 MAC]
    I --> J[靶细胞溶解]
    G --> K[调理作用 C3b]
    G --> L[趋化作用 C3a/C5a]`,
  },
];

// 免疫学 review cards
export const immunologyReviewCards: ReviewCard[] = [
  { id: 101, card_type: 'diagnostic', card_id: 1, name: 'TLR4', pinyin: '', details: 'Toll样受体4，识别革兰氏阴性菌脂多糖(LPS)，激活NF-κB通路，促进炎症因子释放。', easiness_factor: 2.5, interval_days: 1, repetitions: 0, next_review_date: new Date().toISOString().split('T')[0] },
  { id: 102, card_type: 'diagnostic', card_id: 2, name: 'CD4+ T细胞', pinyin: '', details: '辅助性T细胞，识别MHC-II类分子提呈的抗原肽。亚群包括Th1、Th2、Th17、Treg。', easiness_factor: 2.5, interval_days: 1, repetitions: 0, next_review_date: new Date().toISOString().split('T')[0] },
  { id: 103, card_type: 'diagnostic', card_id: 3, name: 'MHC/HLA', pinyin: '', details: '主要组织相容性复合体/人类白细胞抗原。MHC-I: 所有有核细胞，CD8+ T识别。MHC-II: APC细胞，CD4+ T识别。', easiness_factor: 2.5, interval_days: 1, repetitions: 0, next_review_date: new Date().toISOString().split('T')[0] },
  { id: 104, card_type: 'diagnostic', card_id: 4, name: 'IgG', pinyin: '', details: '血清含量最高的Ig（75-80%），唯一可通过胎盘的抗体。功能：中和、调理、激活补体经典途径、ADCC。', easiness_factor: 2.5, interval_days: 1, repetitions: 0, next_review_date: new Date().toISOString().split('T')[0] },
  { id: 105, card_type: 'diagnostic', card_id: 5, name: 'IgA', pinyin: '', details: '黏膜免疫的主力抗体。血清中以单体存在，分泌液中以二聚体（SIgA）存在，抵抗病原体黏附。', easiness_factor: 2.5, interval_days: 1, repetitions: 0, next_review_date: new Date().toISOString().split('T')[0] },
];

// 微生物 review cards（前10种核心致病菌）
export const microbeReviewCards: ReviewCard[] = microbes.slice(0, 10).map((m, i) => ({
  id: 201 + i,
  card_type: 'microbe' as const,
  card_id: m.id,
  name: m.name,
  pinyin: m.pinyin,
  details: `革兰氏${m.gram_stain}，${m.shape}。致病机制：${m.pathogenesis}。临床疾病：${m.clinical_diseases.join('、')}`,
  easiness_factor: 2.5,
  interval_days: 1,
  repetitions: 0,
  next_review_date: new Date().toISOString().split('T')[0],
}));
