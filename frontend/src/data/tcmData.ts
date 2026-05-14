import { Herb, Formula, Syndrome, Meridian, Disease, ReviewCard } from '../types';
import { extendedHerbs } from './herbData';

// ============================================================
// 中药数据（核心60味 + 扩展40味 = 100味）
// ============================================================
const coreHerbs: Herb[] = [
  // ===== 补益药 =====
  { id: 1, name: '人参', pinyin: 'Ren Shen', taste: '甘、微苦', nature: '微温', channel_tropism: '脾、肺、心、肾', functions: '大补元气，复脉固脱，补脾益肺，生津养血，安神益智', usage_dosage: '3~9g，挽救虚脱15~30g', cautions: '实证、热证忌服。反藜芦，畏五灵脂。' },
  { id: 2, name: '黄芪', pinyin: 'Huang Qi', taste: '甘', nature: '微温', channel_tropism: '脾、肺', functions: '补气升阳，固表止汗，利水消肿，生津养血，行滞通痹，托毒排脓，敛疮生肌', usage_dosage: '9~30g', cautions: '表实邪盛、气滞湿阻、食积内停等不宜使用。' },
  { id: 3, name: '白术', pinyin: 'Bai Zhu', taste: '苦、甘', nature: '温', channel_tropism: '脾、胃', functions: '健脾益气，燥湿利水，止汗，安胎', usage_dosage: '6~12g', cautions: '阴虚燥渴、气滞胀闷者忌服。' },
  { id: 4, name: '甘草', pinyin: 'Gan Cao', taste: '甘', nature: '平', channel_tropism: '心、肺、脾、胃', functions: '补脾益气，清热解毒，祛痰止咳，缓急止痛，调和诸药', usage_dosage: '2~10g', cautions: '不宜与海藻、大戟、甘遂、芫花同用。' },
  { id: 5, name: '当归', pinyin: 'Dang Gui', taste: '甘、辛', nature: '温', channel_tropism: '肝、心、脾', functions: '补血活血，调经止痛，润肠通便', usage_dosage: '6~12g', cautions: '湿盛中满、大便溏泄者慎服。' },
  { id: 6, name: '川芎', pinyin: 'Chuan Xiong', taste: '辛', nature: '温', channel_tropism: '肝、胆、心包', functions: '活血行气，祛风止痛', usage_dosage: '3~10g', cautions: '阴虚火旺、月经过多者慎用。' },
  { id: 7, name: '白芍', pinyin: 'Bai Shao', taste: '苦、酸', nature: '微寒', channel_tropism: '肝、脾', functions: '养血调经，敛阴止汗，柔肝止痛，平抑肝阳', usage_dosage: '6~15g', cautions: '阳衰虚寒之证不宜单独使用。' },
  { id: 8, name: '熟地黄', pinyin: 'Shu Di Huang', taste: '甘', nature: '微温', channel_tropism: '肝、肾', functions: '补血滋阴，益精填髓', usage_dosage: '9~15g', cautions: '脾胃虚弱、气滞痰多者慎用。' },
  { id: 9, name: '茯苓', pinyin: 'Fu Ling', taste: '甘、淡', nature: '平', channel_tropism: '心、肺、脾、肾', functions: '利水渗湿，健脾，宁心', usage_dosage: '10~15g', cautions: '虚寒精滑者慎用。' },
  { id: 10, name: '半夏', pinyin: 'Ban Xia', taste: '辛', nature: '温；有毒', channel_tropism: '脾、胃、肺', functions: '燥湿化痰，降逆止呕，消痞散结', usage_dosage: '3~9g', cautions: '不宜与川乌、草乌同用。阴虚燥咳者忌用。' },
  { id: 11, name: '陈皮', pinyin: 'Chen Pi', taste: '辛、苦', nature: '温', channel_tropism: '脾、肺', functions: '理气健脾，燥湿化痰', usage_dosage: '3~10g', cautions: '气虚体燥、阴虚燥咳者慎用。' },
  { id: 12, name: '桂枝', pinyin: 'Gui Zhi', taste: '辛、甘', nature: '温', channel_tropism: '心、肺、膀胱', functions: '发汗解肌，温通经脉，助阳化气，平冲降逆', usage_dosage: '3~10g', cautions: '温热病及阴虚火旺者忌用。' },
  { id: 13, name: '麻黄', pinyin: 'Ma Huang', taste: '辛、微苦', nature: '温', channel_tropism: '肺、膀胱', functions: '发汗解表，宣肺平喘，利水消肿', usage_dosage: '2~10g', cautions: '体虚自汗、盗汗者忌用。' },
  { id: 14, name: '柴胡', pinyin: 'Chai Hu', taste: '辛、苦', nature: '微寒', channel_tropism: '肝、胆、肺', functions: '和解表里，疏肝解郁，升阳举陷', usage_dosage: '3~10g', cautions: '肝阳上亢、肝风内动者忌用。' },
  { id: 15, name: '黄连', pinyin: 'Huang Lian', taste: '苦', nature: '寒', channel_tropism: '心、脾、胃、肝、胆、大肠', functions: '清热燥湿，泻火解毒', usage_dosage: '2~5g', cautions: '脾胃虚寒者忌用。不宜久服。' },
  // 清热解毒
  { id: 16, name: '金银花', pinyin: 'Jin Yin Hua', taste: '甘', nature: '寒', channel_tropism: '肺、心、胃', functions: '清热解毒，疏散风热', usage_dosage: '6~15g', cautions: '脾胃虚寒及气虚疮疡脓清者忌用。' },
  { id: 17, name: '连翘', pinyin: 'Lian Qiao', taste: '苦', nature: '微寒', channel_tropism: '肺、心、小肠', functions: '清热解毒，消肿散结，疏散风热', usage_dosage: '6~15g', cautions: '脾胃虚弱者慎用。' },
  { id: 18, name: '板蓝根', pinyin: 'Ban Lan Gen', taste: '苦', nature: '寒', channel_tropism: '心、胃', functions: '清热解毒，凉血利咽', usage_dosage: '9~15g', cautions: '体虚而无实火热毒者忌服。' },
  // ===== 新增：解表药 =====
  { id: 19, name: '荆芥', pinyin: 'Jing Jie', taste: '辛', nature: '微温', channel_tropism: '肺、肝', functions: '祛风解表，透疹消疮，止血', usage_dosage: '5~10g', cautions: '表虚自汗、阴虚头痛者忌用。' },
  { id: 20, name: '防风', pinyin: 'Fang Feng', taste: '辛、甘', nature: '微温', channel_tropism: '膀胱、肝、脾', functions: '祛风解表，胜湿止痛，止痉', usage_dosage: '5~10g', cautions: '阴血亏虚、热病动风者不宜用。' },
  { id: 21, name: '薄荷', pinyin: 'Bo He', taste: '辛', nature: '凉', channel_tropism: '肺、肝', functions: '疏散风热，清利头目，利咽透疹，疏肝行气', usage_dosage: '3~6g（后下）', cautions: '体虚多汗者不宜。' },
  { id: 22, name: '菊花', pinyin: 'Ju Hua', taste: '辛、甘、苦', nature: '微寒', channel_tropism: '肺、肝', functions: '疏散风热，平抑肝阳，清肝明目，清热解毒', usage_dosage: '5~10g', cautions: '气虚胃寒者慎用。' },
  { id: 23, name: '桑叶', pinyin: 'Sang Ye', taste: '苦、甘', nature: '寒', channel_tropism: '肺、肝', functions: '疏散风热，清肺润燥，平抑肝阳，清肝明目', usage_dosage: '5~10g', cautions: '无特殊禁忌。' },
  { id: 24, name: '生姜', pinyin: 'Sheng Jiang', taste: '辛', nature: '微温', channel_tropism: '肺、脾、胃', functions: '解表散寒，温中止呕，温肺止咳', usage_dosage: '3~10g', cautions: '阴虚内热者忌服。' },
  // 清热泻火/凉血
  { id: 25, name: '黄芩', pinyin: 'Huang Qin', taste: '苦', nature: '寒', channel_tropism: '肺、胆、脾、大肠、小肠', functions: '清热燥湿，泻火解毒，止血，安胎', usage_dosage: '3~10g', cautions: '脾胃虚寒者不宜。' },
  { id: 26, name: '石膏', pinyin: 'Shi Gao', taste: '辛、甘', nature: '大寒', channel_tropism: '肺、胃', functions: '清热泻火，除烦止渴', usage_dosage: '15~60g（先煎）', cautions: '脾胃虚寒者忌用。' },
  { id: 27, name: '知母', pinyin: 'Zhi Mu', taste: '苦、甘', nature: '寒', channel_tropism: '肺、胃、肾', functions: '清热泻火，滋阴润燥', usage_dosage: '6~12g', cautions: '脾虚便溏者不宜。' },
  { id: 28, name: '栀子', pinyin: 'Zhi Zi', taste: '苦', nature: '寒', channel_tropism: '心、肺、三焦', functions: '泻火除烦，清热利湿，凉血解毒', usage_dosage: '6~10g', cautions: '脾虚便溏者忌用。' },
  { id: 29, name: '生地黄', pinyin: 'Sheng Di Huang', taste: '甘、苦', nature: '寒', channel_tropism: '心、肝、肾', functions: '清热凉血，养阴生津', usage_dosage: '10~15g', cautions: '脾虚泄泻者不宜。' },
  { id: 30, name: '玄参', pinyin: 'Xuan Shen', taste: '苦、甘、咸', nature: '微寒', channel_tropism: '肺、胃、肾', functions: '清热凉血，滋阴降火，解毒散结', usage_dosage: '10~15g', cautions: '脾胃虚寒者不宜。反藜芦。' },
  { id: 31, name: '牡丹皮', pinyin: 'Mu Dan Pi', taste: '苦、辛', nature: '微寒', channel_tropism: '心、肝、肾', functions: '清热凉血，活血化瘀，退虚热', usage_dosage: '6~12g', cautions: '血虚有寒、孕妇及月经过多者慎用。' },
  { id: 32, name: '夏枯草', pinyin: 'Xia Ku Cao', taste: '辛、苦', nature: '寒', channel_tropism: '肝、胆', functions: '清热泻火，明目，散结消肿', usage_dosage: '9~15g', cautions: '脾胃虚弱者慎用。' },
  { id: 33, name: '决明子', pinyin: 'Jue Ming Zi', taste: '甘、苦、咸', nature: '微寒', channel_tropism: '肝、大肠', functions: '清热明目，润肠通便', usage_dosage: '9~15g', cautions: '脾胃虚寒及气虚便溏者不宜。' },
  // ===== 新增：芳香化湿/利水渗湿 =====
  { id: 34, name: '苍术', pinyin: 'Cang Zhu', taste: '辛、苦', nature: '温', channel_tropism: '脾、胃、肝', functions: '燥湿健脾，祛风散寒', usage_dosage: '3~9g', cautions: '阴虚内热、气虚多汗者忌用。' },
  { id: 35, name: '厚朴', pinyin: 'Hou Po', taste: '苦、辛', nature: '温', channel_tropism: '脾、胃、肺、大肠', functions: '燥湿消痰，下气除满', usage_dosage: '3~10g', cautions: '气虚津亏者慎用。' },
  { id: 36, name: '泽泻', pinyin: 'Ze Xie', taste: '甘', nature: '寒', channel_tropism: '肾、膀胱', functions: '利水渗湿，泄热', usage_dosage: '6~10g', cautions: '肾虚精滑者慎用。' },
  { id: 37, name: '薏苡仁', pinyin: 'Yi Yi Ren', taste: '甘、淡', nature: '凉', channel_tropism: '脾、胃、肺', functions: '利水渗湿，健脾止泻，除痹，排脓', usage_dosage: '9~30g', cautions: '孕妇慎用。' },
  // ===== 新增：温里药 =====
  { id: 38, name: '附子', pinyin: 'Fu Zi', taste: '辛、甘', nature: '大热；有毒', channel_tropism: '心、肾、脾', functions: '回阳救逆，补火助阳，散寒止痛', usage_dosage: '3~15g（先煎30~60分钟）', cautions: '孕妇禁用。不宜与半夏、瓜蒌、贝母、白蔹、白及同用。' },
  { id: 39, name: '肉桂', pinyin: 'Rou Gui', taste: '辛、甘', nature: '大热', channel_tropism: '肾、脾、心、肝', functions: '补火助阳，引火归元，散寒止痛，温通经脉', usage_dosage: '1~5g（后下）', cautions: '阴虚火旺者忌用。孕妇慎用。' },
  { id: 40, name: '干姜', pinyin: 'Gan Jiang', taste: '辛', nature: '热', channel_tropism: '脾、胃、肾、心、肺', functions: '温中散寒，回阳通脉，温肺化饮', usage_dosage: '3~10g', cautions: '阴虚内热、血热妄行者忌用。' },
  { id: 41, name: '吴茱萸', pinyin: 'Wu Zhu Yu', taste: '辛、苦', nature: '热；有小毒', channel_tropism: '肝、脾、胃、肾', functions: '散寒止痛，降逆止呕，助阳止泻', usage_dosage: '2~5g', cautions: '阴虚有热者忌用。' },
  // ===== 新增：理气药 =====
  { id: 42, name: '枳实', pinyin: 'Zhi Shi', taste: '苦、辛、酸', nature: '微寒', channel_tropism: '脾、胃', functions: '破气消积，化痰散痞', usage_dosage: '3~10g', cautions: '脾胃虚弱者及孕妇慎用。' },
  { id: 43, name: '木香', pinyin: 'Mu Xiang', taste: '辛、苦', nature: '温', channel_tropism: '脾、胃、大肠、三焦、胆', functions: '行气止痛，健脾消食', usage_dosage: '3~6g', cautions: '阴虚津亏者慎用。' },
  { id: 44, name: '香附', pinyin: 'Xiang Fu', taste: '辛、微苦、微甘', nature: '平', channel_tropism: '肝、脾、三焦', functions: '疏肝解郁，理气宽中，调经止痛', usage_dosage: '6~10g', cautions: '阴虚血热者不宜。' },
  // ===== 新增：活血化瘀药 =====
  { id: 45, name: '桃仁', pinyin: 'Tao Ren', taste: '苦、甘', nature: '平', channel_tropism: '心、肝、大肠', functions: '活血祛瘀，润肠通便，止咳平喘', usage_dosage: '5~10g', cautions: '孕妇忌用。便溏者慎用。' },
  { id: 46, name: '红花', pinyin: 'Hong Hua', taste: '辛', nature: '温', channel_tropism: '心、肝', functions: '活血通经，散瘀止痛', usage_dosage: '3~10g', cautions: '孕妇忌用。月经过多者慎用。' },
  { id: 47, name: '丹参', pinyin: 'Dan Shen', taste: '苦', nature: '微寒', channel_tropism: '心、心包、肝', functions: '活血祛瘀，通经止痛，清心除烦，凉血消痈', usage_dosage: '10~15g', cautions: '月经过多无瘀者及孕妇慎用。反藜芦。' },
  { id: 48, name: '牛膝', pinyin: 'Niu Xi', taste: '苦、甘、酸', nature: '平', channel_tropism: '肝、肾', functions: '活血通经，补肝肾，强筋骨，利尿通淋，引血下行', usage_dosage: '6~15g', cautions: '孕妇及月经过多者忌用。' },
  // ===== 新增：化痰止咳药 =====
  { id: 49, name: '瓜蒌', pinyin: 'Gua Lou', taste: '甘、微苦', nature: '寒', channel_tropism: '肺、胃、大肠', functions: '清热涤痰，宽胸散结，润燥滑肠', usage_dosage: '全瓜蒌10~20g', cautions: '脾虚便溏者不宜。不宜与乌头类药物同用。' },
  { id: 50, name: '桔梗', pinyin: 'Jie Geng', taste: '苦、辛', nature: '平', channel_tropism: '肺', functions: '宣肺祛痰，利咽排脓', usage_dosage: '3~10g', cautions: '气机上逆、呕吐、眩晕者不宜。' },
  // ===== 新增：安神药 =====
  { id: 51, name: '酸枣仁', pinyin: 'Suan Zao Ren', taste: '甘、酸', nature: '平', channel_tropism: '肝、胆、心', functions: '养心补肝，宁心安神，敛汗生津', usage_dosage: '10~15g', cautions: '有实邪郁火者忌用。' },
  { id: 52, name: '远志', pinyin: 'Yuan Zhi', taste: '苦、辛', nature: '温', channel_tropism: '心、肾、肺', functions: '安神益智，交通心肾，祛痰开窍，消散痈肿', usage_dosage: '3~10g', cautions: '胃炎及胃溃疡者慎用。' },
  // ===== 新增：收涩药 =====
  { id: 53, name: '五味子', pinyin: 'Wu Wei Zi', taste: '酸、甘', nature: '温', channel_tropism: '肺、心、肾', functions: '收敛固涩，益气生津，补肾宁心', usage_dosage: '2~6g', cautions: '外有表邪、内有实热者不宜。' },
  { id: 54, name: '山茱萸', pinyin: 'Shan Zhu Yu', taste: '酸、涩', nature: '微温', channel_tropism: '肝、肾', functions: '补益肝肾，收涩固脱', usage_dosage: '6~12g', cautions: '素有湿热者不宜。' },
  { id: 55, name: '牡蛎', pinyin: 'Mu Li', taste: '咸', nature: '微寒', channel_tropism: '肝、胆、肾', functions: '重镇安神，潜阳补阴，软坚散结，收敛固涩', usage_dosage: '9~30g（先煎）', cautions: '无特殊禁忌。' },
  // ===== 新增：平肝息风 =====
  { id: 56, name: '天麻', pinyin: 'Tian Ma', taste: '甘', nature: '平', channel_tropism: '肝', functions: '息风止痉，平抑肝阳，祛风通络', usage_dosage: '3~10g', cautions: '无特殊禁忌。' },
  { id: 57, name: '钩藤', pinyin: 'Gou Teng', taste: '甘', nature: '凉', channel_tropism: '肝、心包', functions: '息风定惊，清热平肝', usage_dosage: '3~12g（后下）', cautions: '无特殊禁忌。' },
  // ===== 新增：消食药 =====
  { id: 58, name: '山楂', pinyin: 'Shan Zha', taste: '酸、甘', nature: '微温', channel_tropism: '脾、胃、肝', functions: '消食健胃，行气散瘀，化浊降脂', usage_dosage: '10~15g', cautions: '脾胃虚弱者慎用。孕妇慎用。' },
  { id: 59, name: '麦芽', pinyin: 'Mai Ya', taste: '甘', nature: '平', channel_tropism: '脾、胃、肝', functions: '行气消食，健脾开胃，回乳消胀', usage_dosage: '10~15g', cautions: '哺乳期妇女不宜大量使用。' },
  // ===== 新增：驱虫药 =====
  { id: 60, name: '使君子', pinyin: 'Shi Jun Zi', taste: '甘', nature: '温', channel_tropism: '脾、胃', functions: '杀虫消积', usage_dosage: '9~12g（捣碎入煎）', cautions: '不宜与热茶同服。大量服用可致呃逆。' },
];

