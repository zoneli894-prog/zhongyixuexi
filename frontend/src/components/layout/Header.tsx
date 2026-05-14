import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'

const navGroups = [
  {
    label: '中医',
    items: [
      { path: '/herbs', label: '中药', icon: '🌿' },
      { path: '/formulas', label: '方剂', icon: '📜' },
      { path: '/meridians', label: '经络', icon: '🦶' },
      { path: '/diseases', label: '疾病', icon: '🏥' },
    ],
  },
  {
    label: '西医',
    items: [
      { path: '/microbes', label: '微生物', icon: '🦠' },
      { path: '/immunology', label: '免疫', icon: '🔬' },
    ],
  },
  {
    label: '综合',
    items: [
      { path: '/notes', label: '笔记', icon: '📝' },
      { path: '/clinical', label: '临床', icon: '🩺' },
      { path: '/compare', label: '对比', icon: '⚖️' },
      { path: '/review', label: '复习', icon: '🔄' },
      { path: '/quiz', label: '测验', icon: '✏️' },
    ],
  },
]

export default function Header({ onSearchOpen }: { onSearchOpen?: () => void }) {
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="bg-tcm-dark text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3">
            <span className="text-2xl">☯</span>
            <h1 className="text-xl font-serif font-bold tracking-wide hidden sm:block">李蕊杉的中医学习平台</h1>
            <h1 className="text-lg font-serif font-bold tracking-wide sm:hidden">中医学习</h1>
          </Link>

          {/* Search button */}
          {onSearchOpen && (
            <button
              onClick={onSearchOpen}
              className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-md bg-gray-700/50 text-gray-400 text-sm hover:bg-gray-700 hover:text-white transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span>搜索</span>
              <kbd className="px-1.5 py-0.5 rounded bg-gray-600 text-xs">Ctrl+K</kbd>
            </button>
          )}

          {/* Desktop nav with groups */}
          <nav className="hidden md:flex items-center gap-1">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname === '/' ? 'bg-tcm-primary text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              <span className="mr-1">🏠</span>首页
            </Link>
            {navGroups.map((group, gi) => (
              <div key={group.label} className="flex items-center">
                <span className="mx-1 text-gray-600 text-xs">|</span>
                {group.items.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`px-2.5 py-2 rounded-md text-sm font-medium transition-colors ${
                      location.pathname === item.path || location.pathname.startsWith(item.path + '/')
                        ? 'bg-tcm-primary text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    <span className="mr-0.5">{item.icon}</span>
                    {item.label}
                  </Link>
                ))}
              </div>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-gray-700"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <nav className="md:hidden pb-3">
            <Link
              to="/"
              onClick={() => setMobileOpen(false)}
              className={`block px-3 py-2 rounded-md text-sm font-medium mb-2 ${
                location.pathname === '/' ? 'bg-tcm-primary text-white' : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              <span className="mr-2">🏠</span>首页
            </Link>
            {navGroups.map((group) => (
              <div key={group.label} className="mb-2">
                <p className="px-3 text-xs text-gray-500 uppercase tracking-wider mb-1">{group.label}</p>
                {group.items.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                    className={`block px-3 py-2 rounded-md text-sm font-medium ${
                      location.pathname === item.path
                        ? 'bg-tcm-primary text-white'
                        : 'text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    <span className="mr-2">{item.icon}</span>
                    {item.label}
                  </Link>
                ))}
              </div>
            ))}
          </nav>
        )}
      </div>
    </header>
  )
}
