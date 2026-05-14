import { useState, useEffect } from 'react'
import { Formula } from '../types'
import { fetchFormulas } from '../services/api'
import QuizBlank from '../components/review/QuizBlank'

function generateBlanks(mnemonic: string): { positions: number[]; answers: string[] } {
  const chars = mnemonic.split('')
  const candidates: number[] = []
  chars.forEach((c, i) => {
    if (c !== '，' && c !== '。' && c !== '、' && c !== ' ' && c !== '\n') {
      candidates.push(i)
    }
  })
  const shuffled = candidates.sort(() => Math.random() - 0.5)
  const positions = shuffled.slice(0, 3).sort((a, b) => a - b)
  const answers = positions.map(p => chars[p])
  return { positions, answers }
}

export default function QuizPage() {
  const [formulas, setFormulas] = useState<Formula[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedFormulaId, setSelectedFormulaId] = useState<number | null>(null)
  const [blanks, setBlanks] = useState<{ positions: number[]; answers: string[] } | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(0)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    fetchFormulas().then(data => { setFormulas(data); setLoading(false) }).catch(() => setLoading(false))
  }, [])

  const selectedFormula = formulas.find(f => f.id === selectedFormulaId)

  const startQuiz = (formulaId: number) => {
    const formula = formulas.find(f => f.id === formulaId)!
    setBlanks(generateBlanks(formula.mnemonic))
    setSelectedFormulaId(formulaId)
    setSubmitted(false)
  }

  const handleSubmit = (answers: Record<number, string>) => {
    if (!blanks) return
    const correct = blanks.positions.filter((pos, i) => answers[pos] === blanks.answers[i]).length
    setScore(prev => prev + correct)
    setTotal(prev => prev + blanks.answers.length)
    setSubmitted(true)
  }

  const nextQuiz = () => {
    const nextId = selectedFormulaId! < formulas.length ? selectedFormulaId! + 1 : 1
    startQuiz(nextId)
  }

  if (loading) return <div className="text-center py-16 text-tcm-muted">加载中...</div>

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-serif font-bold text-tcm-dark">方歌测验</h1>
        <p className="text-sm text-tcm-muted mt-1">方歌挖空练习，填入正确汉字</p>
        {total > 0 && (
          <p className="text-sm text-tcm-accent mt-1">累计得分：{score}/{total}</p>
        )}
      </div>

      {!selectedFormula ? (
        <div>
          <h3 className="font-serif font-bold text-tcm-dark mb-3">选择方剂开始测验</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {formulas.map(f => (
              <button
                key={f.id}
                onClick={() => startQuiz(f.id)}
                className="card text-left hover:border-tcm-primary"
              >
                <h4 className="font-serif font-bold text-tcm-dark">{f.name}</h4>
                <p className="text-xs text-tcm-muted mt-1">{f.source}</p>
                <p className="text-sm text-gray-600 mt-2 line-clamp-2">{f.mnemonic}</p>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="font-serif font-bold text-tcm-dark">{selectedFormula.name}</span>
              <span className="text-sm text-tcm-muted ml-2">{selectedFormula.source}</span>
            </div>
            <button onClick={() => { setSelectedFormulaId(null); setBlanks(null); }} className="text-sm text-tcm-muted hover:text-tcm-primary">
              ← 返回列表
            </button>
          </div>

          {blanks && (
            <QuizBlank
              mnemonic={selectedFormula.mnemonic}
              blankPositions={blanks.positions}
              blankAnswers={blanks.answers}
              onSubmit={handleSubmit}
            />
          )}

          {submitted && (
            <div className="mt-6 text-center">
              <button onClick={nextQuiz} className="btn-accent">
                下一题 →
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