// 合并核心中药 + 扩展中药 = 100味
export const herbs: Herb[] = [...coreHerbs, ...extendedHerbs];

// ============================================================
// 方剂数据（32首，含经典名方完整组成 + 方歌）
// ============================================================
export const formulas: Formula[] = [
  // ===== 补益剂 =====
  {
    id: 1, name: '四君子汤', pinyin: 'Si Jun Zi Tang', source: '《太平惠民和剂局方》',
    functions: '益气健脾', indications: '脾胃气虚证。面色萎白，语声低微，气短乏力，食少便溏，舌淡苔白，脉虚缓。',
    usage_dosage: '水煎服', mnemonic: '四君子汤中和义，参术茯苓甘草比，益气健脾基础剂，脾胃气虚治相宜',
    cautions: '实证、热证不宜使用。',
    composition: [
      { herb_id: 1, herb_name: '人参', role: '君', dosage: '12g' },
      { herb_id: 3, herb_name: '白术', role: '臣', dosage: '9g' },
      { herb_id: 9, herb_name: '茯苓', role: '佐', dosage: '9g' },
      { herb_id: 4, herb_name: '甘草', role: '使', dosage: '6g' },
    ],
  },
  {
    id: 2, name: '四物汤', pinyin: 'Si Wu Tang', source: '《仙授理伤续断秘方》',
    functions: '补血调血', indications: '营血虚滞证。头晕目眩，心悸失眠，面色无华，妇人月经不调，脐腹作痛。',
    usage_dosage: '水煎服', mnemonic: '四物地芍与归芎，血家百病此方宗，妇女经病凭加减，临证之时在变通',
    cautions: '阴虚发热及血崩气脱之证不宜。',
    composition: [
      { herb_id: 8, herb_name: '熟地黄', role: '君', dosage: '12g' },
      { herb_id: 5, herb_name: '当归', role: '臣', dosage: '9g' },
      { herb_id: 7, herb_name: '白芍', role: '佐', dosage: '9g' },
      { herb_id: 6, herb_name: '川芎', role: '使', dosage: '6g' },
    ],
  },
  {
    id: 3, name: '六味地黄丸', pinyin: 'Liu Wei Di Huang Wan', source: '《小儿药证直诀》',
    functions: '滋阴补肾', indications: '肾阴虚证。腰膝酸软，头晕目眩，耳鸣耳聋，盗汗，骨蒸潮热，手足心热，口燥咽干。',
    usage_dosage: '蜜丸，每服9g', mnemonic: '六味地黄益肾肝，茱薯丹泽地苓专，阴虚火旺加知柏，养肝明目杞菊煎',
    cautions: '脾虚泄泻者慎用。',
    composition: [
      { herb_id: 8, herb_name: '熟地黄', role: '君', dosage: '24g' },
      { herb_id: 54, herb_name: '山茱萸', role: '臣', dosage: '12g' },
      { herb_id: 31, herb_name: '牡丹皮', role: '佐', dosage: '9g' },
      { herb_id: 36, herb_name: '泽泻', role: '佐', dosage: '9g' },
      { herb_id: 9, herb_name: '茯苓', role: '佐', dosage: '9g' },
    ],
  },
  // ===== 和解剂 =====
  {
    id: 4, name: '小柴胡汤', pinyin: 'Xiao Chai Hu Tang', source: '《伤寒论》',
    functions: '和解少阳', indications: '伤寒少阳证。往来寒热，胸胁苦满，默默不欲饮食，心烦喜呕，口苦咽干目眩。',
    usage_dosage: '水煎服', mnemonic: '小柴胡汤和解供，半夏人参甘草从，更用黄芩加姜枣，少阳百病此为宗',
    cautions: '肝火偏盛、阴虚血热者忌用。',
    composition: [
      { herb_id: 14, herb_name: '柴胡', role: '君', dosage: '24g' },
      { herb_id: 25, herb_name: '黄芩', role: '臣', dosage: '9g' },
      { herb_id: 10, herb_name: '半夏', role: '佐', dosage: '9g' },
      { herb_id: 1, herb_name: '人参', role: '佐', dosage: '9g' },
      { herb_id: 4, herb_name: '甘草', role: '使', dosage: '6g' },
    ],
  },
  // ===== 解表剂 =====
  {
    id: 5, name: '桂枝汤', pinyin: 'Gui Zhi Tang', source: '《伤寒论》',
    functions: '解肌发表，调和营卫', indications: '外感风寒表虚证。恶风发热，汗出头痛，鼻鸣干呕，苔白不渴。',
    usage_dosage: '水煎服，服后啜热稀粥', mnemonic: '桂枝汤治太阳风，芍药甘草姜枣同，解肌发表调营卫，表虚有汗此为功',
    cautions: '外感风热者忌用。服药后忌生冷油腻。',
    composition: [
      { herb_id: 12, herb_name: '桂枝', role: '君', dosage: '9g' },
      { herb_id: 7, herb_name: '白芍', role: '臣', dosage: '9g' },
      { herb_id: 24, herb_name: '生姜', role: '佐', dosage: '9g' },
      { herb_id: 4, herb_name: '甘草', role: '使', dosage: '6g' },
    ],
  },
  {
    id: 8, name: '麻黄汤', pinyin: 'Ma Huang Tang', source: '《伤寒论》',
    functions: '发汗解表，宣肺平喘', indications: '外感风寒表实证。恶寒发热，头身疼痛，无汗而喘，舌苔薄白，脉浮紧。',
    usage_dosage: '水煎服，温覆取微汗', mnemonic: '麻黄汤中用桂枝，杏仁甘草四般施，发热恶寒头项痛，伤寒服此汗淋漓',
    cautions: '体虚外感者忌用。汗出即停服。',
    composition: [
      { herb_id: 13, herb_name: '麻黄', role: '君', dosage: '9g' },
      { herb_id: 12, herb_name: '桂枝', role: '臣', dosage: '6g' },
      { herb_id: 4, herb_name: '甘草', role: '使', dosage: '3g' },
    ],
  },
  {
    id: 9, name: '银翘散', pinyin: 'Yin Qiao San', source: '《温病条辨》',
    functions: '辛凉透表，清热解毒', indications: '温病初起。发热，微恶风寒，口渴，咽痛，舌尖红苔薄白或薄黄，脉浮数。',
    usage_dosage: '水煎服（鲜芦根汤煎）', mnemonic: '银翘散主上焦疴，竹叶荆蒡豉薄荷，甘桔芦根凉解法，清疏风热煮无过',
    cautions: '外感风寒者忌用。',
    composition: [
      { herb_id: 16, herb_name: '金银花', role: '君', dosage: '15g' },
      { herb_id: 17, herb_name: '连翘', role: '君', dosage: '15g' },
      { herb_id: 19, herb_name: '荆芥穗', role: '臣', dosage: '6g' },
      { herb_id: 21, herb_name: '薄荷', role: '佐', dosage: '6g' },
      { herb_id: 50, herb_name: '桔梗', role: '佐', dosage: '6g' },
      { herb_id: 4, herb_name: '甘草', role: '使', dosage: '5g' },
    ],
  },
  {
    id: 10, name: '普济消毒饮', pinyin: 'Pu Ji Xiao Du Yin', source: '《东垣试效方》',
    functions: '清热解毒，疏散风热', indications: '大头瘟。恶寒发热，头面红肿，目不能开，咽喉不利，舌燥口干。',
    usage_dosage: '水煎服', mnemonic: '普济消毒蒡芩连，甘桔蓝根勃翘玄，升柴陈薄僵蚕入，大头瘟毒此方先',
    cautions: '阴虚者慎用。',
    composition: [
      { herb_id: 25, herb_name: '黄芩', role: '君', dosage: '15g' },
      { herb_id: 15, herb_name: '黄连', role: '君', dosage: '15g' },
      { herb_id: 4, herb_name: '甘草', role: '臣', dosage: '6g' },
      { herb_id: 30, herb_name: '玄参', role: '臣', dosage: '6g' },
      { herb_id: 18, herb_name: '板蓝根', role: '佐', dosage: '9g' },
      { herb_id: 50, herb_name: '桔梗', role: '佐', dosage: '6g' },
    ],
  },
  // ===== 祛湿化痰剂 =====
  {
    id: 6, name: '二陈汤', pinyin: 'Er Chen Tang', source: '《太平惠民和剂局方》',
    functions: '燥湿化痰，理气和中', indications: '湿痰证。咳嗽痰多，色白易咯，恶心呕吐，胸膈痞闷，肢体困重。',
    usage_dosage: '水煎服', mnemonic: '二陈汤用半夏陈，益以茯苓甘草成，理气和中兼燥湿，一切痰饮此方珍',
    cautions: '阴虚燥痰者忌用。',
    composition: [
      { herb_id: 10, herb_name: '半夏', role: '君', dosage: '15g' },
      { herb_id: 11, herb_name: '陈皮', role: '臣', dosage: '15g' },
      { herb_id: 9, herb_name: '茯苓', role: '佐', dosage: '9g' },
      { herb_id: 4, herb_name: '甘草', role: '使', dosage: '5g' },
    ],
  },
  // ===== 补中升阳 =====
  {
    id: 7, name: '补中益气汤', pinyin: 'Bu Zhong Yi Qi Tang', source: '《脾胃论》',
    functions: '补中益气，升阳举陷', indications: '脾胃气虚证。饮食减少，体倦肢软，少气懒言，面色萎白，大便稀薄。',
    usage_dosage: '水煎服', mnemonic: '补中益气芪术陈，升柴参草当归身，劳倦内伤功独擅，亦治阳虚外感因',
    cautions: '阴虚发热及内热炽盛者忌用。',
    composition: [
      { herb_id: 2, herb_name: '黄芪', role: '君', dosage: '18g' },
      { herb_id: 1, herb_name: '人参', role: '臣', dosage: '6g' },
      { herb_id: 3, herb_name: '白术', role: '臣', dosage: '10g' },
      { herb_id: 5, herb_name: '当归', role: '佐', dosage: '10g' },
      { herb_id: 14, herb_name: '柴胡', role: '佐', dosage: '6g' },
      { herb_id: 11, herb_name: '陈皮', role: '佐', dosage: '6g' },
      { herb_id: 4, herb_name: '甘草', role: '使', dosage: '6g' },
    ],
  },
  // ===== 新增：解表剂 =====
  {
    id: 11, name: '小青龙汤', pinyin: 'Xiao Qing Long Tang', source: '《伤寒论》',
    functions: '解表散寒，温肺化饮', indications: '外寒内饮证。恶寒发热，无汗，喘咳，痰多而稀，不得平卧，身体疼重，头面四肢浮肿。',
    usage_dosage: '水煎服', mnemonic: '小青龙汤治水气，喘咳呕哕渴利慰，姜桂麻黄芍药甘，细辛半夏兼五味',
    cautions: '阴虚干咳无痰者忌用。',
    composition: [
      { herb_id: 13, herb_name: '麻黄', role: '君', dosage: '9g' },
      { herb_id: 12, herb_name: '桂枝', role: '臣', dosage: '9g' },
      { herb_id: 7, herb_name: '白芍', role: '佐', dosage: '9g' },
      { herb_id: 10, herb_name: '半夏', role: '佐', dosage: '9g' },
      { herb_id: 53, herb_name: '五味子', role: '佐', dosage: '6g' },
      { herb_id: 4, herb_name: '甘草', role: '使', dosage: '6g' },
    ],
  },
  {
    id: 12, name: '止嗽散', pinyin: 'Zhi Sou San', source: '《医学心悟》',
    functions: '宣肺疏风，止咳化痰', indications: '风邪犯肺证。咳嗽咽痒，咯痰不爽，或微有恶风发热，舌苔薄白。',
    usage_dosage: '水煎服', mnemonic: '止嗽散中用白前，陈皮桔梗草荆添，紫菀百部同蒸用，感冒咳嗽此方先',
    cautions: '阴虚劳嗽者不宜。',
    composition: [
      { herb_id: 50, herb_name: '桔梗', role: '君', dosage: '10g' },
      { herb_id: 19, herb_name: '荆芥', role: '臣', dosage: '10g' },
      { herb_id: 11, herb_name: '陈皮', role: '佐', dosage: '6g' },
      { herb_id: 4, herb_name: '甘草', role: '使', dosage: '4g' },
    ],
  },
  {
    id: 13, name: '桑菊饮', pinyin: 'Sang Ju Yin', source: '《温病条辨》',
    functions: '疏风清热，宣肺止咳', indications: '风温初起，表热轻证。咳嗽，身热不甚，口微渴，脉浮数。',
    usage_dosage: '水煎服', mnemonic: '桑菊饮中桔梗翘，杏仁甘草薄荷饶，芦根为引轻清剂，风温咳嗽服之消',
    cautions: '风寒咳嗽者不宜。',
    composition: [
      { herb_id: 23, herb_name: '桑叶', role: '君', dosage: '7.5g' },
      { herb_id: 22, herb_name: '菊花', role: '臣', dosage: '3g' },
      { herb_id: 50, herb_name: '桔梗', role: '佐', dosage: '6g' },
      { herb_id: 21, herb_name: '薄荷', role: '佐', dosage: '3g' },
      { herb_id: 4, herb_name: '甘草', role: '使', dosage: '3g' },
    ],
  },
  // ===== 新增：清热剂 =====
  {
    id: 14, name: '白虎汤', pinyin: 'Bai Hu Tang', source: '《伤寒论》',
    functions: '清热生津', indications: '气分热盛证。壮热面赤，烦渴引饮，汗出恶热，脉洪大有力。',
    usage_dosage: '水煎服', mnemonic: '白虎膏知甘草粳，气分大热此方清，热渴汗出脉洪大，加入人参气津生',
    cautions: '表证未解之无汗发热、脉浮细或沉者不可用。血虚发热者忌用。',
    composition: [
      { herb_id: 26, herb_name: '石膏', role: '君', dosage: '50g' },
      { herb_id: 27, herb_name: '知母', role: '臣', dosage: '18g' },
      { herb_id: 4, herb_name: '甘草', role: '佐', dosage: '6g' },
    ],
  },
  {
    id: 15, name: '黄连解毒汤', pinyin: 'Huang Lian Jie Du Tang', source: '《外台秘要》',
    functions: '泻火解毒', indications: '三焦火毒热盛证。大热烦躁，口燥咽干，错语不眠，或热病吐血衄血，或热甚发斑，身热下痢，湿热黄疸。',
    usage_dosage: '水煎服', mnemonic: '黄连解毒汤四味，黄芩黄柏栀子备，躁狂大热呕不眠，吐衄斑黄均可使',
    cautions: '苦寒之剂，久服易伤脾胃。',
    composition: [
      { herb_id: 15, herb_name: '黄连', role: '君', dosage: '9g' },
      { herb_id: 25, herb_name: '黄芩', role: '臣', dosage: '6g' },
      { herb_id: 28, herb_name: '栀子', role: '佐', dosage: '9g' },
    ],
  },
  {
    id: 16, name: '犀角地黄汤', pinyin: 'Xi Jiao Di Huang Tang', source: '《备急千金要方》',
    functions: '清热解毒，凉血散瘀', indications: '热入血分证。身热谵语，发斑，斑色紫黑，吐血衄血，便血尿血，舌绛起刺。',
    usage_dosage: '水煎服（现用水牛角代替犀角）', mnemonic: '犀角地黄芍药丹，血升胃热火邪干，斑黄阳毒皆堪治，或益柴芩总伐肝',
    cautions: '阳虚失血及脾胃虚弱者不宜。',
    composition: [
      { herb_id: 29, herb_name: '生地黄', role: '君', dosage: '30g' },
      { herb_id: 31, herb_name: '牡丹皮', role: '臣', dosage: '9g' },
      { herb_id: 7, herb_name: '白芍', role: '佐', dosage: '12g' },
    ],
  },
  {
    id: 17, name: '五味消毒饮', pinyin: 'Wu Wei Xiao Du Yin', source: '《医宗金鉴》',
    functions: '清热解毒，消散疔疮', indications: '疔疮初起。发热恶寒，疮形如粟，坚硬根深，状如铁钉，以及痈疡疖肿，红肿热痛。',
    usage_dosage: '水煎服', mnemonic: '五味消毒疗诸疔，银花野菊蒲公英，紫花地丁天葵子，煎加酒服发汗灵',
    cautions: '脾胃虚寒者慎用。',
    composition: [
      { herb_id: 16, herb_name: '金银花', role: '君', dosage: '20g' },
      { herb_id: 17, herb_name: '连翘', role: '臣', dosage: '15g' },
      { herb_id: 18, herb_name: '板蓝根', role: '佐', dosage: '15g' },
    ],
  },
  // ===== 新增：补益剂 =====
  {
    id: 18, name: '归脾汤', pinyin: 'Gui Pi Tang', source: '《济生方》',
    functions: '益气补血，健脾养心', indications: '心脾气血两虚证。心悸怔忡，健忘失眠，体倦食少，面色萎黄，以及脾不统血之便血、崩漏。',
    usage_dosage: '水煎服', mnemonic: '归脾汤用术参芪，归草茯神远志随，酸枣木香龙眼肉，煎加姜枣益心脾',
    cautions: '实热证者忌用。',
    composition: [
      { herb_id: 1, herb_name: '人参', role: '君', dosage: '6g' },
      { herb_id: 2, herb_name: '黄芪', role: '君', dosage: '12g' },
      { herb_id: 3, herb_name: '白术', role: '臣', dosage: '9g' },
      { herb_id: 5, herb_name: '当归', role: '臣', dosage: '9g' },
      { herb_id: 51, herb_name: '酸枣仁', role: '佐', dosage: '12g' },
      { herb_id: 9, herb_name: '茯苓', role: '佐', dosage: '9g' },
      { herb_id: 52, herb_name: '远志', role: '佐', dosage: '6g' },
      { herb_id: 4, herb_name: '甘草', role: '使', dosage: '3g' },
    ],
  },
  {
    id: 19, name: '参苓白术散', pinyin: 'Shen Ling Bai Zhu San', source: '《太平惠民和剂局方》',
    functions: '益气健脾，渗湿止泻', indications: '脾虚湿盛证。饮食不化，胸脘痞闷，肠鸣泄泻，四肢乏力，形体消瘦，面色萎黄。',
    usage_dosage: '水煎服或散剂', mnemonic: '参苓白术扁豆陈，山药甘莲砂薏仁，桔梗上浮兼保肺，枣汤调服益脾神',
    cautions: '湿热泄泻者不宜。',
    composition: [
      { herb_id: 1, herb_name: '人参', role: '君', dosage: '10g' },
      { herb_id: 3, herb_name: '白术', role: '君', dosage: '10g' },
      { herb_id: 9, herb_name: '茯苓', role: '臣', dosage: '10g' },
      { herb_id: 37, herb_name: '薏苡仁', role: '佐', dosage: '15g' },
      { herb_id: 4, herb_name: '甘草', role: '使', dosage: '10g' },
    ],
  },
  {
    id: 20, name: '当归补血汤', pinyin: 'Dang Gui Bu Xue Tang', source: '《内外伤辨惑论》',
    functions: '补气生血', indications: '血虚发热证。肌热面红，烦渴欲饮，脉洪大而虚，重按无力。亦治妇人经期、产后血虚发热。',
    usage_dosage: '水煎服', mnemonic: '当归补血东垣笺，黄芪一两归二钱，血虚发热口烦渴，脉大而虚宜此煎',
    cautions: '阴虚潮热者忌用。',
    composition: [
      { herb_id: 2, herb_name: '黄芪', role: '君', dosage: '30g' },
      { herb_id: 5, herb_name: '当归', role: '臣', dosage: '6g' },
    ],
  },
  {
    id: 21, name: '右归丸', pinyin: 'You Gui Wan', source: '《景岳全书》',
    functions: '温补肾阳，填精益髓', indications: '肾阳不足，命门火衰证。年老或久病气衰神疲，畏寒肢冷，腰膝软弱，阳痿遗精，或阳衰无子。',
    usage_dosage: '蜜丸', mnemonic: '右归丸中地附桂，山药茱萸菟丝归，杜仲鹿胶枸杞子，益火之源此方魁',
    cautions: '阴虚火旺者忌用。',
    composition: [
      { herb_id: 38, herb_name: '附子', role: '君', dosage: '6g' },
      { herb_id: 39, herb_name: '肉桂', role: '君', dosage: '6g' },
      { herb_id: 8, herb_name: '熟地黄', role: '臣', dosage: '24g' },
      { herb_id: 54, herb_name: '山茱萸', role: '佐', dosage: '9g' },
    ],
  },
  {
    id: 22, name: '生脉散', pinyin: 'Sheng Mai San', source: '《医学启源》',
    functions: '益气生津，敛阴止汗', indications: '气阴两伤证。汗多神疲，体倦乏力，气短懒言，咽干口渴，舌干红少苔，脉虚数。',
    usage_dosage: '水煎服', mnemonic: '生脉麦冬五味参，保肺清心治暑淫，气少汗多兼口渴，病危脉绝急煎斟',
    cautions: '外邪未解或暑病热盛者不宜。',
    composition: [
      { herb_id: 1, herb_name: '人参', role: '君', dosage: '9g' },
      { herb_id: 53, herb_name: '五味子', role: '臣', dosage: '6g' },
    ],
  },
  // ===== 新增：和解/疏肝 =====
  {
    id: 23, name: '逍遥散', pinyin: 'Xiao Yao San', source: '《太平惠民和剂局方》',
    functions: '疏肝解郁，养血健脾', indications: '肝郁血虚脾弱证。两胁作痛，头痛目眩，口燥咽干，神疲食少，或往来寒热，或月经不调，乳房胀痛。',
    usage_dosage: '水煎服', mnemonic: '逍遥散用归芍柴，苓术甘草姜薄偕，疏肝养血兼理脾，丹栀加入热能排',
    cautions: '肝郁化火者宜加丹皮、栀子。',
    composition: [
      { herb_id: 14, herb_name: '柴胡', role: '君', dosage: '10g' },
      { herb_id: 5, herb_name: '当归', role: '臣', dosage: '10g' },
      { herb_id: 7, herb_name: '白芍', role: '臣', dosage: '10g' },
      { herb_id: 3, herb_name: '白术', role: '佐', dosage: '10g' },
      { herb_id: 9, herb_name: '茯苓', role: '佐', dosage: '10g' },
      { herb_id: 4, herb_name: '甘草', role: '使', dosage: '5g' },
    ],
  },
  {
    id: 24, name: '大柴胡汤', pinyin: 'Da Chai Hu Tang', source: '《伤寒论》',
    functions: '和解少阳，内泻热结', indications: '少阳阳明合证。往来寒热，胸胁苦满，呕不止，郁郁微烦，心下痞硬，或心下满痛，大便不解。',
    usage_dosage: '水煎服', mnemonic: '大柴胡汤用大黄，枳实芩夏白芍将，煎加姜枣表兼里，妙法内攻并外攘',
    cautions: '里无实热积滞者忌用。',
    composition: [
      { herb_id: 14, herb_name: '柴胡', role: '君', dosage: '15g' },
      { herb_id: 25, herb_name: '黄芩', role: '臣', dosage: '9g' },
      { herb_id: 42, herb_name: '枳实', role: '佐', dosage: '9g' },
      { herb_id: 10, herb_name: '半夏', role: '佐', dosage: '9g' },
      { herb_id: 7, herb_name: '白芍', role: '佐', dosage: '9g' },
      { herb_id: 4, herb_name: '甘草', role: '使', dosage: '6g' },
    ],
  },
  // ===== 新增：理血剂 =====
  {
    id: 25, name: '血府逐瘀汤', pinyin: 'Xue Fu Zhu Yu Tang', source: '《医林改错》',
    functions: '活血化瘀，行气止痛', indications: '胸中血瘀证。胸痛，头痛日久不愈，痛如针刺而有定处，或呃逆日久不止，或内热烦闷，心悸失眠，急躁易怒。',
    usage_dosage: '水煎服', mnemonic: '血府当归生地桃，红花甘草壳赤芍，柴胡芎桔牛膝等，血化下行不作劳',
    cautions: '孕妇忌用。',
    composition: [
      { herb_id: 5, herb_name: '当归', role: '君', dosage: '9g' },
      { herb_id: 29, herb_name: '生地黄', role: '臣', dosage: '9g' },
      { herb_id: 45, herb_name: '桃仁', role: '臣', dosage: '12g' },
      { herb_id: 46, herb_name: '红花', role: '臣', dosage: '9g' },
      { herb_id: 14, herb_name: '柴胡', role: '佐', dosage: '3g' },
      { herb_id: 6, herb_name: '川芎', role: '佐', dosage: '5g' },
      { herb_id: 48, herb_name: '牛膝', role: '佐', dosage: '9g' },
      { herb_id: 4, herb_name: '甘草', role: '使', dosage: '3g' },
    ],
  },
  {
    id: 26, name: '补阳还五汤', pinyin: 'Bu Yang Huan Wu Tang', source: '《医林改错》',
    functions: '补气活血通络', indications: '气虚血瘀之中风。半身不遂，口眼歪斜，语言謇涩，口角流涎，小便频数或遗尿不禁。',
    usage_dosage: '水煎服', mnemonic: '补阳还五赤芍芎，归尾通经佐地龙，四两黄芪为主药，血中瘀滞用桃红',
    cautions: '肝阳上亢、阴虚火旺者忌用。',
    composition: [
      { herb_id: 2, herb_name: '黄芪', role: '君', dosage: '120g' },
      { herb_id: 5, herb_name: '当归', role: '臣', dosage: '6g' },
      { herb_id: 45, herb_name: '桃仁', role: '佐', dosage: '3g' },
      { herb_id: 46, herb_name: '红花', role: '佐', dosage: '3g' },
      { herb_id: 6, herb_name: '川芎', role: '佐', dosage: '3g' },
      { herb_id: 47, herb_name: '丹参', role: '佐', dosage: '6g' },
      { herb_id: 4, herb_name: '甘草', role: '使', dosage: '3g' },
    ],
  },
  // ===== 新增：祛湿剂 =====
  {
    id: 27, name: '平胃散', pinyin: 'Ping Wei San', source: '《简要济众方》',
    functions: '燥湿运脾，行气和胃', indications: '湿滞脾胃证。脘腹胀满，不思饮食，口淡无味，呕吐恶心，嗳气吞酸，肢体沉重，怠惰嗜卧。',
    usage_dosage: '水煎服', mnemonic: '平胃散是苍术朴，陈皮甘草四般药，除湿散满驱瘴岚，调胃诸方从此扩',
    cautions: '阴虚气滞者不宜。',
    composition: [
      { herb_id: 34, herb_name: '苍术', role: '君', dosage: '12g' },
      { herb_id: 35, herb_name: '厚朴', role: '臣', dosage: '9g' },
      { herb_id: 11, herb_name: '陈皮', role: '佐', dosage: '6g' },
      { herb_id: 4, herb_name: '甘草', role: '使', dosage: '3g' },
    ],
  },
  {
    id: 28, name: '真武汤', pinyin: 'Zhen Wu Tang', source: '《伤寒论》',
    functions: '温阳利水', indications: '脾肾阳虚，水湿内停证。小便不利，四肢沉重疼痛，腹痛下利，或肢体浮肿，苔白不渴，脉沉。',
    usage_dosage: '水煎服', mnemonic: '真武汤壮肾中阳，茯苓术芍附生姜，少阴腹痛有水气，悸眩瞤惕保安康',
    cautions: '阴虚有热者忌用。',
    composition: [
      { herb_id: 38, herb_name: '附子', role: '君', dosage: '9g' },
      { herb_id: 9, herb_name: '茯苓', role: '臣', dosage: '9g' },
      { herb_id: 3, herb_name: '白术', role: '臣', dosage: '6g' },
      { herb_id: 7, herb_name: '白芍', role: '佐', dosage: '9g' },
      { herb_id: 24, herb_name: '生姜', role: '佐', dosage: '9g' },
    ],
  },
  {
    id: 29, name: '独活寄生汤', pinyin: 'Du Huo Ji Sheng Tang', source: '《备急千金要方》',
    functions: '祛风湿，止痹痛，益肝肾，补气血', indications: '痹证日久，肝肾两虚，气血不足证。腰膝疼痛，肢节屈伸不利，或麻木不仁，畏寒喜温。',
    usage_dosage: '水煎服', mnemonic: '独活寄生艽防辛，芎归地芍桂苓均，杜仲牛膝人参草，冷风顽痹屈能伸',
    cautions: '湿热痹证者不宜。',
    composition: [
      { herb_id: 20, herb_name: '独活', role: '君', dosage: '9g' },
      { herb_id: 48, herb_name: '牛膝', role: '臣', dosage: '6g' },
      { herb_id: 8, herb_name: '熟地黄', role: '佐', dosage: '6g' },
      { herb_id: 5, herb_name: '当归', role: '佐', dosage: '6g' },
      { herb_id: 1, herb_name: '人参', role: '佐', dosage: '6g' },
      { herb_id: 4, herb_name: '甘草', role: '使', dosage: '6g' },
    ],
  },
  // ===== 新增：治燥剂 =====
  {
    id: 30, name: '麦门冬汤', pinyin: 'Mai Men Dong Tang', source: '《金匮要略》',
    functions: '滋养肺胃，降逆下气', indications: '肺胃阴虚气逆证。咳唾涎沫，短气喘促，咽喉干燥，舌干红少苔，脉虚数。',
    usage_dosage: '水煎服', mnemonic: '麦门冬汤用人参，枣甘粳米半夏存，肺痿咳逆因虚火，益胃生津此方珍',
    cautions: '肺胃有实热者不宜。',
    composition: [
      { herb_id: 1, herb_name: '人参', role: '臣', dosage: '6g' },
      { herb_id: 10, herb_name: '半夏', role: '佐', dosage: '6g' },
      { herb_id: 4, herb_name: '甘草', role: '使', dosage: '6g' },
    ],
  },
  // ===== 新增：温里剂 =====
  {
    id: 31, name: '黄芪建中汤', pinyin: 'Huang Qi Jian Zhong Tang', source: '《金匮要略》',
    functions: '温中补气，和里缓急', indications: '虚劳里急。腹中时痛，喜温喜按，按之痛减，或心中悸动，虚烦不宁，面色无华。',
    usage_dosage: '水煎服', mnemonic: '黄芪建中芍药多，桂姜甘草大枣和，更加饴糖补中脏，虚劳腹冷服之瘥',
    cautions: '实热证者忌用。',
    composition: [
      { herb_id: 2, herb_name: '黄芪', role: '君', dosage: '15g' },
      { herb_id: 12, herb_name: '桂枝', role: '臣', dosage: '9g' },
      { herb_id: 7, herb_name: '白芍', role: '臣', dosage: '18g' },
      { herb_id: 24, herb_name: '生姜', role: '佐', dosage: '9g' },
      { herb_id: 4, herb_name: '甘草', role: '使', dosage: '6g' },
    ],
  },
  {
    id: 32, name: '理中丸', pinyin: 'Li Zhong Wan', source: '《伤寒论》',
    functions: '温中祛寒，补气健脾', indications: '脾胃虚寒证。脘腹绵绵作痛，喜温喜按，呕吐，大便稀溏，脘痞食少，畏寒肢冷，口不渴。',
    usage_dosage: '水煎服或蜜丸', mnemonic: '理中丸主理中乡，甘草人参术干姜，呕利腹痛阴寒盛，或加附子总扶阳',
    cautions: '湿热内蕴中焦者忌用。',
    composition: [
      { herb_id: 40, herb_name: '干姜', role: '君', dosage: '9g' },
      { herb_id: 1, herb_name: '人参', role: '臣', dosage: '9g' },
      { herb_id: 3, herb_name: '白术', role: '佐', dosage: '9g' },
      { herb_id: 4, herb_name: '甘草', role: '使', dosage: '9g' },
    ],
  },
];

