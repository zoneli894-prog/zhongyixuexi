import { useState, useEffect } from 'react'
import { Meridian } from '../types'
import { fetchMeridians } from '../services/api'
import MeridianMap from '../components/knowledge/MeridianMap'
import Badge from '../components/ui/Badge'

export default function MeridiansPage() {
  const [meridians, setMeridians] = useState<Meridian[]>([])
  const [selected, setSelected] = useState<Meridian | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMeridians().then(data => { setMeridians(data); setLoading(false) }).catch(() => setLoading(false))
  }, [])

  if (loading) return <div className="text-center py-16 text-tcm-muted">加载中...</div>

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-serif font-bold text-tcm-dark">经络图谱</h1>
        <p className="text-sm text-tcm-muted mt-1">十四经脉交互式图谱 · 悬停查看经络，点击查看穴位</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map */}
        <div className="lg:col-span-2 card flex items-center justify-center">
          <MeridianMap meridians={meridians} onSelect={setSelected} />
        </div>

        {/* Meridian list / detail */}
        <div className="card">
          {selected ? (
            <div>
              <h2 className="text-xl font-serif font-bold text-tcm-dark">{selected.name}</h2>
              <p className="text-sm text-tcm-muted mb-3">{selected.pinyin}</p>
              <Badge variant="channel">{selected.organ}经</Badge>
              <p className="text-sm text-gray-600 mt-3 leading-relaxed">{selected.pathway_desc}</p>

              <h3 className="font-serif font-bold text-tcm-dark mt-4 mb-2">穴位 ({selected.acupoints.length})</h3>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {selected.acupoints.map((ap, i) => (
                  <div key={i} className="bg-tcm-bg/50 p-2 rounded text-sm">
                    <span className="font-medium text-tcm-primary">{ap.name}</span>
                    <span className="text-tcm-muted ml-1">({ap.pinyin})</span>
                    <p className="text-gray-500 text-xs mt-0.5">{ap.location}</p>
                  </div>
                ))}
              </div>

              <button onClick={() => setSelected(null)} className="mt-4 text-sm text-tcm-muted hover:text-tcm-primary">
                ← 返回列表
              </button>
            </div>
          ) : (
            <div>
              <h2 className="text-lg font-serif font-bold text-tcm-dark mb-3">经络列表</h2>
              <div className="space-y-1.5">
                {meridians.map(m => (
                  <button
                    key={m.id}
                    onClick={() => setSelected(m)}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-tcm-bg/50 transition-colors flex items-center justify-between group"
                  >
                    <div>
                      <span className="font-medium text-tcm-dark group-hover:text-tcm-primary">{m.name}</span>
                      <span className="text-xs text-tcm-muted ml-2">{m.acupoints.length}穴</span>
                    </div>
                    <Badge variant="channel">{m.organ}</Badge>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
