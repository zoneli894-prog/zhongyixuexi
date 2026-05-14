import { useState, useEffect, useCallback } from 'react'
import { Note, FolderNode, TagNode } from '../types/note'
import { loadNotes, saveNotes, createNote, updateNote, deleteNote, buildFolderTree, buildTagTree, seedSampleNotes } from '../data/noteStorage'
import NoteEditor from '../components/notes/NoteEditor'
import NoteSidebar from '../components/notes/NoteSidebar'

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([])
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [sidebarFilter, setSidebarFilter] = useState<'all' | 'folder' | 'tag'>('all')
  const [sidebarOpen, setSidebarOpen] = useState(true)

  useEffect(() => {
    seedSampleNotes()
    setNotes(loadNotes())
  }, [])

  const selectedNote = notes.find(n => n.id === selectedId)
  const folderTree = buildFolderTree(notes) as unknown as FolderNode[]
  const tagTree = buildTagTree(notes) as unknown as TagNode[]

  const handleSave = useCallback((updates: Partial<Note>) => {
    if (!selectedId) return
    const updated = updateNote(selectedId, updates)
    if (updated) {
      setNotes(loadNotes())
    }
  }, [selectedId])

  const handleCreateNote = useCallback((folder?: string, tags?: string[]) => {
    const note = createNote({ folder, tags })
    setNotes(loadNotes())
    setSelectedId(note.id)
  }, [])

  const handleDelete = useCallback(() => {
    if (!selectedId) return
    if (!confirm('确定删除这篇笔记？')) return
    deleteNote(selectedId)
    setNotes(loadNotes())
    setSelectedId(null)
  }, [selectedId])

  const handleSelectNote = useCallback((id: string) => {
    setSelectedId(id)
    // On mobile, close sidebar
    if (window.innerWidth < 768) setSidebarOpen(false)
  }, [])

  return (
    <div className="h-[calc(100vh-10rem)]">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-tcm-dark">笔记</h1>
          <p className="text-sm text-tcm-muted mt-1">个人知识管理 · 双向链接 · 闪卡转化</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden px-3 py-1.5 rounded-md text-sm bg-gray-100 text-gray-600"
          >
            {sidebarOpen ? '隐藏侧栏' : '显示侧栏'}
          </button>
          <span className="text-xs text-gray-400 self-center">
            Ctrl+K 搜索 · [[ 链接 · == 挖空
          </span>
        </div>
      </div>

      <div className="flex gap-4 h-full">
        {/* Sidebar */}
        <div className={`${sidebarOpen ? 'w-64' : 'w-0 overflow-hidden'} transition-all shrink-0 md:w-64`}>
          <div className="card h-full overflow-hidden">
            <NoteSidebar
              notes={notes}
              folderTree={folderTree}
              tagTree={tagTree}
              selectedId={selectedId}
              onSelect={handleSelectNote}
              onCreateNote={handleCreateNote}
              filter={sidebarFilter}
              onFilterChange={setSidebarFilter}
            />
          </div>
        </div>

        {/* Editor area */}
        <div className="flex-1 min-w-0">
          {selectedNote ? (
            <div className="card h-full flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {selectedNote.folder && (
                    <span className="text-xs text-gray-400">{selectedNote.folder}</span>
                  )}
                  {selectedNote.tags.slice(0, 3).map((tag, i) => (
                    <span key={i} className="badge bg-tcm-accent/10 text-tcm-accent text-xs">#{tag.split('/').pop()}</span>
                  ))}
                  {selectedNote.isMOC && <span className="badge bg-amber-100 text-amber-700 text-xs">MOC</span>}
                </div>
                <button onClick={handleDelete} className="text-xs text-red-400 hover:text-red-600">删除</button>
              </div>
              <div className="flex-1 min-h-0">
                <NoteEditor note={selectedNote} onSave={handleSave} />
              </div>
            </div>
          ) : (
            <div className="card h-full flex items-center justify-center text-center">
              <div>
                <p className="text-5xl mb-4">📝</p>
                <p className="text-tcm-muted mb-2">选择一篇笔记开始编辑</p>
                <p className="text-sm text-gray-400 mb-4">或创建新笔记</p>
                <button onClick={() => handleCreateNote()} className="btn-primary text-sm">
                  + 新建笔记
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
