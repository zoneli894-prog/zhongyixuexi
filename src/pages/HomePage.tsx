import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { reviewCards } from '../data/mockData'
import { immunologyReviewCards, microbeReviewCards, immunePathways } from '../data/westernData'
import { fetchHerbs, fetchFormulas, fetchDiseases, fetchMicrobes, fetchMeridians, fetchClinicalCases } from '../services/api'

export default function HomePage() {
  const [counts, setCounts] = useState({ herbs: 0, formulas: 0, meridians: 0, diseases: 0, microbes: 0, clinical: 0 })

  useEffect(() => {
    Promise.all([
      fetchHerbs(), fetchFormulas(), fetchMeridians(), fetchDiseases(), fetchMicrobes(), fetchClinicalCases()
    ]).then(([herbs, formulas, meridians, diseases, microbes, clinical]) => {
      setCounts({
        herbs: herbs.length,
        formulas: formulas.length,
        meridians: meridians.length,
        diseases: diseases.length,
        microbes: microbes.length,
        clinical: clinical.length,
      })
    }).catch(() => {})
  }, [])

  const reviewCount = reviewCards.length + immunologyReviewCards.length + microbeReviewCards.length

  const tcmFeatures = [
    { icon: '🌿', title: '中药知识库', desc: '常用中药，性味归经、功效主治一目了然', link: '/herbs', count: counts.herbs },
    { icon: '📜', title: '方剂宝典', desc: '经典名方，君臣佐使配伍关系清晰展示', link: '/formulas', count: counts.formulas },
    { icon: '🦶', title: '经络图谱', desc: '十四经脉交互式图谱，点击穴位查看详情', link: '/meridians', count: counts.meridians },
    { icon: '🏥', title: '疾病证候', desc: '中医病证与西医疾病对照，病→证→法→方→药链路', link: '/diseases', count: counts.diseases },
  ]

  const westernFeatures = [
    { icon: '🦠', title: '微生物档案', desc: '常见病原微生物档案卡，革兰氏染色、致病机制', link: '/microbes', count: counts.microbes },
    { icon: '🔬', title: '免疫通路', desc: '免疫反应通路可视化，T细胞分化、补体系统', link: '/immunology', count: immunePathways.length },
  ]

  const examFeatures = [
    { icon: '🩺', title: '临床模拟', desc: '基于规则的病案推演，四诊→诊断→选方', link: '/clinical', count: counts.clinical },
    { icon: '⚖️', title: '对比学习', desc: '中药、方剂横向对比，加深理解记忆', link: '/compare', count: 0 },
    { icon: '🔄', title: '间隔复习', desc: 'SM-2科学记忆算法，中西医知识点全覆盖', link: '/review', count: reviewCount },
    { icon: '✏️', title: '方歌测验', desc: '方歌挖空练习，强化方剂歌诀记忆', link: '/quiz', count: counts.formulas },
  ]

  return (
    <div>
      {/* Hero */}
      <section className="text-center py-12 mb-8">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-tcm-dark mb-4">
          李蕊杉的中医学习平台
        </h1>
        <p className="text-xl text-tcm-muted font-serif mb-2">Li Ruishan's Integrative Medicine Learning Platform</p>
        <p className="text-gray-600 max-w-2xl mx-auto">
          中西医深度整合，将中医（中药、方剂、中医内科）与西医基础（诊断、微生物、免疫）通过多维知识图谱与科学记忆算法融为一体。
        </p>
        <div className="mt-6 flex justify-center gap-4 flex-wrap">
          <Link to="/herbs" className="btn-primary">开始学习</Link>
          <Link to="/review" className="btn-accent">今日复习 <span className="ml-1 bg-white/20 px-1.5 py-0.5 rounded text-xs">{reviewCount}</span></Link>
          <Link to="/clinical" className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 font-medium transition-colors">临床训练</Link>
        </div>
      </section>

      {/* TCM Features */}
      <section className="mb-8">
        <h2 className="text-lg font-serif font-bold text-tcm-dark mb-4 flex items-center gap-2">
          <span className="w-1 h-5 bg-tcm-primary rounded-full inline-block" />
          中医模块
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {tcmFeatures.map((f) => (
            <Link key={f.title} to={f.link} className="card group">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{f.icon}</span>
                <div>
                  <h3 className="font-serif font-bold text-tcm-dark group-hover:text-tcm-primary transition-colors">{f.title}</h3>
                  {f.count > 0 && <span className="text-xs text-tcm-muted">{f.count} 条目</span>}
                </div>
              </div>
              <p className="text-sm text-gray-600">{f.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Western Features */}
      <section className="mb-8">
        <h2 className="text-lg font-serif font-bold text-tcm-dark mb-4 flex items-center gap-2">
          <span className="w-1 h-5 bg-blue-500 rounded-full inline-block" />
          西医模块
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {westernFeatures.map((f) => (
            <Link key={f.title} to={f.link} className="card group border-l-4 border-l-blue-400">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{f.icon}</span>
                <div>
                  <h3 className="font-serif font-bold text-tcm-dark group-hover:text-blue-600 transition-colors">{f.title}</h3>
                  {f.count > 0 && <span className="text-xs text-tcm-muted">{f.count} 条目</span>}
                </div>
              </div>
              <p className="text-sm text-gray-600">{f.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Exam Features */}
      <section className="mb-8">
        <h2 className="text-lg font-serif font-bold text-tcm-dark mb-4 flex items-center gap-2">
          <span className="w-1 h-5 bg-tcm-accent rounded-full inline-block" />
          综合训练
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {examFeatures.map((f) => (
            <Link key={f.title} to={f.link} className="card group">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{f.icon}</span>
                <div>
                  <h3 className="font-serif font-bold text-tcm-dark group-hover:text-tcm-accent transition-colors">{f.title}</h3>
                  {f.count > 0 && <span className="text-xs text-tcm-muted">{f.count} 条目</span>}
                </div>
              </div>
              <p className="text-sm text-gray-600">{f.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="bg-tcm-dark rounded-xl p-8 text-center text-white">
        <h2 className="text-2xl font-serif font-bold mb-6">平台数据</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {[
            { label: '中药', value: counts.herbs },
            { label: '方剂', value: counts.formulas },
            { label: '疾病', value: counts.diseases },
            { label: '微生物', value: counts.microbes },
            { label: '待复习', value: reviewCount },
          ].map(s => (
            <div key={s.label}>
              <p className="text-3xl font-bold text-tcm-primary">{s.value}</p>
              <p className="text-sm text-gray-400 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
