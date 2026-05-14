import { useState } from 'react'

interface QuizBlankProps {
  mnemonic: string;
  blankPositions: number[];
  blankAnswers: string[];
  onSubmit: (answers: Record<number, string>) => void;
}

export default function QuizBlank({ mnemonic, blankPositions, blankAnswers, onSubmit }: QuizBlankProps) {
  const [inputs, setInputs] = useState<Record<number, string>>({})
  const [submitted, setSubmitted] = useState(false)

  const chars = mnemonic.split('')

  const handleChange = (pos: number, value: string) => {
    setInputs(prev => ({ ...prev, [pos]: value }))
  }

  const handleSubmit = () => {
    setSubmitted(true)
    onSubmit(inputs)
  }

  const allFilled = blankPositions.every(pos => inputs[pos]?.trim())

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-tcm-surface rounded-xl shadow-lg border border-gray-100 p-6">
        <h3 className="text-lg font-serif font-bold text-tcm-dark mb-4">方歌填空</h3>
        <div className="text-xl leading-loose font-serif tracking-wider text-center">
          {chars.map((char, i) => {
            const blankIdx = blankPositions.indexOf(i)
            if (blankIdx !== -1) {
              const expected = blankAnswers[blankIdx]
              const userAnswer = inputs[i] || ''
              let borderColor = 'border-gray-300'
              if (submitted) {
                borderColor = userAnswer === expected ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'
              }
              return (
                <span key={i} className="inline-block mx-0.5">
                  <input
                    type="text"
                    value={userAnswer}
                    onChange={(e) => handleChange(i, e.target.value)}
                    disabled={submitted}
                    maxLength={1}
                    className={`w-10 h-10 text-center text-xl border-2 rounded ${borderColor}
                      focus:outline-none focus:ring-2 focus:ring-tcm-primary/30 focus:border-tcm-primary`}
                  />
                </span>
              )
            }
            return <span key={i}>{char}</span>
          })}
        </div>

        {submitted && (
          <div className="mt-4 text-center">
            {blankPositions.every((pos, i) => inputs[pos] === blankAnswers[i]) ? (
              <p className="text-green-600 font-medium">全部正确！</p>
            ) : (
              <p className="text-red-600 font-medium">
                有错误。正确答案：
                {blankPositions.map((pos, i) => inputs[pos] !== blankAnswers[i] ? (
                  <span key={i} className="ml-2 inline-block bg-green-100 text-green-800 px-2 py-0.5 rounded">
                    第{pos + 1}字：{blankAnswers[i]}
                  </span>
                ) : null)}
              </p>
            )}
          </div>
        )}

        {!submitted && (
          <div className="mt-6 text-center">
            <button
              onClick={handleSubmit}
              disabled={!allFilled}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              提交答案
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
