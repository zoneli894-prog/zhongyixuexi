import { useState, useEffect } from 'react'
import { Herb, Formula } from '../types'
import { fetchHerbs, fetchFormulas } from '../services/api'
import ComparisonTable from '../components/knowledge/ComparisonTable'

export default function ComparePage() {
  const [type, setType] = useState<'herb' | 'formula'>('herb')
  const [selectedIds, setSelectedIds] = useState<number[]>([])
  const [herbs, setHerbs] = useState<Herb[]>([])
  const [formulas, setFormulas] = useState<Formula[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([fetchHerbs(), fetchFormulas()])
      .then(([h, f]) => { setHerbs(h); setFormulas(f); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const items = type === 'herb' ? herbs : formulas
  const selectedItems = items.filter(item => selectedIds.includes(item.id))

  const toggleItem = (id: number) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : prev.length < 3 ? [...prev, id] : prev
    )
  }

  if (loading) return <div className="text-center py-16 text-tcm-muted">加载中...</div>

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-serif font-bold text-tcm-dark">对比学习</h1>
        <p className="text-sm text-tcm-muted mt-1">选择 2-3 个项目进行横向属性对比</p>
      </div>

      {/* Type selector */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={() => { setType('herb'); setSelectedIds([]); }}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            type === 'herb' ? 'bg-tcm-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          中药对比
        </button>
        <button
          onClick={() => { setType('formula'); setSelectedIds([]); }}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            type === 'formula' ? 'bg-tcm-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          方剂对比
        </button>
      </div>

      {/* Selection */}
      <div className="card mb-6">
        <h3 className="font-serif font-bold text-tcm-dark mb-3">
          选择{type === 'herb' ? '中药' : '方剂'} ({selectedIds.length}/3)
        </h3>
        <div className="flex flex-wrap gap-2">
          {items.map(item => (
            <button
              key={item.id}
              onClick={() => toggleItem(item.id)}
              className={`px-3 py-1.5 rounded-lg text-sm transition-all border ${
                selectedIds.includes(item.id)
                  ? 'bg-tcm-primary text-white border-tcm-primary'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-tcm-primary'
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>

      {/* Comparison table */}
      {selectedItems.length >= 2 ? (
        <ComparisonTable items={selectedItems} type={type} />
      ) : (
        <div className="text-center py-12 text-tcm-muted bg-white rounded-lg border border-gray-100">
          <p className="text-4xl mb-4">⚖️</p>
          <p>请选择至少 2 个{type === 'herb' ? '中药' : '方剂'}进行对比</p>
        </div>
      )}
    </div>
  )
}
