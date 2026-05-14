import { SearchResult } from '../types/note';
import { Note } from '../types/note';
import { herbs, formulas, syndromes, diseases, microbes } from './mockData';

// Full-text search across notes and knowledge base
export function globalSearch(query: string, notes: Note[]): SearchResult[] {
  if (!query.trim()) return [];
  const q = query.toLowerCase();
  const results: SearchResult[] = [];

  // Search notes
  notes.forEach(note => {
    if (note.title.toLowerCase().includes(q)) {
      results.push({
        type: 'note',
        id: note.id,
        title: note.title,
        excerpt: getExcerpt(note.content, q),
        matchedField: '标题',
      });
    } else if (note.content.toLowerCase().includes(q)) {
      results.push({
        type: 'note',
        id: note.id,
        title: note.title,
        excerpt: getExcerpt(note.content, q),
        matchedField: '内容',
      });
    } else if (note.tags.some(t => t.toLowerCase().includes(q))) {
      results.push({
        type: 'note',
        id: note.id,
        title: note.title,
        excerpt: `标签: ${note.tags.filter(t => t.toLowerCase().includes(q)).join(', ')}`,
        matchedField: '标签',
      });
    }
  });

  // Search herbs
  herbs.forEach(h => {
    if (h.name.includes(q) || h.pinyin.toLowerCase().includes(q) || h.functions.includes(q)) {
      results.push({
        type: 'knowledge',
        id: `herb-${h.id}`,
        title: `${h.name} (中药)`,
        excerpt: h.functions.slice(0, 60),
        matchedField: h.name.includes(q) ? '名称' : '功效',
      });
    }
  });

  // Search formulas
  formulas.forEach(f => {
    if (f.name.includes(q) || f.pinyin.toLowerCase().includes(q) || f.functions.includes(q)) {
      results.push({
        type: 'knowledge',
        id: `formula-${f.id}`,
        title: `${f.name} (方剂)`,
        excerpt: f.functions.slice(0, 60),
        matchedField: '名称',
      });
    }
  });

  // Search syndromes
  syndromes.forEach(s => {
    if (s.name.includes(q) || s.description.includes(q)) {
      results.push({
        type: 'knowledge',
        id: `syndrome-${s.id}`,
        title: `${s.name} (证候)`,
        excerpt: s.description.slice(0, 60),
        matchedField: '名称',
      });
    }
  });

  // Search diseases
  diseases.forEach(d => {
    if (d.name.includes(q) || d.western_name.toLowerCase().includes(q)) {
      results.push({
        type: 'knowledge',
        id: `disease-${d.id}`,
        title: `${d.name} / ${d.western_name}`,
        excerpt: d.description.slice(0, 60),
        matchedField: '疾病',
      });
    }
  });

  // Search microbes
  microbes.forEach(m => {
    if (m.name.includes(q) || m.genus.toLowerCase().includes(q)) {
      results.push({
        type: 'knowledge',
        id: `microbe-${m.id}`,
        title: `${m.name} (微生物)`,
        excerpt: m.pathogenesis.slice(0, 60),
        matchedField: '名称',
      });
    }
  });

  return results.slice(0, 20); // limit results
}

function getExcerpt(content: string, query: string, contextLen: number = 40): string {
  const idx = content.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return content.slice(0, 60) + '...';
  const start = Math.max(0, idx - contextLen);
  const end = Math.min(content.length, idx + query.length + contextLen);
  return (start > 0 ? '...' : '') + content.slice(start, end) + (end < content.length ? '...' : '');
}

// Resolve a link target to a navigation path
export function resolveLink(linkText: string): string | null {
  const herb = herbs.find(h => h.name === linkText);
  if (herb) return `/herbs/${herb.id}`;

  const formula = formulas.find(f => f.name === linkText);
  if (formula) return `/formulas/${formula.id}`;

  const disease = diseases.find(d => d.name === linkText || d.western_name === linkText);
  if (disease) return `/diseases/${disease.id}`;

  const microbe = microbes.find(m => m.name === linkText);
  if (microbe) return `/microbes`;

  return null;
}
