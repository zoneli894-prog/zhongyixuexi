import { Microbe } from '../../types'
import Badge from '../ui/Badge'

interface MicrobeCardProps {
  microbe: Microbe;
  onClick?: () => void;
}

const gramColors: Record<string, { bg: string; text: string; label: string }> = {
  '阳性': { bg: 'bg-purple-50', text: 'text-purple-700', label: 'G+' },
  '阴性': { bg: 'bg-cyan-50', text: 'text-cyan-700', label: 'G-' },
  '不适用': { bg: 'bg-gray-50', text: 'text-gray-600', label: 'N/A' },
}

export default function MicrobeCard({ microbe, onClick }: MicrobeCardProps) {
  const gc = gramColors[microbe.gram_stain]

  return (
    <div className="card cursor-pointer hover:border-blue-200" onClick={onClick}>
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-lg font-serif font-bold text-tcm-dark">{microbe.name}</h3>
          <p className="text-sm text-tcm-muted italic">{microbe.genus}</p>
        </div>
        <div className="flex gap-1.5">
          <span className={`badge ${gc.bg} ${gc.text}`}>{gc.label}</span>
          <Badge variant="nature">{microbe.shape}</Badge>
        </div>
      </div>

      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
        <span className="font-medium">致病机制：</span>{microbe.pathogenesis}
      </p>

      <div className="flex flex-wrap gap-1.5 mb-3">
        {microbe.clinical_diseases.slice(0, 3).map((d, i) => (
          <span key={i} className="badge bg-red-50 text-red-600 border border-red-200">{d}</span>
        ))}
        {microbe.clinical_diseases.length > 3 && (
          <span className="badge bg-gray-50 text-gray-500">+{microbe.clinical_diseases.length - 3}</span>
        )}
      </div>

      <div className="pt-3 border-t border-gray-100 text-xs text-tcm-muted">
        <span className="mr-4">传播：{microbe.transmission}</span>
      </div>
    </div>
  )
}
