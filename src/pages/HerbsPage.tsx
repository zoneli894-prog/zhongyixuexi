import { useState, useEffect } from 'react'
import { Herb } from '../types'
import { fetchHerbs } from '../services/api'
import HerbCard from '../components/knowledge/HerbCard'
import SearchBar from '../components/ui/SearchBar'

export default function HerbsPage() {
  const [herbs, setHerbs] = useState<Herb[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchHerbs().then(data => { setHerbs(data); setLoading(false) }).catch(() => setLoading(false))
  }, [])

  const filtered = herbs.filter(h =>
    h.name.includes(search) ||
    h.pinyin.toLowerCase().includes(search.toLowerCase()) ||
    h.functions.includes(search) ||
    h.channel_tropism.includes(search)
  )

  if (loading) return <div className="text-center py-16 text-tcm-muted">加载中...</div>

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-serif font-bold text-tcm-dark">中药库</h1>
          <p className="text-sm text-tcm-muted mt-1">共 {herbs.length} 味中药</p>
        </div>
        <SearchBar placeholder="搜索中药名称、拼音、功效..." onSearch={setSearch} />
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-tcm-muted">
          <p className="text-4xl mb-4">🔍</p>
          <p>未找到匹配的中药</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(herb => (
            <HerbCard key={herb.id} herb={herb} />
          ))}
        </div>
      )}
    </div>
  )
}
