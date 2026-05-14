import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Herb, Formula } from '../types'
import { fetchHerbs, fetchFormulas } from '../services/api'
import Badge from '../components/ui/Badge'
import CompositionChart from '../components/charts/CompositionChart'

export default function FormulaDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [formula, setFormula] = useState<Formula | null>(null)
  const [herbs, setHerbs] = useState<Herb[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([fetchFormulas(), fetchHerbs()])
      .then(([formulas, herbs]) => {
        setFormula(formulas.find(f => f.id === Number(id)) || null)
        setHerbs(herbs)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [id])

  if (loading) return <div className="text-center py-16 text-tcm-muted">加载中...</div>

  if (!formula) {
    return (
      <div className="text-center py-16">
        <p className="text-4xl mb-4">📜</p>
        <p className="text-tcm-muted">未找到该方剂</p>
        <Link to="/formulas" className="btn-primary mt-4 inline-block">返回列表</Link>
      </div>
    )
  }

  const roleColors: Record<string, string> = {
    '君': 'primary', '臣': 'nature', '佐': 'accent', '使': 'taste',
  }

  return (
    <div>
      <Link to="/formulas" className="inline-flex items-center text-sm text-tcm-muted hover:text-tcm-primary mb-4">
        <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        返回方剂库
      </Link>

      <div className="card mb-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-3xl font-serif font-bold text-tcm-dark">{formula.name}</h1>
            <p className="text-lg text-tcm-muted mt-1">{formula.pinyin}</p>
          </div>
          <Badge variant="accent">{formula.source}</Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-serif font-bold text-tcm-dark mb-2">功效</h3>
            <p className="text-gray-700 text-sm leading-relaxed mb-4">{formula.functions}</p>

            <h3 className="font-serif font-bold text-tcm-dark mb-2">主治</h3>
            <p className="text-gray-700 text-sm leading-relaxed mb-4">{formula.indications}</p>

            <h3 className="font-serif font-bold text-tcm-dark mb-2">用法</h3>
            <p className="text-gray-700 text-sm">{formula.usage_dosage}</p>

            {formula.cautions && (
              <>
                <h3 className="font-serif font-bold text-tcm-primary mt-4 mb-2">注意事项</h3>
                <p className="text-gray-700 text-sm bg-red-50 p-3 rounded-lg border border-red-100">{formula.cautions}</p>
              </>
            )}
          </div>

          <div>
            <h3 className="font-serif font-bold text-tcm-dark mb-3">方歌</h3>
            <div className="bg-tcm-bg/50 p-4 rounded-lg border border-gray-200 font-serif text-lg leading-loose text-center text-tcm-dark tracking-wider">
              {formula.mnemonic}
            </div>
          </div>
        </div>
      </div>

      {/* Composition */}
      <div className="card mb-6">
        <h2 className="text-xl font-serif font-bold text-tcm-dark mb-4">药物组成 — 君臣佐使</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            {formula.composition.map((c, i) => {
              const herb = herbs.find(h => h.id === c.herb_id)
              return (
                <div key={i} className="flex items-center gap-3 py-2.5 border-b border-gray-100 last:border-0">
                  <Badge variant={roleColors[c.role] as 'primary'}>{c.role}</Badge>
                  <Link to={`/herbs/${c.herb_id}`} className="font-medium text-tcm-dark hover:text-tcm-primary">
                    {c.herb_name}
                  </Link>
                  <span className="text-sm text-tcm-muted">{c.dosage}</span>
                  {herb && <span className="text-xs text-gray-400 ml-auto">{herb.functions.split('，')[0]}</span>}
                </div>
              )
            })}
          </div>
          <div>
            <CompositionChart composition={formula.composition} />
          </div>
        </div>
      </div>
    </div>
  )
}
