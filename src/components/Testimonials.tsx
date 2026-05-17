'use client'

import { useState, useEffect, useRef } from 'react'
import { testimonials } from '@/data/siteData'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'

const AVATAR_COLORS = [
  'from-orange-500 to-orange-700',
  'from-navy-700 to-navy-900',
  'from-emerald-500 to-emerald-700',
  'from-violet-500 to-violet-700',
]

export default function Testimonials() {
  const [active, setActive] = useState(0)
  const [dir, setDir] = useState(1)
  const [key, setKey] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const autoRef = useRef<NodeJS.Timeout | null>(null)

  const go = (i: number, d: number) => {
    setDir(d); setKey(k => k+1)
    setActive((i + testimonials.length) % testimonials.length)
  }
  const prev = () => go(active - 1, -1)
  const next = () => go(active + 1, 1)

  useEffect(() => {
    autoRef.current = setInterval(() => go(active + 1, 1), 5000)
    return () => { if (autoRef.current) clearInterval(autoRef.current) }
  }, [active])

  useEffect(() => {
    const el = ref.current; if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { el.classList.add('visible'); observer.unobserve(el) }
    }, { threshold: 0.2 })
    observer.observe(el); return () => observer.disconnect()
  }, [])

  const t = testimonials[active]

  return (
    <section id="testimonials" className="py-24 lg:py-32 bg-gray-50 overflow-hidden">
      <div ref={ref} className="reveal max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block font-body text-orange-600 text-sm font-semibold tracking-widest uppercase mb-4 bg-orange-50 px-4 py-1.5 rounded-full">
            Student Stories
          </span>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-navy-900 mb-4">
            Voices of <span className="gradient-text">JGU</span>
          </h2>
        </div>

        {/* 3D stage */}
        <div className="max-w-4xl mx-auto" style={{ perspective: '1200px' }}>
          {/* Card */}
          <div
            key={key}
            className="relative bg-white rounded-3xl p-10 shadow-2xl shadow-gray-200/80 border border-gray-100 shimmer"
            style={{
              animation: `slideIn${dir > 0 ? 'Right' : 'Left'} 0.55s cubic-bezier(0.23,1,0.32,1)`,
            }}
          >
            {/* Quote BG */}
            <div className="absolute top-8 right-8 text-orange-50">
              <Quote className="w-20 h-20 fill-current" />
            </div>

            {/* Stars */}
            <div className="flex gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-gold-500 text-xl" style={{ animationDelay: `${i*100}ms`, animation: 'countUp 0.4s ease forwards', opacity: 0 }}>★</span>
              ))}
            </div>

            {/* Quote */}
            <p className="font-display text-xl lg:text-2xl text-navy-900 leading-relaxed mb-8 relative z-10">
              "{t.quote}"
            </p>

            {/* Author */}
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${AVATAR_COLORS[active % AVATAR_COLORS.length]} flex items-center justify-center text-white font-bold font-display text-lg shadow-lg hover:scale-110 transition-transform`}>
                {t.avatar}
              </div>
              <div>
                <p className="font-body font-semibold text-navy-900">{t.name}</p>
                <p className="font-body text-sm text-orange-600">{t.program}</p>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-8">
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => go(i, i > active ? 1 : -1)}
                  className={`h-2 rounded-full transition-all duration-400 ${i === active ? 'w-10 bg-navy-900' : 'w-2 bg-gray-300 hover:bg-gray-400'}`}
                  aria-label={`Testimonial ${i+1}`} />
              ))}
            </div>
            <div className="flex gap-3">
              <button onClick={prev}
                className="w-11 h-11 rounded-xl bg-white border border-gray-200 flex items-center justify-center hover:bg-navy-900 hover:text-white hover:border-navy-900 hover:-translate-x-0.5 transition-all shadow-sm">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button onClick={next}
                className="w-11 h-11 rounded-xl bg-navy-900 text-white flex items-center justify-center hover:bg-orange-600 hover:translate-x-0.5 transition-all shadow-sm">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideInRight {
          from { opacity:0; transform:translateX(60px) rotateY(-15deg); }
          to   { opacity:1; transform:translateX(0) rotateY(0deg); }
        }
        @keyframes slideInLeft {
          from { opacity:0; transform:translateX(-60px) rotateY(15deg); }
          to   { opacity:1; transform:translateX(0) rotateY(0deg); }
        }
      `}</style>
    </section>
  )
}
