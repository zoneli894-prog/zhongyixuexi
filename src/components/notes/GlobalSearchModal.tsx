import { useState, useEffect, useRef } from 'react'
import { Note, SearchResult } from '../../types/note'
import { globalSearch } from '../../data/searchEngine'

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  notes: Note[];
  onSelectNote: (id: string) => void;
}

export default function GlobalSearchModal({ isOpen, onClose, notes, onSelectNote }: GlobalSearchModalProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      setQuery('')
      setResults([])
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [isOpen])

  useEffect(() => {
    setResults(globalSearch(query, notes))
  }, [query, notes])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') onClose()
    if (e.key === 'Enter' && results.length > 0) {
      handleSelect(results[0])
    }
  }

  const handleSelect = (result: SearchResult) => {
    if (result.type === 'note') {
      onSelectNote(result.id)
    } else {
      // Navigate to knowledge page
      const [type, id] = result.id.split('-')
      const routes: Record<string, string> = {
        herb: `/herbs/${id}`,
        formula: `/formulas/${id}`,
        disease: `/diseases/${id}`,
        microbe: '/microbes',
        syndrome: '/diseases',
      }
      if (routes[type]) {
        window.location.hash = ''
        window.open(routes[type], '_blank')
      }
    }
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]" onClick={onClose}>
      <div className="absolute inset-0 bg-black/30" />
      <div
        className="relative w-full max-w-xl bg-white rounded-xl shadow-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Search input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200">
          <svg className="w-5 h-5 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="搜索笔记和知识库... (Ctrl+K)"
            className="flex-1 outline-none text-sm placeholder:text-gray-400"
          />
          <kbd className="px-2 py-0.5 rounded bg-gray-100 text-xs text-gray-400">ESC</kbd>
        </div>

        {/* Results */}
        <div className="max-h-[50vh] overflow-y-auto">
          {results.length === 0 && query && (
            <p className="text-center text-sm text-gray-400 py-8">未找到结果</p>
          )}
          {results.map((r, i) => (
            <button
              key={`${r.type}-${r.id}-${i}`}
              onClick={() => handleSelect(r)}
              className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-0"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className={`badge ${r.type === 'note' ? 'bg-tcm-primary/10 text-tcm-primary' : 'bg-blue-50 text-blue-600'}`}>
                  {r.type === 'note' ? '笔记' : '知识库'}
                </span>
                <span className="text-xs text-gray-400">{r.matchedField}</span>
              </div>
              <p className="text-sm font-medium text-tcm-dark">{r.title}</p>
              <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{r.excerpt}</p>
            </button>
          ))}
        </div>

        {results.length > 0 && (
          <div className="px-4 py-2 border-t border-gray-100 text-xs text-gray-400">
            {results.length} 个结果 · 回车选择第一条
          </div>
        )}
      </div>
    </div>
  )
}
