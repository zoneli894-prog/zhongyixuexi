import { useState } from 'react'
import { Meridian, Acupoint } from '../../types'

interface MeridianMapProps {
  meridians: Meridian[];
  onSelect: (meridian: Meridian | null) => void;
}

const meridianColors = [
  '#B22222', '#2C3E50', '#6B8E23', '#DAA520', '#8B4513',
  '#4169E1', '#228B22', '#9932CC', '#FF6347', '#20B2AA',
  '#FF8C00', '#556B2F', '#DC143C', '#191970',
]

// Simplified body outline + meridian path positions
const bodyPaths = [
  // Left arm (Lung - Taiyin)
  { meridianId: 1, d: 'M 200 180 Q 170 200 150 260 Q 140 290 130 320' },
  // Right arm (Large Intestine - Yangming)
  { meridianId: 2, d: 'M 300 180 Q 330 200 350 260 Q 360 290 370 320' },
  // Right leg front (Stomach - Yangming)
  { meridianId: 3, d: 'M 270 340 Q 280 400 280 480 Q 278 520 275 560' },
  // Left leg inner (Spleen - Taiyin)
  { meridianId: 4, d: 'M 240 340 Q 235 400 232 480 Q 230 520 228 560' },
  // Left arm inner (Heart - Shaoyin)
  { meridianId: 5, d: 'M 210 185 Q 190 210 175 265 Q 165 295 155 325' },
  // Right arm outer (Small Intestine - Taiyang)
  { meridianId: 6, d: 'M 295 185 Q 315 210 330 265 Q 340 295 350 325' },
  // Back (Bladder - Taiyang)
  { meridianId: 7, d: 'M 250 170 Q 248 250 250 340 Q 252 420 250 480 Q 248 520 245 560' },
  // Left leg inner back (Kidney - Shaoyin)
  { meridianId: 8, d: 'M 245 345 Q 242 400 240 480 Q 238 520 236 560' },
  // Left arm center (Pericardium - Jueyin)
  { meridianId: 9, d: 'M 205 190 Q 185 215 170 270 Q 162 300 152 330' },
  // Right arm outer back (San Jiao - Shaoyang)
  { meridianId: 10, d: 'M 300 188 Q 320 215 335 270 Q 345 300 355 330' },
  // Right leg side (Gallbladder - Shaoyang)
  { meridianId: 11, d: 'M 275 345 Q 285 400 290 480 Q 292 520 290 560' },
  // Left leg inner side (Liver - Jueyin)
  { meridianId: 12, d: 'M 238 345 Q 232 400 228 480 Q 226 520 225 560' },
  // Ren Mai (front center)
  { meridianId: 13, d: 'M 250 160 Q 250 220 250 280 Q 250 340 250 400 Q 250 460 250 520' },
  // Du Mai (back center)
  { meridianId: 14, d: 'M 250 130 Q 250 155 250 175 Q 250 250 250 340 Q 250 420 250 480' },
]

export default function MeridianMap({ meridians, onSelect }: MeridianMapProps) {
  const [hovered, setHovered] = useState<number | null>(null)
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 })
  const [showAcupoints, setShowAcupoints] = useState<Acupoint[] | null>(null)

  const handleHover = (meridianId: number, e: React.MouseEvent) => {
    setHovered(meridianId)
    setTooltipPos({ x: e.clientX, y: e.clientY })
  }

  const handleClick = (meridian: Meridian) => {
    setShowAcupoints(showAcupoints === null ? meridian.acupoints : null)
    onSelect(meridian)
  }

  const hoveredMeridian = meridians.find(m => m.id === hovered)

  return (
    <div className="relative">
      <svg viewBox="80 80 340 520" className="w-full max-w-lg mx-auto" style={{ maxHeight: '70vh' }}>
        {/* Body outline */}
        <ellipse cx="250" cy="140" rx="35" ry="40" fill="none" stroke="#ccc" strokeWidth="1.5" />
        <line x1="250" y1="180" x2="250" y2="340" stroke="#ccc" strokeWidth="1.5" />
        <line x1="250" y1="200" x2="190" y2="310" stroke="#ccc" strokeWidth="1.5" />
        <line x1="250" y1="200" x2="310" y2="310" stroke="#ccc" strokeWidth="1.5" />
        <line x1="250" y1="340" x2="230" y2="560" stroke="#ccc" strokeWidth="1.5" />
        <line x1="250" y1="340" x2="270" y2="560" stroke="#ccc" strokeWidth="1.5" />

        {/* Meridian paths */}
        {bodyPaths.map((p, i) => {
          const meridian = meridians.find(m => m.id === p.meridianId)
          const color = meridianColors[i]
          const isHovered = hovered === p.meridianId
          return (
            <g key={p.meridianId}>
              <path
                d={p.d}
                fill="none"
                stroke={color}
                strokeWidth={isHovered ? 4 : 2.5}
                strokeLinecap="round"
                opacity={isHovered ? 1 : (hovered ? 0.3 : 0.7)}
                className="cursor-pointer transition-all duration-200"
                onMouseEnter={(e) => handleHover(p.meridianId, e)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => meridian && handleClick(meridian)}
              />
              {/* Start point */}
              <circle
                cx={parseFloat(p.d.split(' ')[1])}
                cy={parseFloat(p.d.split(' ')[2])}
                r={isHovered ? 5 : 3}
                fill={color}
                className="cursor-pointer transition-all"
              />
            </g>
          )
        })}

        {/* Legend */}
        <text x="90" y="580" fontSize="10" fill="#8B7D6B">悬停查看经络，点击查看穴位</text>
      </svg>

      {/* Tooltip */}
      {hoveredMeridian && (
        <div
          className="fixed z-50 bg-tcm-dark text-white px-4 py-2.5 rounded-lg shadow-xl text-sm pointer-events-none max-w-xs"
          style={{ left: tooltipPos.x + 12, top: tooltipPos.y - 40 }}
        >
          <p className="font-serif font-bold">{hoveredMeridian.name}</p>
          <p className="text-gray-300 text-xs mt-1">{hoveredMeridian.pinyin}</p>
          <p className="text-gray-300 text-xs">属{hoveredMeridian.organ}经 · {hoveredMeridian.acupoints.length}个穴位</p>
        </div>
      )}

      {/* Acupoints panel */}
      {showAcupoints && (
        <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200">
          <h4 className="font-serif font-bold text-tcm-dark mb-2">穴位列表</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {showAcupoints.map((ap, i) => (
              <div key={i} className="flex items-start gap-2 text-sm">
                <span className="font-medium text-tcm-primary">{ap.name}</span>
                <span className="text-tcm-muted">({ap.pinyin})</span>
                <span className="text-gray-500">{ap.location}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
