import { useState, useEffect } from 'react'
import { Microbe } from '../types'
import { fetchMicrobes } from '../services/api'
import MicrobeCard from '../components/knowledge/MicrobeCard'
import SearchBar from '../components/ui/SearchBar'
import Badge from '../components/ui/Badge'

export default function MicrobesPage() {
  const [microbes, setMicrobes] = useState<Microbe[]>([])
  const [search, setSearch] = useState('')
  const [selectedMicrobe, setSelectedMicrobe] = useState<Microbe | null>(null)
  const [gramFilter, setGramFilter] = useState<string>('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMicrobes().then(data => { setMicrobes(data); setLoading(false) }).catch(() => setLoading(false))
  }, [])

  const filtered = microbes.filter(m => {
    const matchSearch = m.name.includes(search) || m.genus.toLowerCase().includes(search.toLowerCase()) ||
      m.clinical_diseases.some(d => d.includes(search))
    const matchGram = !gramFilter || m.gram_stain === gramFilter
    return matchSearch && matchGram
  })

  if (loading) return <div className="text-center py-16 text-tcm-muted">加载中...</div>

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-serif font-bold text-tcm-dark">微生物档案库</h1>
          <p className="text-sm text-tcm-muted mt-1">共 {microbes.length} 种常见病原微生物</p>
        </div>
        <SearchBar placeholder="搜索病原体名称、致病疾病..." onSearch={setSearch} />
      </div>

      {/* Gram stain filter */}
      <div className="flex gap-2 mb-6">
        {['', '阳性', '阴性', '不适用'].map(g => (
          <button
            key={g}
            onClick={() => setGramFilter(g)}
            className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
              gramFilter === g ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {g || '全部'}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {filtered.map(m => (
              <MicrobeCard
                key={m.id}
                microbe={m}
                onClick={() => setSelectedMicrobe(m)}
              />
            ))}
          </div>
        </div>

        {/* Detail panel */}
        <div className="card">
          {selectedMicrobe ? (
            <div>
              <h2 className="text-xl font-serif font-bold text-tcm-dark">{selectedMicrobe.name}</h2>
              <p className="text-sm text-tcm-muted italic mb-3">{selectedMicrobe.genus}</p>

              <div className="flex gap-2 mb-4">
                <Badge variant={selectedMicrobe.gram_stain === '阳性' ? 'primary' : 'nature'}>
                  革兰氏{selectedMicrobe.gram_stain}
                </Badge>
                <Badge variant="taste">{selectedMicrobe.shape}</Badge>
              </div>

              <div className="space-y-3 text-sm">
                <div>
                  <span className="font-bold text-tcm-dark">致病机制：</span>
                  <p className="text-gray-700 mt-1">{selectedMicrobe.pathogenesis}</p>
                </div>
                <div>
                  <span className="font-bold text-tcm-dark">临床疾病：</span>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {selectedMicrobe.clinical_diseases.map((d, i) => (
                      <span key={i} className="badge bg-red-50 text-red-600 border border-red-200">{d}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="font-bold text-tcm-dark">传播途径：</span>
                  <p className="text-gray-700 mt-1">{selectedMicrobe.transmission}</p>
                </div>
                <div>
                  <span className="font-bold text-tcm-dark">预防措施：</span>
                  <p className="text-gray-700 mt-1">{selectedMicrobe.prevention}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-tcm-muted">
              <p className="text-4xl mb-4">🦠</p>
              <p>点击左侧卡片查看详情</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
