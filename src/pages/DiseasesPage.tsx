import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Disease } from '../types'
import { fetchDiseases } from '../services/api'
import SearchBar from '../components/ui/SearchBar'
import Badge from '../components/ui/Badge'

export default function DiseasesPage() {
  const [diseases, setDiseases] = useState<Disease[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDiseases().then(data => { setDiseases(data); setLoading(false) }).catch(() => setLoading(false))
  }, [])

  const filtered = diseases.filter(d =>
    d.name.includes(search) || d.western_name.toLowerCase().includes(search.toLowerCase()) ||
    d.category.includes(search) || d.description.includes(search)
  )

  const categories = [...new Set(diseases.map(d => d.category))]

  if (loading) return <div className="text-center py-16 text-tcm-muted">加载中...</div>

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-serif font-bold text-tcm-dark">疾病证候库</h1>
          <p className="text-sm text-tcm-muted mt-1">中医病证与西医疾病对照 · 共 {diseases.length} 种疾病</p>
        </div>
        <SearchBar placeholder="搜索病名、西医名..." onSearch={setSearch} />
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map(cat => (
          <Badge key={cat} variant="channel">{cat}</Badge>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map(disease => (
          <Link key={disease.id} to={`/diseases/${disease.id}`} className="card group">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-lg font-serif font-bold text-tcm-dark group-hover:text-tcm-primary transition-colors">
                {disease.name}
              </h3>
              <Badge variant="channel">{disease.category}</Badge>
            </div>
            <p className="text-sm text-blue-600 italic mb-2">{disease.western_name}</p>
            <p className="text-sm text-gray-600 line-clamp-2 mb-3">{disease.description}</p>
            <div className="pt-3 border-t border-gray-100 text-xs text-tcm-muted">
              含 {disease.syndrome_ids.length} 个证候
              {disease.common_formulas && disease.common_formulas.length > 0 && (
                <span className="ml-2">· {disease.common_formulas.length} 首常用方剂</span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
