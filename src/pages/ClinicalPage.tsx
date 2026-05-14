import { useState, useEffect } from 'react'
import { ClinicalCase } from '../types'
import { fetchClinicalCases } from '../services/api'
import ClinicalCaseCard from '../components/clinical/ClinicalCaseCard'

export default function ClinicalPage() {
  const [cases, setCases] = useState<ClinicalCase[]>([])
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchClinicalCases().then(data => { setCases(data); setLoading(false) }).catch(() => setLoading(false))
  }, [])

  if (loading) return <div className="text-center py-16 text-tcm-muted">加载中...</div>

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-serif font-bold text-tcm-dark">临床模拟训练</h1>
        <p className="text-sm text-tcm-muted mt-1">基于规则的病案推演测试 · 展示四诊信息，逐步完成诊断链</p>
      </div>

      {selectedIdx !== null ? (
        <div>
          <button onClick={() => setSelectedIdx(null)} className="text-sm text-tcm-muted hover:text-tcm-primary mb-4 inline-flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            返回病例列表
          </button>
          <ClinicalCaseCard caseData={cases[selectedIdx]} />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {cases.map((c, i) => (
            <button
              key={c.id}
              onClick={() => setSelectedIdx(i)}
              className="card text-left hover:border-tcm-primary"
            >
              <h3 className="font-serif font-bold text-tcm-dark mb-2">{c.title}</h3>
              <p className="text-sm text-gray-600 line-clamp-2 mb-3">{c.chief_complaint}</p>
              <div className="flex gap-2">
                <span className="badge bg-blue-50 text-blue-600 border border-blue-200">{c.correct_western_dx}</span>
                <span className="badge bg-red-50 text-tcm-primary border border-red-200">{c.correct_syndrome}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
