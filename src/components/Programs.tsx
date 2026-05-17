'use client'

import { useState, useEffect, useRef } from 'react'
import { programs } from '@/data/siteData'
import { ArrowRight } from 'lucide-react'

function Card3D({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current; if (!el) return
    const r = el.getBoundingClientRect()
    const rx = ((e.clientY - r.top - r.height/2) / r.height) * -10
    const ry = ((e.clientX - r.left - r.width/2) / r.width) * 10
    el.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(8px)`
  }
  const onLeave = () => { if (ref.current) ref.current.style.transform = '' }
  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}
      className={className}
      style={{ transition: 'transform 0.3s cubic-bezier(0.23,1,0.32,1)', transformStyle: 'preserve-3d' }}>
      {children}
    </div>
  )
}

export default function Programs() {
  const [active, setActive] = useState(0)
  const [animKey, setAnimKey] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current; if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { el.classList.add('visible'); observer.unobserve(el) }
    }, { threshold: 0.1 })
    observer.observe(el); return () => observer.disconnect()
  }, [])

  const switchTab = (i: number) => { setAnimKey(k=>k+1); setActive(i) }
  const prog = programs[active]

  return (
    <section id="programs" className="py-24 lg:py-32 bg-white overflow-hidden">
      <div ref={ref} className="reveal max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-block font-body text-orange-600 text-sm font-semibold tracking-widest uppercase mb-4 bg-orange-50 px-4 py-1.5 rounded-full">
            Academic Programs
          </span>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-navy-900 leading-tight mb-4">
            Find Your Path to <span className="gradient-text">Greatness</span>
          </h2>
          <p className="font-body text-gray-500 max-w-xl mx-auto text-lg">
            30+ industry-aligned programmes across management, technology, commerce, law and science.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {programs.map((p, i) => (
            <button key={p.category} onClick={() => switchTab(i)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold font-body transition-all duration-400 ${
                active===i
                  ? 'bg-navy-900 text-white shadow-xl shadow-navy-900/30 -translate-y-1 scale-105'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:-translate-y-0.5'
              }`}
              style={{ transformStyle: 'preserve-3d' }}>
              <span className={active===i ? 'animate-float' : ''}>{p.icon}</span>
              {p.category}
            </button>
          ))}
        </div>

        {/* Content */}
        <div key={animKey} className="grid lg:grid-cols-2 gap-8 items-start" style={{animation:'fadeUp 0.5s cubic-bezier(0.23,1,0.32,1)'}}>
          {/* Course list - 3D card */}
          <Card3D className={`rounded-3xl bg-gradient-to-br ${prog.color} p-8 text-white shadow-2xl shimmer`}>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-5xl animate-float">{prog.icon}</span>
              <div>
                <p className="font-body text-white/50 text-xs uppercase tracking-widest">Programme</p>
                <h3 className="font-display text-2xl font-bold">{prog.category}</h3>
              </div>
            </div>
            <ul className="space-y-2.5">
              {prog.courses.map((course, i) => (
                <li key={course}
                  className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 hover:bg-white/20 transition-all duration-200 hover:translate-x-1 cursor-default"
                  style={{animationDelay:`${i*40}ms`}}>
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-300 flex-shrink-0" />
                  <span className="font-body text-sm text-white/90">{course}</span>
                </li>
              ))}
            </ul>
          </Card3D>

          {/* Info side */}
          <div className="space-y-5">
            <div className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300 holo-border">
              <h4 className="font-display text-xl font-semibold text-navy-900 mb-3">Why Choose JGU?</h4>
              <p className="font-body text-gray-600 text-sm leading-relaxed">
                Every programme at JG University is crafted with industry experts, ensuring you graduate with skills employers actively seek. Our NEP 2020-aligned curriculum blends theoretical rigor with project-based learning.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { icon:'📅', label:'Flexible Duration', sub:'1–5 year options' },
                { icon:'🌐', label:'Global Exposure', sub:'Industry tie-ups' },
                { icon:'🎓', label:'Expert Faculty', sub:'Practitioners & scholars' },
                { icon:'💼', label:'Placement Support', sub:'Dedicated cell' },
              ].map((f,i) => (
                <div key={f.label}
                  className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-lg hover:-translate-y-1.5 hover:border-orange-200 transition-all duration-300 group cursor-default"
                  style={{ transitionDelay: `${i*50}ms` }}>
                  <span className="text-2xl mb-2 block group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">{f.icon}</span>
                  <p className="font-body text-sm font-semibold text-navy-900">{f.label}</p>
                  <p className="font-body text-xs text-gray-400">{f.sub}</p>
                </div>
              ))}
            </div>

            <a href="#contact" className="glow-btn flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-gradient-to-r from-orange-600 to-orange-500 text-white font-semibold shadow-lg shadow-orange-500/30">
              Apply for {prog.category} <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
