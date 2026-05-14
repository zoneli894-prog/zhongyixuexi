import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Herb, Formula } from '../types'
import { fetchHerbs, fetchFormulas } from '../services/api'
import Badge from '../components/ui/Badge'

export default function HerbDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [herb, setHerb] = useState<Herb | null>(null)
  const [formulas, setFormulas] = useState<Formula[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([fetchHerbs(), fetchFormulas()])
      .then(([herbs, formulas]) => {
        setHerb(herbs.find(h => h.id === Number(id)) || null)
        setFormulas(formulas)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [id])

  if (loading) return <div className="text-center py-16 text-tcm-muted">加载中...</div>

  if (!herb) {
    return (
      <div className="text-center py-16">
        <p className="text-4xl mb-4">🌿</p>
        <p className="text-tcm-muted">未找到该中药</p>
        <Link to="/herbs" className="btn-primary mt-4 inline-block">返回列表</Link>
      </div>
    )
  }

  const relatedFormulas = formulas.filter(f =>
    f.composition.some(c => c.herb_id === herb.id)
  )

  return (
    <div>
      <Link to="/herbs" className="inline-flex items-center text-sm text-tcm-muted hover:text-tcm-primary mb-4">
        <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        返回中药库
      </Link>

      <div className="card">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-3xl font-serif font-bold text-tcm-dark">{herb.name}</h1>
            <p className="text-lg text-tcm-muted mt-1">{herb.pinyin}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-serif font-bold text-tcm-dark mb-2">性味</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {herb.taste.split('、').map((t, i) => <Badge key={i} variant="taste">{t}</Badge>)}
              <Badge variant="nature">{herb.nature}</Badge>
            </div>

            <h3 className="font-serif font-bold text-tcm-dark mb-2">归经</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {herb.channel_tropism.split('、').map((ch, i) => <Badge key={i} variant="channel">{ch}</Badge>)}
            </div>

            <h3 className="font-serif font-bold text-tcm-dark mb-2">用量用法</h3>
            <p className="text-gray-700 text-sm">{herb.usage_dosage}</p>
          </div>

          <div>
            <h3 className="font-serif font-bold text-tcm-dark mb-2">功效</h3>
            <p className="text-gray-700 text-sm leading-relaxed mb-4">{herb.functions}</p>

            {herb.cautions && (
              <>
                <h3 className="font-serif font-bold text-tcm-primary mb-2">注意事项</h3>
                <p className="text-gray-700 text-sm leading-relaxed bg-red-50 p-3 rounded-lg border border-red-100">{herb.cautions}</p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Related formulas */}
      {relatedFormulas.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-serif font-bold text-tcm-dark mb-4">相关方剂 ({relatedFormulas.length})</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {relatedFormulas.map(f => (
              <Link key={f.id} to={`/formulas/${f.id}`} className="card group">
                <h3 className="font-serif font-bold text-tcm-dark group-hover:text-tcm-primary">{f.name}</h3>
                <p className="text-sm text-tcm-muted">{f.pinyin}</p>
                <p className="text-sm text-gray-600 mt-2">{f.functions}</p>
                <div className="mt-2 text-xs text-tcm-muted">
                  含{herb.name}（{f.composition.find(c => c.herb_id === herb.id)?.role}药 {f.composition.find(c => c.herb_id === herb.id)?.dosage}）
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
