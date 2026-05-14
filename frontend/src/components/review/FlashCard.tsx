import { useState, useEffect, useCallback } from 'react'
import { ReviewCard, ReviewQuality } from '../../types'

interface FlashCardProps {
  card: ReviewCard;
  onRate: (quality: ReviewQuality) => void;
}

const ratings: { quality: ReviewQuality; label: string; color: string; key: string }[] = [
  { quality: 'forgot', label: '忘记', color: 'bg-red-500 hover:bg-red-600', key: '1' },
  { quality: 'hard', label: '困难', color: 'bg-orange-500 hover:bg-orange-600', key: '2' },
  { quality: 'normal', label: '一般', color: 'bg-blue-500 hover:bg-blue-600', key: '3' },
  { quality: 'easy', label: '简单', color: 'bg-green-500 hover:bg-green-600', key: '4' },
]

export default function FlashCard({ card, onRate }: FlashCardProps) {
  const [flipped, setFlipped] = useState(false)

  useEffect(() => {
    setFlipped(false)
  }, [card.id])

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const rating = ratings.find(r => r.key === e.key)
    if (rating && flipped) {
      onRate(rating.quality)
    } else if (e.key === ' ' || e.key === 'Enter') {
      setFlipped(f => !f)
    }
  }, [flipped, onRate])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  return (
    <div className="max-w-lg mx-auto">
      <div
        className="flip-card cursor-pointer"
        style={{ minHeight: 280 }}
        onClick={() => !flipped && setFlipped(true)}
      >
        <div className={`flip-card-inner relative w-full ${flipped ? 'flipped' : ''}`} style={{ minHeight: 280 }}>
          {/* Front */}
          <div className="flip-card-front absolute inset-0 bg-tcm-surface rounded-xl shadow-lg border-2 border-tcm-primary/20 flex flex-col items-center justify-center p-8">
            <span className="text-xs text-tcm-muted mb-2 uppercase tracking-wider">
              {card.card_type === 'herb' ? '中药' : '方剂'}
            </span>
            <h2 className="text-4xl font-serif font-bold text-tcm-dark mb-2">{card.name}</h2>
            <p className="text-lg text-tcm-muted">{card.pinyin}</p>
            <p className="mt-6 text-sm text-gray-400">点击翻转查看答案</p>
          </div>

          {/* Back */}
          <div className="flip-card-back absolute inset-0 bg-tcm-surface rounded-xl shadow-lg border-2 border-tcm-accent/20 flex flex-col items-center justify-center p-8 overflow-y-auto">
            <h2 className="text-2xl font-serif font-bold text-tcm-dark mb-4">{card.name}</h2>
            <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line text-center">
              {card.details}
            </div>
          </div>
        </div>
      </div>

      {/* Rating buttons */}
      {flipped && (
        <div className="mt-6 grid grid-cols-4 gap-3">
          {ratings.map(r => (
            <button
              key={r.quality}
              onClick={() => onRate(r.quality)}
              className={`${r.color} text-white py-3 px-4 rounded-lg font-medium text-sm transition-all shadow hover:shadow-md`}
            >
              {r.label}
              <span className="block text-xs opacity-75 mt-0.5">按 {r.key}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
