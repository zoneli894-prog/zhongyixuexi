import { Link } from 'react-router-dom'
import { Formula } from '../../types'
import Badge from '../ui/Badge'

interface FormulaCardProps {
  formula: Formula;
}

export default function FormulaCard({ formula }: FormulaCardProps) {
  return (
    <Link to={`/formulas/${formula.id}`} className="block card group">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-lg font-serif font-bold text-tcm-dark group-hover:text-tcm-primary transition-colors">
            {formula.name}
          </h3>
          <p className="text-sm text-tcm-muted">{formula.pinyin}</p>
        </div>
        <Badge variant="accent">{formula.source.replace(/[《》]/g, '')}</Badge>
      </div>
      <p className="text-sm text-gray-600 mb-2"><span className="font-medium">功效：</span>{formula.functions}</p>
      <p className="text-sm text-gray-600 line-clamp-2"><span className="font-medium">主治：</span>{formula.indications}</p>
      <div className="mt-3 pt-3 border-t border-gray-100">
        <span className="text-xs text-tcm-muted">组成：</span>
        <span className="text-sm text-tcm-dark">
          {formula.composition.map(c => `${c.herb_name}(${c.role})`).join('、')}
        </span>
      </div>
    </Link>
  )
}
