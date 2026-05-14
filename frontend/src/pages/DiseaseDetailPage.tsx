import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Disease, Syndrome, Formula, Herb } from '../types'
import { fetchDiseases, fetchSyndromes, fetchFormulas, fetchHerbs } from '../services/api'
import Badge from '../components/ui/Badge'
import PathwayGraph from '../components/knowledge/PathwayGraph'

export default function DiseaseDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [disease, setDisease] = useState<Disease | null>(null)
  const [syndromes, setSyndromes] = useState<Syndrome[]>([])
  const [formulas, setFormulas] = useState<Formula[]>([])
  const [herbs, setHerbs] = useState<Herb[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([fetchDiseases(), fetchSyndromes(), fetchFormulas(), fetchHerbs()])
      .then(([diseases, syndromes, formulas, herbs]) => {
        setDisease(diseases.find(d => d.id === Number(id)) || null)
        setSyndromes(syndromes)
        setFormulas(formulas)
        setHerbs(herbs)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [id])

  if (loading) return <div className="text-center py-16 text-tcm-muted">加载中...</div>

  if (!disease) {
    return (
      <div className="text-center py-16">
        <p className="text-4xl mb-4">🏥</p>
        <p className="text-tcm-muted">未找到该疾病</p>
        <Link to="/diseases" className="btn-primary mt-4 inline-block">返回列表</Link>
      </div>
    )
  }

  const relatedSyndromes = syndromes.filter(s => disease.syndrome_ids.includes(s.id))
  const relatedFormulas = formulas.filter(f => disease.common_formulas?.includes(f.id))

  return (
    <div>
      <Link to="/diseases" className="inline-flex items-center text-sm text-tcm-muted hover:text-tcm-primary mb-4">
        <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        返回疾病库
      </Link>

      <div className="card mb-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-3xl font-serif font-bold text-tcm-dark">{disease.name}</h1>
            <p className="text-lg text-blue-600 italic mt-1">{disease.western_name}</p>
          </div>
          <Badge variant="channel">{disease.category}</Badge>
        </div>
        <p className="text-gray-700 leading-relaxed">{disease.description}</p>
      </div>

      {/* Pathway graph */}
      <div className="card mb-6">
        <h2 className="text-xl font-serif font-bold text-tcm-dark mb-4">病 → 证 → 法 → 方 → 药 链路</h2>
        <PathwayGraph disease={disease} syndromes={syndromes} formulas={formulas} herbs={herbs} />
      </div>

      {/* Syndromes */}
      <div className="card mb-6">
        <h2 className="text-xl font-serif font-bold text-tcm-dark mb-4">相关证候 ({relatedSyndromes.length})</h2>
        <div className="space-y-4">
          {relatedSyndromes.map(syn => (
            <div key={syn.id} className="bg-tcm-bg/50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-serif font-bold text-tcm-dark">{syn.name}</h3>
                <Badge variant="taste">{syn.category}</Badge>
              </div>
              <p className="text-sm text-gray-600 mb-2">{syn.description}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                {syn.symptoms && (
                  <div>
                    <span className="text-xs font-bold text-tcm-muted">主症：</span>
                    <p className="text-sm text-gray-700">{syn.symptoms}</p>
                  </div>
                )}
                {syn.tongue_pulse && (
                  <div>
                    <span className="text-xs font-bold text-tcm-muted">舌脉：</span>
                    <p className="text-sm text-gray-700">{syn.tongue_pulse}</p>
                  </div>
                )}
              </div>

              {syn.treatment_method && (
                <div className="mt-2">
                  <span className="text-xs font-bold text-tcm-accent">治法：</span>
                  <span className="text-sm text-tcm-accent font-medium ml-1">{syn.treatment_method}</span>
                </div>
              )}

              {syn.formula_ids && syn.formula_ids.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {syn.formula_ids.map(fid => {
                    const f = formulas.find(fo => fo.id === fid)
                    return f ? (
                      <Link key={fid} to={`/formulas/${fid}`} className="badge bg-tcm-primary/10 text-tcm-primary hover:bg-tcm-primary/20">
                        {f.name}
                      </Link>
                    ) : null
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Related formulas */}
      {relatedFormulas.length > 0 && (
        <div className="card">
          <h2 className="text-xl font-serif font-bold text-tcm-dark mb-4">常用方剂</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {relatedFormulas.map(f => (
              <Link key={f.id} to={`/formulas/${f.id}`} className="bg-tcm-bg/30 p-4 rounded-lg hover:bg-tcm-bg/50 transition-colors">
                <h3 className="font-serif font-bold text-tcm-dark">{f.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{f.functions}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
