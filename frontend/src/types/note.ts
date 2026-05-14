export interface Note {
  id: string;
  title: string;
  content: string; // Markdown content
  tags: string[]; // e.g. ['中内/肺系病/感冒', '复习重点']
  folder: string; // e.g. '中医内科/感冒'
  links: string[]; // `[[Page Name]]` extracted targets
  backlinks: string[]; // notes that link to this note
  createdAt: string;
  updatedAt: string;
  flashcards: NoteFlashcard[];
  isMOC: boolean; // Map of Content page
}

export interface NoteFlashcard {
  id: string;
  noteId: string;
  type: 'cloze' | 'qa';
  question: string;
  answer: string;
  clozePositions?: number[]; // for cloze type
  clozeAnswers?: string[];
  sourceLine?: string; // original context
  easinessFactor: number;
  intervalDays: number;
  repetitions: number;
  nextReviewDate: string;
}

export interface SearchResult {
  type: 'note' | 'knowledge';
  id: string;
  title: string;
  excerpt: string;
  matchedField: string;
}

export interface TagNode {
  name: string;
  fullPath: string;
  children: TagNode[];
  noteCount: number;
}

export interface FolderNode {
  name: string;
  fullPath: string;
  children: FolderNode[];
  noteCount: number;
}
