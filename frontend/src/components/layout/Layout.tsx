import { useState, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Header from './Header'
import GlobalSearchModal from '../notes/GlobalSearchModal'
import { loadNotes, seedSampleNotes } from '../../data/noteStorage'

export default function Layout() {
  const [searchOpen, setSearchOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    seedSampleNotes()
  }, [])

  // Global Ctrl+K shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen(true)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const notes = loadNotes()

  return (
    <div className="min-h-screen flex flex-col">
      <Header onSearchOpen={() => setSearchOpen(true)} />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Outlet />
      </main>
      <footer className="bg-tcm-dark text-gray-300 text-center py-4 text-sm">
        李蕊杉的中医学习平台 &copy; {new Date().getFullYear()} — 传承岐黄智慧
      </footer>
      <GlobalSearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        notes={notes}
        onSelectNote={(id) => { navigate(`/notes`); setSearchOpen(false); }}
      />
    </div>
  )
}
