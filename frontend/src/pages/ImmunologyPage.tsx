import { useState } from 'react'
import { immunePathways } from '../data/westernData'
import MermaidChart from '../components/knowledge/MermaidChart'

export default function ImmunologyPage() {
  const [selected, setSelected] = useState(immunePathways[0])

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-serif font-bold text-tcm-dark">免疫学通路图谱</h1>
        <p className="text-sm text-tcm-muted mt-1">免疫反应通路可视化 · 点击切换不同通路</p>
      </div>

      {/* Pathway selector */}
      <div className="flex gap-3 mb-6">
        {immunePathways.map(p => (
          <button
            key={p.id}
            onClick={() => setSelected(p)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selected.id === p.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-blue-600'
            }`}
          >
            {p.name}
          </button>
        ))}
      </div>

      {/* Mermaid chart */}
      <div className="card">
        <h2 className="text-xl font-serif font-bold text-tcm-dark mb-4">{selected.name}</h2>
        <MermaidChart chart={selected.mermaid} id={selected.id} />
      </div>
    </div>
  )
}
