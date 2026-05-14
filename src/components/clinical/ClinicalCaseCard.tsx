import { useState } from 'react'
import { ClinicalCase } from '../../types'

interface ClinicalCaseCardProps {
  caseData: ClinicalCase;
}

type Step = 'western_dx' | 'tcm_dx' | 'syndrome' | 'method' | 'formula'
const stepLabels: Record<Step, string> = {
  western_dx: '西医诊断',
  tcm_dx: '中医病名',
  syndrome: '证候',
  method: '治法',
  formula: '选方',
}

export default function ClinicalCaseCard({ caseData }: ClinicalCaseCardProps) {
  const [step, setStep] = useState<Step>('western_dx')
  const [answers, setAnswers] = useState<Record<Step, string>>({
    western_dx: '', tcm_dx: '', syndrome: '', method: '', formula: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)

  const steps: Step[] = ['western_dx', 'tcm_dx', 'syndrome', 'method', 'formula']
  const currentIdx = steps.indexOf(step)

  const correctAnswers: Record<Step, string> = {
    western_dx: caseData.correct_western_dx,
    tcm_dx: caseData.correct_tcm_dx,
    syndrome: caseData.correct_syndrome,
    method: caseData.correct_method,
    formula: caseData.correct_formula,
  }

  const handleAnswer = (value: string) => {
    setAnswers(prev => ({ ...prev, [step]: value }))
  }

  const nextStep = () => {
    if (currentIdx < steps.length - 1) {
      setStep(steps[currentIdx + 1])
    } else {
      setSubmitted(true)
    }
  }

  const isCorrect = (s: Step) => answers[s] === correctAnswers[s]

  return (
    <div className="card">
      <h3 className="text-xl font-serif font-bold text-tcm-dark mb-2">{caseData.title}</h3>

      {/* Chief complaint */}
      <div className="bg-blue-50 p-3 rounded-lg mb-4 border-l-4 border-blue-400">
        <p className="text-sm font-medium text-blue-800">主诉：</p>
        <p className="text-sm text-blue-700">{caseData.chief_complaint}</p>
      </div>

      {/* Present illness */}
      <div className="mb-4">
        <h4 className="font-serif font-bold text-tcm-dark mb-1">现病史</h4>
        <p className="text-sm text-gray-700 leading-relaxed">{caseData.present_illness}</p>
      </div>

      {/* Four examinations */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        {[
          { label: '望诊', content: caseData.four_examinations.inspection },
          { label: '闻诊', content: caseData.four_examinations.auscultation },
          { label: '问诊', content: caseData.four_examinations.inquiry },
          { label: '切诊', content: caseData.four_examinations.palpation },
        ].map(exam => (
          <div key={exam.label} className="bg-tcm-bg/50 p-3 rounded-lg">
            <span className="text-xs font-bold text-tcm-primary">{exam.label}</span>
            <p className="text-sm text-gray-700 mt-1">{exam.content}</p>
          </div>
        ))}
      </div>

      {/* Lab results */}
      {caseData.lab_results && (
        <div className="bg-gray-50 p-3 rounded-lg mb-4 border border-gray-200">
          <p className="text-xs font-bold text-gray-600 mb-1">实验室检查</p>
          <p className="text-sm text-gray-700 font-mono">{caseData.lab_results}</p>
        </div>
      )}

      {/* Diagnostic steps */}
      <div className="border-t border-gray-200 pt-4">
        <h4 className="font-serif font-bold text-tcm-dark mb-3">临床推理</h4>

        {/* Step indicators */}
        <div className="flex items-center gap-2 mb-4 overflow-x-auto">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <button
                onClick={() => !submitted && setStep(s)}
                disabled={submitted}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                  step === s
                    ? 'bg-tcm-primary text-white'
                    : submitted
                      ? isCorrect(s) ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      : 'bg-gray-100 text-gray-500'
                }`}
              >
                {stepLabels[s]}
              </button>
              {i < steps.length - 1 && <span className="text-gray-300">→</span>}
            </div>
          ))}
        </div>

        {/* Answer input */}
        {!submitted ? (
          <div>
            <label className="text-sm text-tcm-muted block mb-1">{stepLabels[step]}：</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={answers[step]}
                onChange={(e) => handleAnswer(e.target.value)}
                placeholder={`请输入${stepLabels[step]}...`}
                className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tcm-primary/30"
              />
              <button
                onClick={nextStep}
                disabled={!answers[step].trim()}
                className="btn-primary text-sm disabled:opacity-50"
              >
                {currentIdx < steps.length - 1 ? '下一步' : '提交'}
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {steps.map(s => (
              <div key={s} className={`p-3 rounded-lg ${isCorrect(s) ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm">{stepLabels[s]}</span>
                  <span className={`text-sm font-bold ${isCorrect(s) ? 'text-green-600' : 'text-red-600'}`}>
                    {isCorrect(s) ? '✓ 正确' : '✗ 错误'}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  你的答案：{answers[s] || '(未填)'}
                  {!isCorrect(s) && <span className="ml-2 text-green-700">正确答案：{correctAnswers[s]}</span>}
                </p>
              </div>
            ))}

            <button
              onClick={() => setShowExplanation(!showExplanation)}
              className="text-sm text-tcm-primary hover:underline"
            >
              {showExplanation ? '收起解析' : '查看解析'} ↓
            </button>

            {showExplanation && (
              <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                <h5 className="font-serif font-bold text-amber-800 mb-2">辨证分析</h5>
                <p className="text-sm text-amber-900 leading-relaxed">{caseData.explanation}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
