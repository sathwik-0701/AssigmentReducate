'use client'

import { useRef, useEffect, useState } from 'react'
import { stats } from '@/data/siteData'

function AnimatedNumber({ value }: { value: string }) {
  const [display, setDisplay] = useState('0')
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const num = parseInt(value.replace(/\D/g,''))
        const suffix = value.replace(/[\d]/g,'')
        const dur = 1800, steps = 60
        let step = 0
        const iv = setInterval(() => {
          step++
          const pct = step/steps
          const ease = 1 - Math.pow(1-pct, 3)
          setDisplay(Math.floor(ease*num) + (step===steps ? suffix : ''))
          if (step >= steps) clearInterval(iv)
        }, dur/steps)
        observer.unobserve(el)
      }
    }, { threshold: 0.5 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [value])

  return <span ref={ref}>{display}</span>
}

export default function StatsBar() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.querySelectorAll('.stat-item').forEach((item, i) => {
          setTimeout(() => item.classList.add('visible'), i * 120)
        })
        observer.unobserve(el)
      }
    }, { threshold: 0.2 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="stats" className="relative bg-white border-y border-gray-100 overflow-hidden">
      <div className="h-1 bg-gradient-to-r from-navy-900 via-orange-500 to-gold-500" />
      {/* subtle bg pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{backgroundImage:'radial-gradient(circle,#0f1f6f 1px,transparent 1px)',backgroundSize:'32px 32px'}} />

      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 relative">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:divide-x lg:divide-gray-100">
          {stats.map((stat, i) => (
            <div key={stat.label} className="stat-item reveal flex flex-col items-center text-center px-6 py-4 group">
              <span
                className="text-4xl mb-3 block transition-transform duration-500 group-hover:scale-125 group-hover:rotate-12"
                style={{ transitionDelay: `${i*50}ms` }}
              >
                {stat.icon}
              </span>
              <span className="font-display text-4xl lg:text-5xl font-bold text-navy-900 leading-none">
                <AnimatedNumber value={stat.value} />
              </span>
              <span className="font-body text-sm text-gray-400 mt-2 uppercase tracking-wider">{stat.label}</span>
              <div className="w-8 h-0.5 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full mt-3 scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
