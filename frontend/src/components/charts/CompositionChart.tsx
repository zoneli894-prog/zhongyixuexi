import ReactECharts from 'echarts-for-react'
import { FormulaComposition } from '../../types'

interface CompositionChartProps {
  composition: FormulaComposition[];
}

const roleColors: Record<string, string> = {
  '君': '#B22222',
  '臣': '#2C3E50',
  '佐': '#6B8E23',
  '使': '#DAA520',
}

export default function CompositionChart({ composition }: CompositionChartProps) {
  const roles = ['君', '臣', '佐', '使']
  const series = roles.map(role => {
    const items = composition.filter(c => c.role === role)
    return {
      name: role,
      type: 'bar',
      stack: 'total',
      data: items.map(c => ({
        value: parseFloat(c.dosage) || 5,
        itemStyle: { color: roleColors[role] },
      })),
      label: {
        show: true,
        formatter: (params: { dataIndex: number }) => {
          const herbItems = composition.filter(c => c.role === role)
          return herbItems[params.dataIndex]?.herb_name || ''
        },
        color: '#fff',
        fontSize: 12,
      },
    }
  })

  const option = {
    tooltip: {
      trigger: 'item',
      formatter: (params: { seriesName: string; dataIndex: number; value: number }) => {
        const items = composition.filter(c => c.role === params.seriesName)
        const herb = items[params.dataIndex]
        return herb ? `<b>${herb.herb_name}</b><br/>${herb.role}药 · ${herb.dosage}` : ''
      },
    },
    legend: {
      data: roles.map(r => `${r}药`),
      bottom: 0,
      textStyle: { fontFamily: 'Noto Sans SC' },
    },
    grid: {
      left: '3%',
      right: '4%',
      top: '10%',
      bottom: '15%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: ['组成'],
      axisLabel: { fontFamily: 'Noto Sans SC' },
    },
    yAxis: {
      type: 'value',
      name: '剂量 (g)',
      axisLabel: { fontFamily: 'Noto Sans SC' },
    },
    series: series.map((s, i) => ({
      ...s,
      name: `${roles[i]}药`,
      barWidth: '50%',
    })),
  }

  return (
    <div className="w-full">
      <ReactECharts option={option} style={{ height: 300 }} />
      <div className="flex justify-center gap-4 mt-2">
        {roles.map(role => (
          <div key={role} className="flex items-center gap-1.5 text-sm">
            <span className="w-3 h-3 rounded-sm inline-block" style={{ backgroundColor: roleColors[role] }} />
            <span className="text-tcm-dark">{role}药</span>
          </div>
        ))}
      </div>
    </div>
  )
}
