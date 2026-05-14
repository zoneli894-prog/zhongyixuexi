import { useState, useEffect } from 'react'
import { Formula } from '../types'
import { fetchFormulas } from '../services/api'
import FormulaCard from '../components/knowledge/FormulaCard'
import SearchBar from '../components/ui/SearchBar'

export default function FormulasPage() {
  const [formulas, setFormulas] = useState<Formula[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchFormulas().then(data => { setFormulas(data); setLoading(false) }).catch(() => setLoading(false))
  }, [])

  const filtered = formulas.filter(f =>
    f.name.includes(search) ||
    f.pinyin.toLowerCase().includes(search.toLowerCase()) ||
    f.functions.includes(search) ||
    f.source.includes(search)
  )

  if (loading) return <div className="text-center py-16 text-tcm-muted">加载中...</div>

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-serif font-bold text-tcm-dark">方剂库</h1>
          <p className="text-sm text-tcm-muted mt-1">共 {formulas.length} 首方剂</p>
        </div>
        <SearchBar placeholder="搜索方剂名称、拼音、功效..." onSearch={setSearch} />
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-tcm-muted">
          <p className="text-4xl mb-4">🔍</p>
          <p>未找到匹配的方剂</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {filtered.map(formula => (
            <FormulaCard key={formula.id} formula={formula} />
          ))}
        </div>
      )}
    </div>
  )
}