// ============================================================
// 证候数据（25种，覆盖脏腑辨证 + 八纲辨证 + 卫气营血）
// ============================================================
export const syndromes: Syndrome[] = [
  // ===== 脏腑辨证 =====
  { id: 1, name: '脾气虚', pinyin: 'Pi Qi Xu', description: '脾失健运，以食少、腹胀、便溏及气虚症状为主要表现的证候。', category: '脏腑辨证', disease_id: 1, symptoms: '食少纳呆，腹胀食后尤甚，大便溏薄，肢体倦怠，少气懒言', tongue_pulse: '舌淡苔白，脉缓弱', treatment_method: '健脾益气', formula_ids: [1] },
  { id: 2, name: '肝气郁结', pinyin: 'Gan Qi Yu Jie', description: '肝失疏泄，气机郁滞，以情志抑郁、胸胁胀痛为主要表现。', category: '脏腑辨证', disease_id: 8, symptoms: '情志抑郁，胸胁或少腹胀痛，善太息，或咽中如有异物', tongue_pulse: '舌苔薄白，脉弦', treatment_method: '疏肝理气解郁', formula_ids: [4, 23] },
  { id: 3, name: '肾阴虚', pinyin: 'Shen Yin Xu', description: '肾阴亏损，失于滋养，虚热内生。', category: '脏腑辨证', disease_id: 3, symptoms: '腰膝酸软，头晕耳鸣，五心烦热，潮热盗汗，口燥咽干', tongue_pulse: '舌红少苔，脉细数', treatment_method: '滋阴补肾', formula_ids: [3] },
  { id: 4, name: '心血虚', pinyin: 'Xin Xue Xu', description: '心血亏虚，心失濡养。', category: '脏腑辨证', disease_id: 9, symptoms: '心悸失眠，多梦，健忘，面色萎黄或苍白', tongue_pulse: '舌淡苔白，脉细弱', treatment_method: '养血宁心', formula_ids: [2, 18] },
  { id: 5, name: '肺气虚', pinyin: 'Fei Qi Xu', description: '肺气虚弱，宣降失职。', category: '脏腑辨证', disease_id: 6, symptoms: '咳嗽无力，气短而喘，自汗畏风，声低懒言', tongue_pulse: '舌淡苔白，脉虚弱', treatment_method: '补肺益气', formula_ids: [7] },
  { id: 11, name: '痰湿蕴肺', pinyin: 'Tan Shi Yun Fei', description: '痰湿蕴肺，肺失宣降。', category: '脏腑辨证', disease_id: 6, symptoms: '咳嗽痰多，色白易咯，胸脘痞闷，食少纳呆', tongue_pulse: '舌苔白腻，脉滑', treatment_method: '燥湿化痰，理气和中', formula_ids: [6] },
  { id: 12, name: '脾虚湿困', pinyin: 'Pi Xu Shi Kun', description: '脾虚运化失健，湿邪困阻。', category: '脏腑辨证', disease_id: 1, symptoms: '脘腹胀满，纳呆，大便溏薄，肢体困重', tongue_pulse: '舌淡胖有齿痕，苔白腻，脉濡缓', treatment_method: '健脾祛湿', formula_ids: [1, 19] },
  // ===== 新增：脏腑辨证 =====
  { id: 14, name: '肝胃郁热', pinyin: 'Gan Wei Yu Re', description: '肝气郁滞，横逆犯胃，郁热内生。', category: '脏腑辨证', disease_id: 10, symptoms: '胃脘灼痛，痛势急迫，烦躁易怒，泛酸嘈杂，口干口苦', tongue_pulse: '舌红苔黄，脉弦数', treatment_method: '疏肝泄热，和胃止痛', formula_ids: [24] },
  { id: 15, name: '脾胃虚寒', pinyin: 'Pi Wei Xu Han', description: '脾胃阳气虚衰，阴寒内生。', category: '脏腑辨证', disease_id: 10, symptoms: '胃痛隐隐，喜温喜按，空腹痛甚，得食则减，泛吐清水', tongue_pulse: '舌淡苔白，脉虚弱或迟缓', treatment_method: '温中健脾，和胃止痛', formula_ids: [31, 32] },
  { id: 16, name: '肝胆湿热', pinyin: 'Gan Dan Shi Re', description: '湿热蕴结肝胆，疏泄功能失常。', category: '脏腑辨证', disease_id: 11, symptoms: '胁肋胀痛灼热，口苦纳呆，恶心呕吐，小便短赤', tongue_pulse: '舌红苔黄腻，脉弦滑数', treatment_method: '清热利湿，疏肝利胆', formula_ids: [24] },
  { id: 17, name: '心肾不交', pinyin: 'Xin Shen Bu Jiao', description: '心肾水火既济失调，以失眠、心烦为主。', category: '脏腑辨证', symptoms: '心烦失眠，心悸不安，头晕耳鸣，健忘，腰膝酸软', tongue_pulse: '舌尖红少苔，脉细数', treatment_method: '滋阴降火，交通心肾', formula_ids: [3] },
  // ===== 八纲辨证 =====
  { id: 6, name: '风寒束表', pinyin: 'Feng Han Shu Biao', description: '风寒之邪侵袭肌表，卫阳被遏。', category: '八纲辨证', disease_id: 4, symptoms: '恶寒重，发热轻，头身疼痛，无汗，鼻塞流清涕', tongue_pulse: '舌苔薄白，脉浮紧', treatment_method: '辛温解表，宣肺散寒', formula_ids: [8] },
  { id: 7, name: '风热犯表', pinyin: 'Feng Re Fan Biao', description: '风热之邪侵袭肌表，卫气被郁。', category: '八纲辨证', disease_id: 4, symptoms: '发热重，微恶风寒，头痛，口渴，咽痛', tongue_pulse: '舌尖红苔薄黄，脉浮数', treatment_method: '辛凉解表，清热解毒', formula_ids: [9, 13] },
  { id: 8, name: '湿热证', pinyin: 'Shi Re Zheng', description: '湿热蕴结于里。', category: '八纲辨证', symptoms: '身热不扬，口渴不欲饮，肢体困重，小便短黄', tongue_pulse: '舌苔黄腻，脉濡数', treatment_method: '清热利湿', formula_ids: [27] },
  { id: 9, name: '血瘀证', pinyin: 'Xue Yu Zheng', description: '瘀血内阻，以疼痛固定刺痛、舌质紫暗为主。', category: '八纲辨证', symptoms: '疼痛固定不移，拒按，刺痛，或有肿块，肌肤甲错', tongue_pulse: '舌质紫暗有瘀斑，脉涩', treatment_method: '活血化瘀', formula_ids: [25] },
  { id: 10, name: '气虚证', pinyin: 'Qi Xu Zheng', description: '元气不足，脏腑功能减退。', category: '八纲辨证', disease_id: 5, symptoms: '神疲乏力，少气懒言，自汗，活动后加重', tongue_pulse: '舌淡苔白，脉虚', treatment_method: '益气', formula_ids: [7] },
  { id: 13, name: '胃寒凝滞', pinyin: 'Wei Han Ning Zhi', description: '寒邪犯胃，胃气凝滞。', category: '八纲辨证', disease_id: 10, symptoms: '胃痛暴作，恶寒喜暖，得温痛减，口不渴或喜热饮', tongue_pulse: '舌苔白，脉弦紧', treatment_method: '温胃散寒，行气止痛', formula_ids: [32] },
  { id: 18, name: '阴虚火旺', pinyin: 'Yin Xu Huo Wang', description: '阴液亏虚，虚火亢旺。', category: '八纲辨证', disease_id: 13, symptoms: '潮热盗汗，五心烦热，颧红，口干咽燥', tongue_pulse: '舌红少津，脉细数', treatment_method: '滋阴降火', formula_ids: [3] },
  { id: 19, name: '肾阳虚', pinyin: 'Shen Yang Xu', description: '肾阳亏虚，温煦失职，气化失权。', category: '脏腑辨证', disease_id: 3, symptoms: '腰膝酸冷，畏寒肢冷，夜尿频多，阳痿早泄', tongue_pulse: '舌淡胖苔白滑，脉沉弱', treatment_method: '温补肾阳', formula_ids: [21, 28] },
  { id: 20, name: '气滞血瘀', pinyin: 'Qi Zhi Xue Yu', description: '气机郁滞导致血行瘀阻。', category: '八纲辨证', symptoms: '胸胁胀闷，走窜疼痛，性情急躁，胁下痞块刺痛', tongue_pulse: '舌紫暗或有瘀斑，脉弦涩', treatment_method: '行气活血', formula_ids: [25] },
  { id: 21, name: '气虚血瘀', pinyin: 'Qi Xu Xue Yu', description: '气虚运血无力，导致瘀血内阻。', category: '八纲辨证', disease_id: 14, symptoms: '半身不遂，肢体麻木，语言謇涩，面色萎黄', tongue_pulse: '舌淡紫或有瘀斑，脉细涩', treatment_method: '益气活血通络', formula_ids: [26] },
  { id: 22, name: '心气血两虚', pinyin: 'Xin Qi Xue Liang Xu', description: '心气虚与心血虚并见。', category: '脏腑辨证', disease_id: 9, symptoms: '心悸气短，活动后加重，神疲乏力，面色萎黄', tongue_pulse: '舌淡苔白，脉细弱或结代', treatment_method: '益气滋阴，通阳复脉', formula_ids: [18, 22] },
  { id: 23, name: '外寒内饮', pinyin: 'Wai Han Nei Yin', description: '外感风寒，内有水饮。', category: '八纲辨证', disease_id: 6, symptoms: '恶寒发热，无汗，喘咳，痰多清稀', tongue_pulse: '舌苔白滑，脉弦紧', treatment_method: '解表散寒，温肺化饮', formula_ids: [11] },
  { id: 24, name: '肾精不足', pinyin: 'Shen Jing Bu Zu', description: '肾精亏损，生长发育迟缓或早衰。', category: '脏腑辨证', symptoms: '小儿发育迟缓，成人早衰，发脱齿摇，耳鸣耳聋', tongue_pulse: '舌淡红，脉沉细', treatment_method: '补肾填精', formula_ids: [3, 21] },
  { id: 25, name: '气血亏虚', pinyin: 'Qi Xue Kui Xu', description: '气虚与血虚同时存在的证候。', category: '八纲辨证', disease_id: 15, symptoms: '头晕目眩，心悸失眠，面色苍白或萎黄，神疲乏力', tongue_pulse: '舌淡苔白，脉细弱', treatment_method: '益气养血', formula_ids: [18, 20] },
];

