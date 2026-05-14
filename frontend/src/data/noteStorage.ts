import { Note, NoteFlashcard } from '../types/note';

const STORAGE_KEY = 'tcm_scholar_notes';

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

export function loadNotes(): Note[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveNotes(notes: Note[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

export function getNote(id: string): Note | undefined {
  return loadNotes().find(n => n.id === id);
}

export function createNote(partial: Partial<Note>): Note {
  const notes = loadNotes();
  const now = new Date().toISOString();
  const note: Note = {
    id: generateId(),
    title: partial.title || '未命名笔记',
    content: partial.content || '',
    tags: partial.tags || [],
    folder: partial.folder || '',
    links: [],
    backlinks: [],
    createdAt: now,
    updatedAt: now,
    flashcards: [],
    isMOC: partial.isMOC || false,
  };
  note.links = extractLinks(note.content);
  notes.push(note);
  saveNotes(notes);
  updateBacklinks(notes);
  return note;
}

export function updateNote(id: string, updates: Partial<Note>): Note | undefined {
  const notes = loadNotes();
  const idx = notes.findIndex(n => n.id === id);
  if (idx === -1) return undefined;
  const now = new Date().toISOString();
  notes[idx] = { ...notes[idx], ...updates, updatedAt: now };
  if (updates.content !== undefined) {
    notes[idx].links = extractLinks(notes[idx].content);
  }
  saveNotes(notes);
  updateBacklinks(notes);
  return notes[idx];
}

export function deleteNote(id: string): void {
  let notes = loadNotes();
  notes = notes.filter(n => n.id !== id);
  saveNotes(notes);
  updateBacklinks(notes);
}

// Extract [[Page Name]] links from content
export function extractLinks(content: string): string[] {
  const regex = /\[\[([^\]]+)\]\]/g;
  const links: string[] = [];
  let match;
  while ((match = regex.exec(content)) !== null) {
    if (!links.includes(match[1])) {
      links.push(match[1]);
    }
  }
  return links;
}

// Update backlinks for all notes
function updateBacklinks(notes: Note[]): void {
  const backlinkMap: Record<string, string[]> = {};
  notes.forEach(n => {
    n.links.forEach(link => {
      if (!backlinkMap[link]) backlinkMap[link] = [];
      backlinkMap[link].push(n.title);
    });
  });
  notes.forEach(n => {
    n.backlinks = backlinkMap[n.title] || [];
  });
  saveNotes(notes);
}

// Extract flashcards from note content
// Syntax: ==answer== (cloze) or Q: question A: answer
export function extractFlashcards(note: Note): NoteFlashcard[] {
  const flashcards: NoteFlashcard[] = [];
  const lines = note.content.split('\n');

  lines.forEach((line, lineIdx) => {
    // Cloze: ==text==
    const clozeRegex = /==([^=]+)==/g;
    let clozeMatch;
    const clozeAnswers: string[] = [];
    const clozePositions: number[] = [];

    while ((clozeMatch = clozeRegex.exec(line)) !== null) {
      clozeAnswers.push(clozeMatch[1]);
      clozePositions.push(clozeMatch.index);
    }

    if (clozeAnswers.length > 0) {
      flashcards.push({
        id: `${note.id}-cloze-${lineIdx}`,
        noteId: note.id,
        type: 'cloze',
        question: line.replace(/==([^=]+)==/g, '___'),
        answer: line,
        clozePositions,
        clozeAnswers,
        sourceLine: `第${lineIdx + 1}行`,
        easinessFactor: 2.5,
        intervalDays: 0,
        repetitions: 0,
        nextReviewDate: new Date().toISOString().split('T')[0],
      });
    }

    // Q: xxx A: xxx
    const qaRegex = /^Q:\s*(.+?)\s*A:\s*(.+)$/;
    const qaMatch = qaRegex.exec(line.trim());
    if (qaMatch) {
      flashcards.push({
        id: `${note.id}-qa-${lineIdx}`,
        noteId: note.id,
        type: 'qa',
        question: qaMatch[1].trim(),
        answer: qaMatch[2].trim(),
        sourceLine: `第${lineIdx + 1}行`,
        easinessFactor: 2.5,
        intervalDays: 0,
        repetitions: 0,
        nextReviewDate: new Date().toISOString().split('T')[0],
      });
    }
  });

  return flashcards;
}

// Build folder tree from notes
export function buildFolderTree(notes: { folder: string }[]): { name: string; fullPath: string; children: unknown[]; noteCount: number }[] {
  const tree: Record<string, unknown> = {};

  notes.forEach(n => {
    if (!n.folder) return;
    const parts = n.folder.split('/').filter(Boolean);
    let current: Record<string, unknown> = tree;
    parts.forEach((part, i) => {
      if (!current[part]) {
        current[part] = { _count: 0, _children: {} };
      }
      if (i === parts.length - 1) {
        (current[part] as { _count: number })._count++;
      }
      current = (current[part] as { _children: Record<string, unknown> })._children;
    });
  });

  function toNodes(obj: Record<string, unknown>, prefix: string = ''): { name: string; fullPath: string; children: unknown[]; noteCount: number }[] {
    return Object.entries(obj).map(([key, val]) => {
      const v = val as { _count: number; _children: Record<string, unknown> };
      const fullPath = prefix ? `${prefix}/${key}` : key;
      return {
        name: key,
        fullPath,
        children: toNodes(v._children, fullPath),
        noteCount: v._count,
      };
    });
  }

  return toNodes(tree);
}

// Build tag tree
export function buildTagTree(notes: { tags: string[] }[]): { name: string; fullPath: string; children: unknown[]; noteCount: number }[] {
  const tagCounts: Record<string, number> = {};
  notes.forEach(n => {
    n.tags.forEach(tag => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });

  const tree: Record<string, { _count: number; _children: Record<string, unknown> }> = {};
  Object.keys(tagCounts).forEach(tag => {
    const parts = tag.split('/').filter(Boolean);
    let current: Record<string, unknown> = tree as Record<string, unknown>;
    parts.forEach((part, i) => {
      if (!current[part]) {
        current[part] = { _count: 0, _children: {} };
      }
      if (i === parts.length - 1) {
        (current[part] as { _count: number })._count = tagCounts[tag];
      }
      current = (current[part] as { _children: Record<string, unknown> })._children;
    });
  });

  function toNodes(obj: Record<string, unknown>, prefix: string = ''): { name: string; fullPath: string; children: unknown[]; noteCount: number }[] {
    return Object.entries(obj).map(([key, val]) => {
      const v = val as { _count: number; _children: Record<string, unknown> };
      const fullPath = prefix ? `${prefix}/${key}` : key;
      return {
        name: key,
        fullPath,
        children: toNodes(v._children, fullPath),
        noteCount: v._count,
      };
    });
  }

  return toNodes(tree as Record<string, unknown>);
}

// Sample notes for demo
export function seedSampleNotes(): void {
  const existing = loadNotes();
  if (existing.length > 0) return;

  const now = new Date().toISOString();
  const samples: Note[] = [
    {
      id: 'demo-1',
      title: '感冒辨证论治',
      content: `# 感冒辨证论治\n\n## 风寒感冒\n- 主症：恶寒重，发热轻，无汗，头身疼痛\n- 舌脉：舌苔薄白，脉浮紧\n- 治法：辛温解表，宣肺散寒\n- 选方：[[麻黄汤]] 或 [[桂枝汤]]\n\nQ: 风寒感冒的治法是什么？ A: 辛温解表，宣肺散寒\n\n## 风热感冒\n- 主症：发热重，微恶风寒，咽痛，口渴\n- 舌脉：舌尖红苔薄黄，脉浮数\n- 治法：辛凉解表，清热解毒\n- 选方：[[银翘散]]\n\nQ: 风热感冒首选方剂？ A: 银翘散\n\n## 中西医关联\n感冒对应西医 ==上呼吸道感染(URI)==，常见病原体包括鼻病毒、冠状病毒等。`,
      tags: ['中内/肺系病/感冒', '复习重点', '中西医关联'],
      folder: '中医内科/肺系病证',
      links: ['麻黄汤', '桂枝汤', '银翘散'],
      backlinks: ['方剂学习笔记'],
      createdAt: now,
      updatedAt: now,
      flashcards: [],
      isMOC: false,
    },
    {
      id: 'demo-2',
      title: '方剂学习笔记',
      content: `# 方剂学习笔记\n\n## 解表剂\n- [[麻黄汤]] — 发汗解表，宣肺平喘\n- [[桂枝汤]] — 解肌发表，调和营卫\n- [[银翘散]] — 辛凉透表，清热解毒\n\n## 补益剂\n- [[四君子汤]] — 益气健脾\n- [[四物汤]] — 补血调血\n- [[六味地黄丸]] — 滋阴补肾\n\n## 相关笔记\n- [[感冒辨证论治]]`,
      tags: ['方剂', '中内/总论'],
      folder: '方剂学',
      links: ['麻黄汤', '桂枝汤', '银翘散', '四君子汤', '四物汤', '六味地黄丸', '感冒辨证论治'],
      backlinks: [],
      createdAt: now,
      updatedAt: now,
      flashcards: [],
      isMOC: true,
    },
    {
      id: 'demo-3',
      title: '免疫学笔记 - T细胞',
      content: `# T细胞分化\n\n## 发育过程\n1. 胸腺T细胞前体\n2. ==阳性选择==（MHC限制性）\n3. ==阴性选择==（自身耐受）\n4. 成熟T细胞输出\n\n## CD4+ T细胞亚群\n| 细胞因子环境 | 亚群 | 功能 |\n|---|---|---|\n| IL-12 | Th1 | 细胞免疫 IFN-γ |\n| IL-4 | Th2 | 体液免疫 IL-4/IL-5 |\n| TGF-β | Treg | 免疫抑制 |\n| IL-6+TGF-β | Th17 | 黏膜防御 |\n\nQ: CD4+ T细胞识别的MHC类型？ A: MHC-II类分子\n\nQ: 阳性选择的意义？ A: 保证T细胞能识别自身MHC分子（MHC限制性）`,
      tags: ['免疫学/T细胞', '复习重点'],
      folder: '医学免疫学',
      links: [],
      backlinks: [],
      createdAt: now,
      updatedAt: now,
      flashcards: [],
      isMOC: false,
    },
    {
      id: 'demo-4',
      title: '微生物学笔记',
      content: `# 常见病原微生物\n\n## 革兰氏阳性菌\n- [[金黄色葡萄球菌]] — 化脓性感染\n- [[肺炎链球菌]] — 大叶性肺炎\n- [[结核分枝杆菌]]（抗酸染色阳性）— 肺结核\n\n## 革兰氏阴性菌\n- [[大肠杆菌]] — 尿路感染、腹泻\n- [[幽门螺杆菌]] — ==消化性溃疡==、胃癌\n- [[霍乱弧菌]] — 霍乱\n\n## 病毒\n- [[流感病毒]] — 抗原漂移/转换\n- [[乙肝病毒]] — 母婴传播\n\nQ: 结核分枝杆菌的特殊染色方法？ A: 抗酸染色（Ziehl-Neelsen染色）`,
      tags: ['微生物/病原微生物', '复习重点'],
      folder: '医学微生物学',
      links: ['金黄色葡萄球菌', '肺炎链球菌', '结核分枝杆菌', '大肠杆菌', '幽门螺杆菌', '霍乱弧菌', '流感病毒', '乙肝病毒'],
      backlinks: [],
      createdAt: now,
      updatedAt: now,
      flashcards: [],
      isMOC: false,
    },
  ];

  saveNotes(samples);
}
