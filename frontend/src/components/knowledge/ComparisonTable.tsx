import { Herb, Formula } from '../../types'
import Badge from '../ui/Badge'

interface ComparisonTableProps {
  items: (Herb | Formula)[];
  type: 'herb' | 'formula';
}

export default function ComparisonTable({ items, type }: ComparisonTableProps) {
  if (items.length < 2) return <p className="text-tcm-muted text-center py-8">请至少选择2个项目进行对比</p>

  if (type === 'herb') {
    const herbs = items as Herb[]
    const fields = [
      { label: '性味', key: 'taste' },
      { label: '药性', key: 'nature' },
      { label: '归经', key: 'channel_tropism' },
      { label: '功效', key: 'functions' },
      { label: '用量用法', key: 'usage_dosage' },
      { label: '注意事项', key: 'cautions' },
    ]
    return (
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-tcm-dark text-white">
              <th className="p-3 text-left font-serif border-r border-gray-600">属性</th>
              {herbs.map(h => (
                <th key={h.id} className="p-3 text-center font-serif min-w-[200px]">{h.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {fields.map((f, i) => (
              <tr key={f.key} className={i % 2 === 0 ? 'bg-white' : 'bg-tcm-bg/50'}>
                <td className="p-3 font-medium text-tcm-dark border-r border-gray-200 whitespace-nowrap">{f.label}</td>
                {herbs.map(h => (
                  <td key={h.id} className="p-3 text-sm text-gray-700">
                    {f.key === 'channel_tropism'
                      ? ((h as unknown as Record<string, string>)[f.key]).split('、').map((ch: string, j: number) => (
                          <Badge key={j} variant="channel">{ch}</Badge>
                        ))
                      : (h as unknown as Record<string, string>)[f.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  const formulas = items as Formula[]
  const fields = [
    { label: '出处', key: 'source' },
    { label: '功效', key: 'functions' },
    { label: '主治', key: 'indications' },
    { label: '方歌', key: 'mnemonic' },
  ]
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-tcm-dark text-white">
            <th className="p-3 text-left font-serif border-r border-gray-600">属性</th>
            {formulas.map(f => (
              <th key={f.id} className="p-3 text-center font-serif min-w-[200px]">{f.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {fields.map((f, i) => (
            <tr key={f.key} className={i % 2 === 0 ? 'bg-white' : 'bg-tcm-bg/50'}>
              <td className="p-3 font-medium text-tcm-dark border-r border-gray-200 whitespace-nowrap">{f.label}</td>
              {formulas.map(fm => (
                <td key={fm.id} className="p-3 text-sm text-gray-700">
                  {(fm as unknown as Record<string, string>)[f.key]}
                </td>
              ))}
            </tr>
          ))}
          <tr className="bg-white">
            <td className="p-3 font-medium text-tcm-dark border-r border-gray-200">组成</td>
            {formulas.map(fm => (
              <td key={fm.id} className="p-3 text-sm text-gray-700">
                {fm.composition.map(c => (
                  <div key={c.herb_id} className="mb-1">
                    <Badge variant={c.role === '君' ? 'primary' : c.role === '臣' ? 'nature' : c.role === '佐' ? 'accent' : 'taste'}>{c.role}</Badge>
                    {' '}{c.herb_name} {c.dosage}
                  </div>
                ))}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  )
}
