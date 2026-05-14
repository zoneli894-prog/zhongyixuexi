import ReactECharts from 'echarts-for-react'
import { Disease, Syndrome, Formula, Herb } from '../../types'

interface PathwayGraphProps {
  disease: Disease;
  syndromes: Syndrome[];
  formulas: Formula[];
  herbs: Herb[];
  onNodeClick?: (type: string, id: number) => void;
}

const typeColors: Record<string, string> = {
  disease: '#B22222',
  syndrome: '#DAA520',
  method: '#6B8E23',
  formula: '#2C3E50',
  herb: '#8B4513',
}

const typeLabels: Record<string, string> = {
  disease: '病',
  syndrome: '证',
  method: '法',
  formula: '方',
  herb: '药',
}

export default function PathwayGraph({ disease, syndromes, formulas, herbs, onNodeClick }: PathwayGraphProps) {
  // Build nodes and links
  const nodes: { name: string; category: number; symbolSize: number }[] = []
  const links: { source: string; target: string }[] = []
  const categories = [
    { name: '疾病' },
    { name: '证候' },
    { name: '方剂' },
    { name: '中药' },
  ]

  // Disease node
  nodes.push({ name: disease.name, category: 0, symbolSize: 60 })
  nodes.push({ name: disease.western_name, category: 0, symbolSize: 45 })
  links.push({ source: disease.name, target: disease.western_name })

  // Syndromes
  const relatedSyndromes = syndromes.filter(s => disease.syndrome_ids.includes(s.id))
  relatedSyndromes.forEach(syn => {
    nodes.push({ name: syn.name, category: 1, symbolSize: 50 })
    links.push({ source: disease.name, target: syn.name })

    // Treatment method → formula
    if (syn.treatment_method) {
      const method = syn.treatment_method
      nodes.push({ name: method, category: 1, symbolSize: 35 })
      links.push({ source: syn.name, target: method })

      // Formulas
      if (syn.formula_ids) {
        syn.formula_ids.forEach(fid => {
          const formula = formulas.find(f => f.id === fid)
          if (formula) {
            nodes.push({ name: formula.name, category: 2, symbolSize: 45 })
            links.push({ source: method, target: formula.name })

            // Herbs
            formula.composition.forEach(comp => {
              nodes.push({ name: comp.herb_name, category: 3, symbolSize: 30 })
              links.push({ source: formula.name, target: comp.herb_name })
            })
          }
        })
      }
    }
  })

  // Remove duplicate nodes
  const seen = new Set<string>()
  const uniqueNodes = nodes.filter(n => {
    if (seen.has(n.name)) return false
    seen.add(n.name)
    return true
  })

  const option = {
    tooltip: {
      trigger: 'item',
      formatter: (params: { data: { name: string } }) => params.data.name,
    },
    legend: {
      data: categories.map(c => c.name),
      bottom: 0,
      textStyle: { fontFamily: 'Noto Sans SC' },
    },
    series: [{
      type: 'graph',
      layout: 'force',
      roam: true,
      draggable: true,
      label: {
        show: true,
        position: 'bottom',
        formatter: '{b}',
        fontSize: 12,
        fontFamily: 'Noto Serif SC',
        color: '#2C3E50',
      },
      force: {
        repulsion: 300,
        edgeLength: [80, 200],
        gravity: 0.1,
      },
      data: uniqueNodes.map(n => ({
        ...n,
        category: n.category,
        itemStyle: {
          color: categories[n.category] ? typeColors[['disease', 'syndrome', 'formula', 'herb'][n.category]] : '#999',
        },
      })),
      links: links,
      categories: categories,
      lineStyle: {
        color: '#aaa',
        curveness: 0.1,
        width: 1.5,
      },
      emphasis: {
        focus: 'adjacency',
        lineStyle: { width: 3 },
      },
    }],
  }

  return (
    <div className="w-full">
      <ReactECharts option={option} style={{ height: 500 }} />
      <div className="flex justify-center gap-4 mt-2 flex-wrap">
        {categories.map((c, i) => (
          <div key={c.name} className="flex items-center gap-1.5 text-sm">
            <span className="w-3 h-3 rounded-full inline-block" style={{ backgroundColor: typeColors[['disease', 'syndrome', 'formula', 'herb'][i]] }} />
            <span className="text-tcm-dark">{c.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