// ============================================================
// 疾病数据（15种，中西医对照）
// ============================================================
export const diseases: Disease[] = [
  { id: 1, name: '泄泻', western_name: '腹泻 (Diarrhea)', category: '脾胃病证', description: '以排便次数增多、粪质稀溏或完谷不化，甚至泻出如水样为主症的病证。', syndrome_ids: [1, 8, 12], common_herbs: [1, 3, 9], common_formulas: [1, 19] },
  { id: 2, name: '郁证', western_name: '抑郁症 (Depression)', category: '肝系病证', description: '由于情志不舒、气机郁滞所致，以心情抑郁、情绪不宁、胸部满闷等为主要表现。', syndrome_ids: [2], common_formulas: [23] },
  { id: 3, name: '腰痛', western_name: '腰背痛 (Low Back Pain)', category: '肾系病证', description: '因外感、内伤或挫闪等导致腰部气血运行不畅，以腰部一侧或两侧疼痛为主症。', syndrome_ids: [3, 19, 24], common_formulas: [3, 21, 29] },
  { id: 4, name: '感冒', western_name: '上呼吸道感染 (URI)', category: '肺系病证', description: '因感受风邪或时行疫毒，导致肺卫功能失调，以恶寒、发热、鼻塞、流涕为主症。', syndrome_ids: [6, 7], common_herbs: [12, 13, 16, 17], common_formulas: [5, 8, 9, 13] },
  { id: 5, name: '虚劳', western_name: '慢性疲劳综合征 (CFS)', category: '气血津液病证', description: '以脏腑亏损、气血阴阳不足为主要病机的多种慢性虚弱证候的总称。', syndrome_ids: [10, 22, 25], common_formulas: [7, 18, 20] },
  { id: 6, name: '咳嗽', western_name: '咳嗽 (Cough)', category: '肺系病证', description: '肺失宣降，肺气上逆作声，或伴咯吐痰液。', syndrome_ids: [5, 11, 23], common_formulas: [6, 11, 12] },
  { id: 7, name: '水肿', western_name: '水肿 (Edema)', category: '肾系病证', description: '因感受外邪、饮食失调或劳倦过度，使肺失宣降通调，脾失健运，肾失开合。', syndrome_ids: [12, 19], common_herbs: [2, 9], common_formulas: [1, 28] },
  // ===== 新增 =====
  { id: 8, name: '胁痛', western_name: '胁痛/胆囊炎 (Cholecystitis)', category: '肝系病证', description: '以一侧或两侧胁肋部疼痛为主要表现的病证。', syndrome_ids: [2, 16], common_formulas: [4, 23, 24] },
  { id: 9, name: '心悸', western_name: '心律失常 (Arrhythmia)', category: '心系病证', description: '以心中悸动、惊惕不安、甚则不能自主为主要表现的病证。', syndrome_ids: [4, 22, 25], common_formulas: [18, 22] },
  { id: 10, name: '胃痛', western_name: '胃炎/消化性溃疡 (Gastritis/PUD)', category: '脾胃病证', description: '以上腹胃脘部近心窝处疼痛为主症的病证。', syndrome_ids: [13, 14, 15], common_herbs: [58], common_formulas: [24, 31, 32] },
  { id: 11, name: '黄疸', western_name: '黄疸 (Jaundice)', category: '肝系病证', description: '以目黄、身黄、小便黄为主症的病证，其中目睛黄染为重要特征。', syndrome_ids: [8, 16], common_formulas: [27] },
  { id: 12, name: '哮病', western_name: '支气管哮喘 (Asthma)', category: '肺系病证', description: '以发作性喉中哮鸣有声、呼吸困难甚则喘息不得平卧为主症。', syndrome_ids: [23], common_formulas: [11] },
  { id: 13, name: '眩晕', western_name: '眩晕 (Vertigo)', category: '肝系病证', description: '以头晕眼花、视物旋转为主要表现的病证。', syndrome_ids: [3, 19, 25], common_herbs: [56], common_formulas: [3, 18, 21] },
  { id: 14, name: '中风后遗症', western_name: '脑卒中恢复期 (Stroke Sequelae)', category: '脑系病证', description: '中风后遗留半身不遂、语言不利、口眼歪斜等症状。', syndrome_ids: [21], common_herbs: [47], common_formulas: [26] },
  { id: 15, name: '血虚', western_name: '贫血 (Anemia)', category: '气血津液病证', description: '以面白无华、唇甲色淡、头晕眼花为主症。', syndrome_ids: [4, 25], common_herbs: [5, 8], common_formulas: [2, 18, 20] },
];

