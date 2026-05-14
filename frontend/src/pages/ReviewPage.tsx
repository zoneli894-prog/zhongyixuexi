import { useState } from 'react'
import { reviewCards } from '../data/mockData'
import FlashCard from '../components/review/FlashCard'
import { ReviewQuality, ReviewCard } from '../types'

// Simple SM-2 simulation
function simulateSM2(card: ReviewCard, quality: ReviewQuality): ReviewCard {
  const qualityMap: Record<ReviewQuality, number> = { forgot: 1, hard: 2, normal: 3, easy: 5 }
  const q = qualityMap[quality]
  let ef = card.easiness_factor
  let interval = card.interval_days
  let reps = card.repetitions

  ef = Math.max(1.3, ef + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02)))

  if (q < 3) {
    reps = 0
    interval = 1
  } else {
    reps += 1
    if (reps === 1) interval = 1
    else if (reps === 2) interval = 6
    else interval = Math.round(interval * ef)
  }

  const next = new Date()
  next.setDate(next.getDate() + interval)

  return {
    ...card,
    easiness_factor: ef,
    interval_days: interval,
    repetitions: reps,
    next_review_date: next.toISOString().split('T')[0],
  }
}

export default function ReviewPage() {
  const [cards, setCards] = useState<ReviewCard[]>([...reviewCards])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [completed, setCompleted] = useState<ReviewCard[]>([])
  const [sessionDone, setSessionDone] = useState(false)

  const currentCard = cards[currentIndex]

  const handleRate = (quality: ReviewQuality) => {
    const updated = simulateSM2(currentCard, quality)
    setCompleted(prev => [...prev, updated])

    if (currentIndex + 1 >= cards.length) {
      setSessionDone(true)
    } else {
      setCurrentIndex(prev => prev + 1)
    }
  }

  const resetSession = () => {
    setCards([...reviewCards])
    setCurrentIndex(0)
    setCompleted([])
    setSessionDone(false)
  }

  if (sessionDone) {
    const avgInterval = completed.length > 0
      ? Math.round(completed.reduce((sum, c) => sum + c.interval_days, 0) / completed.length)
      : 0
    return (
      <div className="max-w-lg mx-auto text-center py-12">
        <p className="text-5xl mb-4">🎉</p>
        <h2 className="text-2xl font-serif font-bold text-tcm-dark mb-4">复习完成！</h2>
        <div className="card mb-6">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-3xl font-bold text-tcm-primary">{completed.length}</p>
              <p className="text-sm text-tcm-muted">已复习卡片</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-tcm-accent">{avgInterval}天</p>
              <p className="text-sm text-tcm-muted">平均间隔</p>
            </div>
          </div>
        </div>
        <p className="text-sm text-tcm-muted mb-4">
          下次复习时间已更新。坚持每日复习，知识牢牢记住！
        </p>
        <button onClick={resetSession} className="btn-primary">再次复习</button>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-serif font-bold text-tcm-dark">每日复习</h1>
          <p className="text-sm text-tcm-muted mt-1">
            第 {currentIndex + 1} / {cards.length} 张 · 已完成 {completed.length} 张
          </p>
        </div>
        {/* Progress bar */}
        <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-tcm-accent rounded-full transition-all"
            style={{ width: `${(completed.length / cards.length) * 100}%` }}
          />
        </div>
      </div>

      {currentCard && <FlashCard card={currentCard} onRate={handleRate} />}

      <div className="mt-8 text-center text-xs text-tcm-muted">
        <p>键盘快捷键：空格键翻转 · 1忘记 2困难 3一般 4简单</p>
      </div>
    </div>
  )
}
