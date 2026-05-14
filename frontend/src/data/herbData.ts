import { Herb } from '../types';

/**
 * 扩展中药库（ID 61-100）
 * 覆盖：解表/清热/化湿/利水/温里/理气/活血/止血/
 *       化痰/安神/开窍/收涩/补益/平肝
 * 基于《中国药典》和《中药学》教材常用品种
 */
export const extendedHerbs: Herb[] = [
  // ===== 解表药 =====
  { id: 61, name: '香薷', pinyin: 'Xiang Ru', taste: '辛', nature: '微温', channel_tropism: '肺、胃', functions: '发汗解表，化湿和中，利水消肿', usage_dosage: '3~10g', cautions: '表虚有汗者忌用。', category: '解表药', preparation: '生用', chemical_composition: '挥发油（香薷酮、香芹酚）' },
  { id: 62, name: '葛根', pinyin: 'Ge Gen', taste: '甘、辛', nature: '凉', channel_tropism: '脾、胃', functions: '解肌退热，透疹，生津止渴，升阳止泻', usage_dosage: '10~15g', cautions: '胃寒呕吐者慎用。', category: '解表药', preparation: '生用或煨用（煨葛根偏于升阳止泻）', chemical_composition: '葛根素（异黄酮类）、大豆苷元' },
  { id: 63, name: '升麻', pinyin: 'Sheng Ma', taste: '辛、微甘', nature: '微寒', channel_tropism: '肺、脾、胃、大肠', functions: '发表透疹，清热解毒，升举阳气', usage_dosage: '3~10g', cautions: '麻疹已透、阴虚火旺者忌用。', category: '解表药', preparation: '生用或蜜炙', chemical_composition: '升麻素、异阿魏酸、三萜皂苷' },
  // ===== 清热药 =====
  { id: 64, name: '芦根', pinyin: 'Lu Gen', taste: '甘', nature: '寒', channel_tropism: '肺、胃', functions: '清热泻火，生津止渴，除烦止呕', usage_dosage: '15~30g', cautions: '脾胃虚寒者慎用。', category: '清热药', preparation: '鲜用或干用', chemical_composition: '薏苡素、多糖类、天门冬酰胺' },
  { id: 65, name: '竹茹', pinyin: 'Zhu Ru', taste: '甘', nature: '微寒', channel_tropism: '肺、胃、胆', functions: '清热化痰，除烦止呕', usage_dosage: '6~10g', cautions: '寒痰咳嗽、胃寒呕吐者不宜。', category: '清热药', preparation: '生用或姜汁炙', chemical_composition: '多糖、氨基酸' },
  { id: 66, name: '苦参', pinyin: 'Ku Shen', taste: '苦', nature: '寒', channel_tropism: '心、肝、胃、大肠、膀胱', functions: '清热燥湿，杀虫利尿', usage_dosage: '5~10g', cautions: '脾胃虚寒者忌用。反藜芦。', category: '清热药', preparation: '生用', chemical_composition: '苦参碱、氧化苦参碱（生物碱类）' },
  { id: 67, name: '赤芍', pinyin: 'Chi Shao', taste: '苦', nature: '微寒', channel_tropism: '肝', functions: '清热凉血，散瘀止痛', usage_dosage: '6~12g', cautions: '血虚者慎用。反藜芦。', category: '清热药', preparation: '生用', chemical_composition: '芍药苷、芍药内酯苷（单萜苷类）' },
  { id: 68, name: '射干', pinyin: 'She Gan', taste: '苦', nature: '寒', channel_tropism: '肺', functions: '清热解毒，消痰利咽', usage_dosage: '3~10g', cautions: '脾虚便溏者不宜。孕妇忌用。', category: '清热药', preparation: '生用', chemical_composition: '射干苷、鸢尾苷（异黄酮类）' },
  { id: 69, name: '白花蛇舌草', pinyin: 'Bai Hua She She Cao', taste: '苦、甘', nature: '寒', channel_tropism: '胃、大肠、小肠', functions: '清热解毒，利湿通淋', usage_dosage: '15~60g', cautions: '脾胃虚寒者慎用。', category: '清热药', preparation: '生用', chemical_composition: '熊果酸、齐墩果酸、多糖' },
  { id: 70, name: '土茯苓', pinyin: 'Tu Fu Ling', taste: '甘、淡', nature: '平', channel_tropism: '肝、胃', functions: '解毒除湿，通利关节', usage_dosage: '15~60g', cautions: '肝肾阴虚者慎用。服药期间忌茶。', category: '清热药', preparation: '生用', chemical_composition: '落新妇苷、黄杞苷（黄酮类）' },
  { id: 71, name: '马齿苋', pinyin: 'Ma Chi Xian', taste: '酸', nature: '寒', channel_tropism: '肝、大肠', functions: '清热解毒，凉血止血，止痢', usage_dosage: '9~15g（鲜品30~60g）', cautions: '脾胃虚寒者慎用。孕妇忌用。', category: '清热药', preparation: '鲜用或干用', chemical_composition: '去甲肾上腺素、多巴胺、有机酸' },
  // ===== 化湿/利水药 =====
  { id: 72, name: '广藿香', pinyin: 'Guang Huo Xiang', taste: '辛', nature: '微温', channel_tropism: '脾、胃、肺', functions: '芳香化湿，和中止呕，发表解暑', usage_dosage: '3~10g', cautions: '阴虚火旺者忌用。', category: '化湿药', preparation: '生用（后下）', chemical_composition: '广藿香酮、广藿香醇（挥发油类）' },
  { id: 73, name: '佩兰', pinyin: 'Pei Lan', taste: '辛', nature: '平', channel_tropism: '脾、胃、肺', functions: '芳香化湿，醒脾开胃，发表解暑', usage_dosage: '3~10g', cautions: '阴虚、气虚者不宜。', category: '化湿药', preparation: '生用（后下）', chemical_composition: '佩兰内酯、挥发油' },
  { id: 74, name: '车前子', pinyin: 'Che Qian Zi', taste: '甘', nature: '微寒', channel_tropism: '肝、肾、肺、小肠', functions: '清热利尿通淋，渗湿止泻，明目祛痰', usage_dosage: '9~15g（包煎）', cautions: '肾虚精滑者慎用。', category: '利水渗湿药', preparation: '生用或盐炙（盐炙补肾）', chemical_composition: '车前子胶（多糖）、桃叶珊瑚苷' },
  { id: 75, name: '石韦', pinyin: 'Shi Wei', taste: '苦、甘', nature: '微寒', channel_tropism: '肺、膀胱', functions: '利尿通淋，清肺止咳，凉血止血', usage_dosage: '6~12g', cautions: '阴虚无湿热者忌用。', category: '利水渗湿药', preparation: '生用', chemical_composition: '芒果苷、异芒果苷（黄酮类）' },
  // ===== 温里药 =====
  { id: 76, name: '细辛', pinyin: 'Xi Xin', taste: '辛', nature: '温；小毒', channel_tropism: '心、肺、肾', functions: '祛风散寒，通窍止痛，温肺化饮', usage_dosage: '1~3g', cautions: '气虚多汗、阴虚头痛者忌用。不宜与藜芦同用。用量不宜过大。', category: '温里药', preparation: '生用', chemical_composition: '甲基丁香酚、细辛醚（挥发油类）' },
  { id: 77, name: '小茴香', pinyin: 'Xiao Hui Xiang', taste: '辛', nature: '温', channel_tropism: '肝、肾、脾、胃', functions: '散寒止痛，理气和胃', usage_dosage: '3~6g', cautions: '阴虚火旺者忌用。', category: '温里药', preparation: '生用或盐炙', chemical_composition: '茴香脑（反式对丙烯基苯酚）、茴香醛' },
  // ===== 理气药 =====
  { id: 78, name: '乌药', pinyin: 'Wu Yao', taste: '辛', nature: '温', channel_tropism: '肺、脾、肾、膀胱', functions: '行气止痛，温肾散寒', usage_dosage: '6~10g', cautions: '气虚内热者忌用。', category: '理气药', preparation: '生用', chemical_composition: '乌药醚内酯、乌药酸（倍半萜类）' },
  { id: 79, name: '薤白', pinyin: 'Xie Bai', taste: '辛、苦', nature: '温', channel_tropism: '肺、胃、大肠', functions: '通阳散结，行气导滞', usage_dosage: '5~10g', cautions: '气虚者慎用。', category: '理气药', preparation: '生用', chemical_composition: '大蒜氨酸、甲基大蒜氨酸（含硫化合物）' },
  // ===== 活血化瘀药 =====
  { id: 80, name: '郁金', pinyin: 'Yu Jin', taste: '辛、苦', nature: '寒', channel_tropism: '肝、心、肺', functions: '活血止痛，行气解郁，清心凉血，利胆退黄', usage_dosage: '3~10g', cautions: '阴虚失血者慎用。不宜与丁香同用。', category: '活血化瘀药', preparation: '生用', chemical_composition: '姜黄素、吉马酮（倍半萜类）' },
  { id: 81, name: '鸡血藤', pinyin: 'Ji Xue Teng', taste: '苦、甘', nature: '温', channel_tropism: '肝、肾', functions: '活血补血，调经止痛，舒筋活络', usage_dosage: '10~15g', cautions: '月经过多者慎用。', category: '活血化瘀药', preparation: '生用', chemical_composition: '鸡血藤醇、刺芒柄花素（异黄酮类）' },
  { id: 82, name: '乳香', pinyin: 'Ru Xiang', taste: '辛、苦', nature: '温', channel_tropism: '心、肝、脾', functions: '活血定痛，消肿生肌', usage_dosage: '3~5g（多制用）', cautions: '孕妇忌用。胃弱者慎用。', category: '活血化瘀药', preparation: '醋制或炒制', chemical_composition: '乳香脂酸、α-蒎烯（萜类）' },
  { id: 83, name: '没药', pinyin: 'Mo Yao', taste: '辛、苦', nature: '平', channel_tropism: '心、肝、脾', functions: '散瘀定痛，消肿生肌', usage_dosage: '3~5g', cautions: '孕妇忌用。胃弱者慎用。', category: '活血化瘀药', preparation: '醋制或炒制', chemical_composition: '没药酸、α-罕没药酸（萜类）' },
  // ===== 止血药 =====
  { id: 84, name: '地榆', pinyin: 'Di Yu', taste: '苦、酸、涩', nature: '微寒', channel_tropism: '肝、大肠', functions: '凉血止血，解毒敛疮', usage_dosage: '10~15g', cautions: '大面积烧伤不宜外用（含鞣质被吸收可能导致肝毒性）。', category: '止血药', preparation: '生用或炒炭', chemical_composition: '地榆皂苷、没食子酸、鞣质' },
  { id: 85, name: '蒲黄', pinyin: 'Pu Huang', taste: '甘', nature: '平', channel_tropism: '肝、心包', functions: '止血化瘀通淋', usage_dosage: '5~10g（包煎）', cautions: '孕妇慎用。', category: '止血药', preparation: '生用（活血）或炒炭（止血）', chemical_composition: '香蒲新苷、异鼠李素-3-O-新橙皮苷（黄酮类）' },
  { id: 86, name: '仙鹤草', pinyin: 'Xian He Cao', taste: '苦、涩', nature: '平', channel_tropism: '心、肝', functions: '收敛止血，截疟，止痢，解毒', usage_dosage: '6~12g', cautions: '外感发热者不宜。', category: '止血药', preparation: '生用', chemical_composition: '仙鹤草素（鞣质类）、鹤草酚' },
  { id: 87, name: '艾叶', pinyin: 'Ai Ye', taste: '辛、苦', nature: '温；小毒', channel_tropism: '肝、脾、肾', functions: '温经止血，散寒止痛，祛湿止痒', usage_dosage: '3~9g', cautions: '阴虚血热者慎用。', category: '止血药', preparation: '生用或炒炭（醋艾炭温经止血力更强）', chemical_composition: '桉叶油素、侧柏酮（挥发油类）' },
  // ===== 化痰止咳药 =====
  { id: 88, name: '天南星', pinyin: 'Tian Nan Xing', taste: '苦、辛', nature: '温；有毒', channel_tropism: '肺、肝、脾', functions: '燥湿化痰，祛风止痉，散结消肿', usage_dosage: '制天南星3~10g', cautions: '孕妇忌用。阴虚燥痰者忌用。生品不宜内服。', category: '化痰药', preparation: '制天南星（白矾/生姜制）', chemical_composition: '生物碱、皂苷、安息香酸' },
  { id: 89, name: '白芥子', pinyin: 'Bai Jie Zi', taste: '辛', nature: '温', channel_tropism: '肺', functions: '温肺豁痰利气，散结通络止痛', usage_dosage: '3~6g', cautions: '肺虚咳嗽、阴虚火旺者忌用。外敷刺激性强。', category: '化痰药', preparation: '炒用（减毒）', chemical_composition: '白芥子苷（硫苷类）、芥子酶、脂肪油' },
  // ===== 平肝息风/安神/开窍 =====
  { id: 90, name: '石决明', pinyin: 'Shi Jue Ming', taste: '咸', nature: '寒', channel_tropism: '肝', functions: '平肝潜阳，清肝明目', usage_dosage: '6~20g（先煎）', cautions: '脾胃虚寒者慎用。', category: '平肝息风药', preparation: '生用或煅用', chemical_composition: '碳酸钙（90%以上）、壳角质、氨基酸' },
  { id: 91, name: '石菖蒲', pinyin: 'Shi Chang Pu', taste: '辛、苦', nature: '温', channel_tropism: '心、胃', functions: '开窍豁痰，醒神益智，化湿开胃', usage_dosage: '3~10g', cautions: '阴虚阳亢、烦躁多汗者慎用。', category: '开窍药', preparation: '生用', chemical_composition: 'β-细辛醚、α-细辛醚（苯丙素类）' },
  // ===== 收涩药 =====
  { id: 92, name: '五倍子', pinyin: 'Wu Bei Zi', taste: '酸、涩', nature: '寒', channel_tropism: '肺、大肠、肾', functions: '敛肺降火，涩肠止泻，敛汗止血，收湿敛疮', usage_dosage: '3~6g', cautions: '外感风寒、肺有实热者忌用。', category: '收涩药', preparation: '生用', chemical_composition: '五倍子鞣质（没食子酰葡萄糖）、没食子酸' },
  { id: 93, name: '浮小麦', pinyin: 'Fu Xiao Mai', taste: '甘', nature: '凉', channel_tropism: '心', functions: '除虚热，止汗', usage_dosage: '15~30g', cautions: '无特殊禁忌。', category: '收涩药', preparation: '生用', chemical_composition: '淀粉、蛋白质、B族维生素' },
  // ===== 补益药 =====
  { id: 94, name: '杜仲', pinyin: 'Du Zhong', taste: '甘', nature: '温', channel_tropism: '肝、肾', functions: '补肝肾，强筋骨，安胎', usage_dosage: '10~15g', cautions: '阴虚火旺者慎用。', category: '补益药', preparation: '盐炙（盐杜仲补肾力更强）', chemical_composition: '杜仲胶、京尼平苷酸、绿原酸' },
  { id: 95, name: '续断', pinyin: 'Xu Duan', taste: '苦、辛', nature: '微温', channel_tropism: '肝、肾', functions: '补肝肾，强筋骨，续折伤，止崩漏', usage_dosage: '10~15g', cautions: '风湿热痹者忌用。', category: '补益药', preparation: '酒炙或盐炙', chemical_composition: '川续断皂苷、龙胆碱' },
  { id: 96, name: '枸杞子', pinyin: 'Gou Qi Zi', taste: '甘', nature: '平', channel_tropism: '肝、肾', functions: '滋补肝肾，益精明目', usage_dosage: '6~12g', cautions: '脾虚便溏者慎用。', category: '补益药', preparation: '生用', chemical_composition: '枸杞多糖、甜菜碱、类胡萝卜素（玉米黄质）' },
  { id: 97, name: '女贞子', pinyin: 'Nu Zhen Zi', taste: '甘、苦', nature: '凉', channel_tropism: '肝、肾', functions: '滋补肝肾，乌须明目', usage_dosage: '6~12g', cautions: '脾胃虚寒泄泻者不宜。', category: '补益药', preparation: '酒制（酒女贞子）', chemical_composition: '齐墩果酸、女贞子苷（环烯醚萜类）' },
  { id: 98, name: '巴戟天', pinyin: 'Ba Ji Tian', taste: '甘、辛', nature: '微温', channel_tropism: '肾、肝', functions: '补肾阳，强筋骨，祛风湿', usage_dosage: '3~10g', cautions: '阴虚火旺者忌用。', category: '补益药', preparation: '盐炙', chemical_composition: '蒽醌类（甲基异茜草素）、低聚糖' },
  { id: 99, name: '肉苁蓉', pinyin: 'Rou Cong Rong', taste: '甘、咸', nature: '温', channel_tropism: '肾、大肠', functions: '补肾阳，益精血，润肠通便', usage_dosage: '10~15g', cautions: '阴虚火旺、实热便秘者不宜。', category: '补益药', preparation: '酒制', chemical_composition: '松果菊苷、毛蕊花糖苷（苯乙醇苷类）' },
  { id: 100, name: '海马', pinyin: 'Hai Ma', taste: '甘、咸', nature: '温', channel_tropism: '肝、肾', functions: '温肾壮阳，散结消肿', usage_dosage: '3~9g', cautions: '孕妇及阴虚火旺者忌用。', category: '补益药', preparation: '酒炙', chemical_composition: '蛋白质、氨基酸、雄激素样物质' },
];
