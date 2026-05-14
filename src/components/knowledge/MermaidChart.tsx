import { useEffect, useRef, useState } from 'react'
import mermaid from 'mermaid'

mermaid.initialize({
  startOnLoad: false,
  theme: 'base',
  themeVariables: {
    primaryColor: '#F5F5DC',
    primaryTextColor: '#2C3E50',
    primaryBorderColor: '#4A90D9',
    lineColor: '#4A90D9',
    secondaryColor: '#E8F4FD',
    tertiaryColor: '#F0F8FF',
    fontFamily: 'Noto Sans SC, sans-serif',
  },
})

interface MermaidChartProps {
  chart: string;
  id?: string;
}

export default function MermaidChart({ chart, id = 'mermaid' }: MermaidChartProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [svg, setSvg] = useState<string>('')

  useEffect(() => {
    const renderChart = async () => {
      try {
        const { svg } = await mermaid.render(`${id}-${Date.now()}`, chart)
        setSvg(svg)
      } catch (e) {
        setSvg(`<p style="color:red">Mermaid 渲染错误</p>`)
      }
    }
    renderChart()
  }, [chart, id])

  return (
    <div
      ref={ref}
      className="w-full overflow-x-auto flex justify-center"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  )
}
