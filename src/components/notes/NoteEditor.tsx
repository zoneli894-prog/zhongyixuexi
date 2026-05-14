import { useState, useEffect, useRef, useCallback } from 'react'
import { Note } from '../../types/note'
import { extractLinks, extractFlashcards } from '../../data/noteStorage'
import { resolveLink } from '../../data/searchEngine'

interface NoteEditorProps {
  note: Note;
  onSave: (updates: Partial<Note>) => void;
}

export default function NoteEditor({ note, onSave }: NoteEditorProps) {
  const [content, setContent] = useState(note.content)
  const [title, setTitle] = useState(note.title)
  const [preview, setPreview] = useState(false)
  const [linkSuggestion, setLinkSuggestion] = useState<{ pos: number; text: string } | null>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const saveTimer = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => {
    setContent(note.content)
    setTitle(note.title)
  }, [note.id]) // eslint-disable-line

  const autoSave = useCallback((newContent: string, newTitle: string) => {
    if (saveTimer.current) clearTimeout(saveTimer.current)
    saveTimer.current = setTimeout(() => {
      const links = extractLinks(newContent)
      const flashcards = extractFlashcards({ ...note, content: newContent })
      onSave({ content: newContent, title: newTitle, links, flashcards })
    }, 500)
  }, [note, onSave])

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value
    setContent(val)
    autoSave(val, title)

    // Check for [[ link trigger
    const cursor = e.target.selectionStart
    const before = val.slice(0, cursor)
    const bracketMatch = before.match(/\[\[([^\]]*?)$/)
    if (bracketMatch) {
      setLinkSuggestion({ pos: cursor, text: bracketMatch[1] })
    } else {
      setLinkSuggestion(null)
    }
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setTitle(val)
    autoSave(content, val)
  }

  // Insert cloze syntax
  const insertCloze = () => {
    const ta = textareaRef.current
    if (!ta) return
    const start = ta.selectionStart
    const end = ta.selectionEnd
    const selected = content.slice(start, end)
    if (!selected) return
    const newContent = content.slice(0, start) + `==${selected}==` + content.slice(end)
    setContent(newContent)
    autoSave(newContent, title)
  }

  // Insert Q: A: template
  const insertQA = () => {
    const ta = textareaRef.current
    if (!ta) return
    const pos = ta.selectionStart
    const newContent = content.slice(0, pos) + '\nQ: 问题 A: 答案\n' + content.slice(pos)
    setContent(newContent)
    autoSave(newContent, title)
  }

  // Render markdown-like preview
  const renderPreview = (text: string) => {
    return text
      .split('\n')
      .map((line, i) => {
        // Headers
        if (line.startsWith('# ')) return <h1 key={i} className="text-2xl font-serif font-bold text-tcm-dark mt-4 mb-2">{line.slice(2)}</h1>
        if (line.startsWith('## ')) return <h2 key={i} className="text-xl font-serif font-bold text-tcm-dark mt-3 mb-2">{line.slice(3)}</h2>
        if (line.startsWith('### ')) return <h3 key={i} className="text-lg font-serif font-bold text-tcm-dark mt-2 mb-1">{line.slice(4)}</h3>

        // Table row
        if (line.trim().startsWith('|')) {
          const cells = line.split('|').filter(c => c.trim()).map(c => c.trim())
          if (cells.some(c => c.match(/^[-]+$/))) return null // separator
          return (
            <tr key={i} className="border-b border-gray-200">
              {cells.map((c, j) => <td key={j} className="px-3 py-1.5 text-sm">{renderInline(c)}</td>)}
            </tr>
          )
        }

        // List
        if (line.trim().startsWith('- ')) {
          return <li key={i} className="ml-4 text-sm text-gray-700 list-disc">{renderInline(line.trim().slice(2))}</li>
        }

        // Ordered list
        if (line.trim().match(/^\d+\.\s/)) {
          return <li key={i} className="ml-4 text-sm text-gray-700 list-decimal">{renderInline(line.trim().replace(/^\d+\.\s/, ''))}</li>
        }

        // Q: A:
        const qaMatch = line.trim().match(/^Q:\s*(.+?)\s*A:\s*(.+)$/)
        if (qaMatch) {
          return (
            <div key={i} className="bg-blue-50 p-3 rounded-lg my-2 border-l-4 border-blue-400">
              <p className="text-sm font-medium text-blue-800">Q: {renderInline(qaMatch[1])}</p>
              <p className="text-sm text-blue-700 mt-1">A: {renderInline(qaMatch[2])}</p>
            </div>
          )
        }

        // Empty line
        if (!line.trim()) return <br key={i} />

        // Normal paragraph
        return <p key={i} className="text-sm text-gray-700 leading-relaxed my-1">{renderInline(line)}</p>
      })
  }

  const renderInline = (text: string) => {
    const parts: (string | React.ReactElement)[] = []
    const regex = /(\[\[[^\]]+\]\])|(==[^=]+==)|(\*\*[^*]+\*\*)|(\*[^*]+\*)/g
    let lastIndex = 0
    let match

    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.slice(lastIndex, match.index))
      }
      if (match[0].startsWith('[[')) {
        const linkText = match[0].slice(2, -2)
        const href = resolveLink(linkText)
        parts.push(
          href
            ? <a key={match.index} href={href} className="text-tcm-primary hover:underline font-medium">{linkText}</a>
            : <span key={match.index} className="text-tcm-primary bg-red-50 px-1 rounded">{linkText}</span>
        )
      } else if (match[0].startsWith('==')) {
        parts.push(<span key={match.index} className="bg-yellow-200 px-1 rounded">{match[0].slice(2, -2)}</span>)
      } else if (match[0].startsWith('**')) {
        parts.push(<strong key={match.index}>{match[0].slice(2, -2)}</strong>)
      } else {
        parts.push(<em key={match.index}>{match[0].slice(1, -1)}</em>)
      }
      lastIndex = match.index + match[0].length
    }
    if (lastIndex < text.length) parts.push(text.slice(lastIndex))
    return parts
  }

  const flashcardCount = extractFlashcards({ ...note, content }).length

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-2 mb-3 pb-3 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPreview(false)}
            className={`px-3 py-1.5 rounded-md text-sm ${!preview ? 'bg-tcm-primary text-white' : 'bg-gray-100 text-gray-600'}`}
          >
            编辑
          </button>
          <button
            onClick={() => setPreview(true)}
            className={`px-3 py-1.5 rounded-md text-sm ${preview ? 'bg-tcm-primary text-white' : 'bg-gray-100 text-gray-600'}`}
          >
            预览
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={insertCloze} className="px-2 py-1 rounded text-xs bg-yellow-100 text-yellow-700 hover:bg-yellow-200" title="选中文字后点击添加挖空">
            ==挖空==
          </button>
          <button onClick={insertQA} className="px-2 py-1 rounded text-xs bg-blue-100 text-blue-700 hover:bg-blue-200" title="插入问答模板">
            Q/A
          </button>
          {flashcardCount > 0 && (
            <span className="text-xs text-tcm-accent font-medium">{flashcardCount} 张闪卡</span>
          )}
        </div>
      </div>

      {/* Title */}
      <input
        type="text"
        value={title}
        onChange={handleTitleChange}
        placeholder="笔记标题..."
        className="text-2xl font-serif font-bold text-tcm-dark bg-transparent border-none outline-none mb-4 w-full placeholder:text-gray-300"
      />

      {/* Editor / Preview */}
      {preview ? (
        <div className="flex-1 overflow-y-auto prose-sm">
          <div className="bg-tcm-surface p-4 rounded-lg">
            {renderPreview(content)}
          </div>
          {note.links.length > 0 && (
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-xs font-bold text-tcm-muted mb-2">链接到</p>
              <div className="flex flex-wrap gap-1.5">
                {note.links.map((link, i) => {
                  const href = resolveLink(link)
                  return href
                    ? <a key={i} href={href} className="badge bg-tcm-primary/10 text-tcm-primary hover:bg-tcm-primary/20">{link}</a>
                    : <span key={i} className="badge bg-gray-100 text-gray-500">{link}</span>
                })}
              </div>
            </div>
          )}
          {note.backlinks.length > 0 && (
            <div className="mt-2 p-3 bg-blue-50 rounded-lg">
              <p className="text-xs font-bold text-blue-600 mb-2">反向链接</p>
              <div className="flex flex-wrap gap-1.5">
                {note.backlinks.map((bl, i) => (
                  <span key={i} className="badge bg-blue-100 text-blue-700">{bl}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={content}
            onChange={handleContentChange}
            placeholder="开始写笔记...&#10;&#10;支持:&#10;# 标题&#10;**加粗** *斜体*&#10;[[双向链接]]&#10;==挖空内容==&#10;Q: 问题 A: 答案"
            className="w-full h-full bg-transparent border-none outline-none resize-none text-sm text-gray-700 leading-relaxed font-mono placeholder:text-gray-300"
            spellCheck={false}
          />
          {linkSuggestion && (
            <div className="absolute bottom-4 right-4 bg-white shadow-lg rounded-lg p-3 border border-gray-200 text-xs text-tcm-muted">
              提示: 输入 ]] 完成链接
            </div>
          )}
        </div>
      )}
    </div>
  )
}
