import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import HomePage from './pages/HomePage'
import HerbsPage from './pages/HerbsPage'
import HerbDetailPage from './pages/HerbDetailPage'
import FormulasPage from './pages/FormulasPage'
import FormulaDetailPage from './pages/FormulaDetailPage'
import MeridiansPage from './pages/MeridiansPage'
import DiseasesPage from './pages/DiseasesPage'
import DiseaseDetailPage from './pages/DiseaseDetailPage'
import MicrobesPage from './pages/MicrobesPage'
import ImmunologyPage from './pages/ImmunologyPage'
import ClinicalPage from './pages/ClinicalPage'
import ComparePage from './pages/ComparePage'
import ReviewPage from './pages/ReviewPage'
import NotesPage from './pages/NotesPage'
import QuizPage from './pages/QuizPage'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/herbs" element={<HerbsPage />} />
        <Route path="/herbs/:id" element={<HerbDetailPage />} />
        <Route path="/formulas" element={<FormulasPage />} />
        <Route path="/formulas/:id" element={<FormulaDetailPage />} />
        <Route path="/meridians" element={<MeridiansPage />} />
        <Route path="/diseases" element={<DiseasesPage />} />
        <Route path="/diseases/:id" element={<DiseaseDetailPage />} />
        <Route path="/microbes" element={<MicrobesPage />} />
        <Route path="/immunology" element={<ImmunologyPage />} />
        <Route path="/clinical" element={<ClinicalPage />} />
        <Route path="/notes" element={<NotesPage />} />
        <Route path="/compare" element={<ComparePage />} />
        <Route path="/review" element={<ReviewPage />} />
        <Route path="/quiz" element={<QuizPage />} />
      </Route>
    </Routes>
  )
}
