import { useState } from 'react'
import { Note, FolderNode, TagNode } from '../../types/note'

interface NoteSidebarProps {
  notes: Note[];
  folderTree: FolderNode[];
  tagTree: TagNode[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onCreateNote: (folder?: string, tags?: string[]) => void;
  filter: 'all' | 'folder' | 'tag';
  onFilterChange: (filter: 'all' | 'folder' | 'tag') => void;
}

export default function NoteSidebar({
  notes, folderTree, tagTree, selectedId, onSelect, onCreateNote, filter, onFilterChange,
}: NoteSidebarProps) {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set())
  const [expandedTags, setExpandedTags] = useState<Set<string>>(new Set())

  const toggleFolder = (path: string) => {
    setExpandedFolders(prev => {
      const next = new Set(prev)
      next.has(path) ? next.delete(path) : next.add(path)
      return next
    })
  }

  const toggleTag = (path: string) => {
    setExpandedTags(prev => {
      const next = new Set(prev)
      next.has(path) ? next.delete(path) : next.add(path)
      return next
    })
  }

  const renderFolderNode = (node: FolderNode, depth: number = 0) => (
    <div key={node.fullPath}>
      <button
        onClick={() => toggleFolder(node.fullPath)}
        className="w-full flex items-center gap-1.5 px-2 py-1.5 text-sm hover:bg-gray-100 rounded text-left"
        style={{ paddingLeft: `${depth * 12 + 8}px` }}
      >
        <span className="text-gray-400 text-xs">{expandedFolders.has(node.fullPath) ? '▾' : '▸'}</span>
        <span className="font-medium text-tcm-dark">{node.name}</span>
        <span className="text-xs text-gray-400 ml-auto">{node.noteCount}</span>
      </button>
      {expandedFolders.has(node.fullPath) && (
        <>
          {node.children.map(child => renderFolderNode(child, depth + 1))}
          {notes.filter(n => n.folder === node.fullPath).map(note => (
            <button
              key={note.id}
              onClick={() => onSelect(note.id)}
              className={`w-full text-left text-sm px-2 py-1 rounded truncate ${
                selectedId === note.id ? 'bg-tcm-primary/10 text-tcm-primary font-medium' : 'text-gray-600 hover:bg-gray-50'
              }`}
              style={{ paddingLeft: `${(depth + 1) * 12 + 8}px` }}
            >
              {note.isMOC ? '🗺️ ' : '📝 '}{note.title}
            </button>
          ))}
        </>
      )}
    </div>
  )

  const renderTagNode = (node: TagNode, depth: number = 0) => (
    <div key={node.fullPath}>
      <button
        onClick={() => toggleTag(node.fullPath)}
        className="w-full flex items-center gap-1.5 px-2 py-1.5 text-sm hover:bg-gray-100 rounded text-left"
        style={{ paddingLeft: `${depth * 12 + 8}px` }}
      >
        <span className="text-gray-400 text-xs">{expandedTags.has(node.fullPath) ? '▾' : '▸'}</span>
        <span className="text-tcm-accent font-medium">#{node.name}</span>
        <span className="text-xs text-gray-400 ml-auto">{node.noteCount}</span>
      </button>
      {expandedTags.has(node.fullPath) && (
        <>
          {node.children.map(child => renderTagNode(child, depth + 1))}
          {notes.filter(n => n.tags.some(t => t === node.fullPath || t.startsWith(node.fullPath + '/'))).map(note => (
            <button
              key={note.id}
              onClick={() => onSelect(note.id)}
              className={`w-full text-left text-sm px-2 py-1 rounded truncate ${
                selectedId === note.id ? 'bg-tcm-primary/10 text-tcm-primary font-medium' : 'text-gray-600 hover:bg-gray-50'
              }`}
              style={{ paddingLeft: `${(depth + 1) * 12 + 8}px` }}
            >
              {note.isMOC ? '🗺️ ' : '📝 '}{note.title}
            </button>
          ))}
        </>
      )}
    </div>
  )

  return (
    <div className="h-full flex flex-col">
      {/* Filter tabs */}
      <div className="flex gap-1 mb-3 px-1">
        {[
          { key: 'all' as const, label: '全部' },
          { key: 'folder' as const, label: '文件夹' },
          { key: 'tag' as const, label: '标签' },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => onFilterChange(tab.key)}
            className={`flex-1 py-1.5 rounded text-xs font-medium ${
              filter === tab.key ? 'bg-tcm-primary text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {filter === 'all' && (
          <div className="space-y-0.5">
            {notes.map(note => (
              <button
                key={note.id}
                onClick={() => onSelect(note.id)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm ${
                  selectedId === note.id ? 'bg-tcm-primary/10 text-tcm-primary' : 'hover:bg-gray-50 text-gray-700'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <span>{note.isMOC ? '🗺️' : '📝'}</span>
                  <span className="font-medium truncate">{note.title}</span>
                </div>
                <p className="text-xs text-gray-400 mt-0.5 truncate">
                  {note.folder && `${note.folder} · `}{new Date(note.updatedAt).toLocaleDateString('zh-CN')}
                </p>
              </button>
            ))}
          </div>
        )}

        {filter === 'folder' && (
          <div>
            <button
              onClick={() => onCreateNote()}
              className="w-full text-left px-3 py-2 mb-2 rounded-lg text-sm text-tcm-primary hover:bg-tcm-primary/5 border border-dashed border-tcm-primary/30"
            >
              + 新建笔记
            </button>
            {folderTree.map(node => renderFolderNode(node))}
          </div>
        )}

        {filter === 'tag' && (
          <div>
            {tagTree.map(node => renderTagNode(node))}
          </div>
        )}
      </div>

      {/* New note button */}
      <div className="pt-3 mt-3 border-t border-gray-200">
        <button
          onClick={() => onCreateNote()}
          className="w-full btn-primary text-sm"
        >
          + 新建笔记
        </button>
      </div>
    </div>
  )
}
