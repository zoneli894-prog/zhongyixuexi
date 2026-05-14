import { Link } from 'react-router-dom'
import { Herb } from '../../types'
import Badge from '../ui/Badge'

interface HerbCardProps {
  herb: Herb;
}

export default function HerbCard({ herb }: HerbCardProps) {
  return (
    <Link to={`/herbs/${herb.id}`} className="block card group">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-lg font-serif font-bold text-tcm-dark group-hover:text-tcm-primary transition-colors">
            {herb.name}
          </h3>
          <p className="text-sm text-tcm-muted">{herb.pinyin}</p>
        </div>
        <Badge variant="nature">{herb.nature}</Badge>
      </div>
      <div className="flex flex-wrap gap-1.5 mb-3">
        {herb.taste.split('、').map((t, i) => (
          <Badge key={i} variant="taste">{t}</Badge>
        ))}
      </div>
      <p className="text-sm text-gray-600 line-clamp-2">{herb.functions}</p>
      <div className="mt-3 pt-3 border-t border-gray-100">
        <span className="text-xs text-tcm-muted">归经：</span>
        {herb.channel_tropism.split('、').map((ch, i) => (
          <Badge key={i} variant="channel">{ch}</Badge>
        )).reduce((prev, curr, i) => i === 0 ? [curr] : [...prev, <span key={`s${i}`} className="text-gray-300"> </span>, curr], [] as React.ReactNode[])}
      </div>
    </Link>
  )
}