// ============================================================
// 经络数据（14条经络 + 穴位）
// ============================================================
export const meridians: Meridian[] = [
  { id: 1, name: '手太阴肺经', pinyin: 'Shou Tai Yin Fei Jing', organ: '肺', pathway_desc: '起于中焦，下络大肠，还循胃口，上膈属肺。从肺系横出腋下。', acupoints: [
    { name: '中府', pinyin: 'Zhong Fu', location: '胸前壁外上方，前正中线旁开6寸' },
    { name: '尺泽', pinyin: 'Chi Ze', location: '肘横纹中，肱二头肌腱桡侧凹陷处' },
    { name: '列缺', pinyin: 'Lie Que', location: '前臂桡侧缘，桡骨茎突上方' },
    { name: '太渊', pinyin: 'Tai Yuan', location: '腕掌侧横纹桡侧，桡动脉搏动处' },
    { name: '少商', pinyin: 'Shao Shang', location: '手拇指末节桡侧，距指甲角0.1寸' },
  ]},
  { id: 2, name: '手阳明大肠经', pinyin: 'Shou Yang Ming Da Chang Jing', organ: '大肠', pathway_desc: '起于大指次指之端，循指上廉，出合谷两骨之间。', acupoints: [
    { name: '商阳', pinyin: 'Shang Yang', location: '食指末节桡侧' },
    { name: '合谷', pinyin: 'He Gu', location: '手背第一、二掌骨间' },
    { name: '阳溪', pinyin: 'Yang Xi', location: '腕背横纹桡侧' },
  ]},
  { id: 3, name: '足阳明胃经', pinyin: 'Zu Yang Ming Wei Jing', organ: '胃', pathway_desc: '起于鼻，交頞中，旁约太阳之脉。', acupoints: [
    { name: '天枢', pinyin: 'Tian Shu', location: '脐中旁开2寸' },
    { name: '足三里', pinyin: 'Zu San Li', location: '犊鼻下3寸' },
  ]},
  { id: 4, name: '足太阴脾经', pinyin: 'Zu Tai Yin Pi Jing', organ: '脾', pathway_desc: '起于大指之端，循指内侧白肉际。', acupoints: [
    { name: '三阴交', pinyin: 'San Yin Jiao', location: '内踝尖上3寸' },
    { name: '阴陵泉', pinyin: 'Yin Ling Quan', location: '胫骨内侧髁下方' },
  ]},
  { id: 5, name: '手少阴心经', pinyin: 'Shou Shao Yin Xin Jing', organ: '心', pathway_desc: '起于心中，出属心系。', acupoints: [
    { name: '神门', pinyin: 'Shen Men', location: '腕掌侧横纹尺侧端' },
  ]},
  { id: 6, name: '手太阳小肠经', pinyin: 'Shou Tai Yang Xiao Chang Jing', organ: '小肠', pathway_desc: '起于小指之端。', acupoints: [
    { name: '后溪', pinyin: 'Hou Xi', location: '第5指掌关节后' },
    { name: '听宫', pinyin: 'Ting Gong', location: '耳屏前' },
  ]},
  { id: 7, name: '足太阳膀胱经', pinyin: 'Zu Tai Yang Pang Guang Jing', organ: '膀胱', pathway_desc: '起于目内眦。', acupoints: [
    { name: '肺俞', pinyin: 'Fei Shu', location: '第3胸椎棘突下旁开1.5寸' },
    { name: '肾俞', pinyin: 'Shen Shu', location: '第2腰椎棘突下旁开1.5寸' },
    { name: '委中', pinyin: 'Wei Zhong', location: '腘横纹中点' },
  ]},
  { id: 8, name: '足少阴肾经', pinyin: 'Zu Shao Shen Shen Jing', organ: '肾', pathway_desc: '起于小指之下，邪走足心。', acupoints: [
    { name: '涌泉', pinyin: 'Yong Quan', location: '足底前1/3处' },
    { name: '太溪', pinyin: 'Tai Xi', location: '内踝尖与跟腱之间' },
  ]},
  { id: 9, name: '手厥阴心包经', pinyin: 'Shou Jue Yin Xin Bao Jing', organ: '心包', pathway_desc: '起于胸中，出属心包络。', acupoints: [
    { name: '内关', pinyin: 'Nei Guan', location: '腕横纹上2寸' },
    { name: '劳宫', pinyin: 'Lao Gong', location: '掌心第2、3掌骨间' },
  ]},
  { id: 10, name: '手少阳三焦经', pinyin: 'Shou Shao Yang San Jiao Jing', organ: '三焦', pathway_desc: '起于小指次指之端。', acupoints: [
    { name: '外关', pinyin: 'Wai Guan', location: '腕背横纹上2寸' },
    { name: '翳风', pinyin: 'Yi Feng', location: '耳垂后方' },
  ]},
  { id: 11, name: '足少阳胆经', pinyin: 'Zu Shao Yang Dan Jing', organ: '胆', pathway_desc: '起于目锐眦。', acupoints: [
    { name: '风池', pinyin: 'Feng Chi', location: '胸锁乳突肌与斜方肌之间' },
    { name: '阳陵泉', pinyin: 'Yang Ling Quan', location: '腓骨头前下方' },
  ]},
  { id: 12, name: '足厥阴肝经', pinyin: 'Zu Jue Yin Gan Jing', organ: '肝', pathway_desc: '起于大指丛毛之际。', acupoints: [
    { name: '太冲', pinyin: 'Tai Chong', location: '足背侧第1、2跖骨间隙后方' },
    { name: '期门', pinyin: 'Qi Men', location: '第6肋间隙' },
  ]},
  { id: 13, name: '任脉', pinyin: 'Ren Mai', organ: '奇经', pathway_desc: '起于胞中，下出会阴，上行于腹胸正中线。', acupoints: [
    { name: '关元', pinyin: 'Guan Yuan', location: '脐下3寸' },
    { name: '气海', pinyin: 'Qi Hai', location: '脐下1.5寸' },
    { name: '中脘', pinyin: 'Zhong Wan', location: '脐上4寸' },
    { name: '膻中', pinyin: 'Dan Zhong', location: '前正中线上平第4肋' },
  ]},
  { id: 14, name: '督脉', pinyin: 'Du Mai', organ: '奇经', pathway_desc: '起于胞中，下出会阴，后行于腰背正中线。', acupoints: [
    { name: '命门', pinyin: 'Ming Men', location: '第2腰椎棘突下' },
    { name: '大椎', pinyin: 'Da Zhui', location: '第7颈椎棘突下' },
    { name: '百会', pinyin: 'Bai Hui', location: '前发际正中直上5寸' },
    { name: '人中', pinyin: 'Ren Zhong', location: '人中沟上1/3处' },
  ]},
];

// ============================================================
// Review Cards（自动生成：中药 + 方剂）
// ============================================================
export const reviewCards: ReviewCard[] = [
  // 中药复习卡（前30味）
  ...herbs.slice(0, 30).map((h, i) => ({
    id: i + 1,
    card_type: 'herb' as const,
    card_id: h.id,
    name: h.name,
    pinyin: h.pinyin,
    details: `${h.taste}，${h.nature}。归经：${h.channel_tropism}。功效：${h.functions}`,
    easiness_factor: 2.5,
    interval_days: 1,
    repetitions: 0,
    next_review_date: new Date().toISOString().split('T')[0],
  })),
  // 方剂复习卡（前20首）
  ...formulas.slice(0, 20).map((f, i) => ({
    id: 100 + i,
    card_type: 'formula' as const,
    card_id: f.id,
    name: f.name,
    pinyin: f.pinyin,
    details: `功效：${f.functions}。主治：${f.indications.slice(0, 60)}...。方歌：${f.mnemonic}`,
    easiness_factor: 2.5,
    interval_days: 1,
    repetitions: 0,
    next_review_date: new Date().toISOString().split('T')[0],
  })),
];
