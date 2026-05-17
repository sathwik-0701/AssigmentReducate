'use client'

import { useEffect, useRef, useState } from 'react'
import { strengths } from '@/data/siteData'

function StrengthCard({ s, i }: { s: typeof strengths[0]; i: number }) {
  const [rotX, setRotX] = useState(0)
  const [rotY, setRotY] = useState(0)
  const [gX, setGX] = useState(50)
  const [gY, setGY] = useState(50)
  const ref = useRef<HTMLDivElement>(null)

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current; if (!el) return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width
    const y = (e.clientY - r.top) / r.height
    setRotX((y - 0.5) * -18)
    setRotY((x - 0.5) * 18)
    setGX(x * 100)
    setGY(y * 100)
  }
  const onLeave = () => { setRotX(0); setRotY(0); setGX(50); setGY(50) }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="strength-card reveal relative group cursor-default overflow-hidden"
      style={{
        transform: `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg)`,
        transition: 'transform 0.3s cubic-bezier(0.23,1,0.32,1)',
        transformStyle: 'preserve-3d',
        transitionDelay: `${i * 80}ms`,
      }}
    >
      <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-7 h-full"
        style={{ transform: 'translateZ(0)' }}>
        {/* Spotlight glow */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${gX}% ${gY}%, rgba(249,115,22,0.15) 0%, transparent 60%)`
          }}
        />

        {/* Icon */}
        <div
          className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-600/30 to-orange-800/20 flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform duration-300"
          style={{ transform: 'translateZ(20px)' }}
        >
          {s.icon}
        </div>

        <h3 className="font-display text-xl font-semibold text-white mb-3" style={{ transform: 'translateZ(15px)' }}>
          {s.title}
        </h3>
        <p className="font-body text-white/55 text-sm leading-relaxed" style={{ transform: 'translateZ(10px)' }}>
          {s.description}
        </p>

        {/* Bottom accent */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-500 to-orange-400 rounded-b-2xl scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left" />
      </div>
    </div>
  )
}

export default function Strengths() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current; if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.querySelectorAll('.strength-card').forEach((card, i) => {
          setTimeout(() => card.classList.add('visible'), i * 90)
        })
        observer.unobserve(el)
      }
    }, { threshold: 0.1 })
    observer.observe(el); return () => observer.disconnect()
  }, [])

  return (
    <section id="strengths" className="py-24 lg:py-32 bg-navy-950 overflow-hidden relative">
      {/* 3D floating geometric shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-16 h-16 border border-orange-500/20 rotate-45 animate-float" style={{animationDelay:'0s'}} />
        <div className="absolute top-40 right-20 w-8 h-8 bg-orange-500/10 rounded-full animate-float" style={{animationDelay:'1.5s'}} />
        <div className="absolute bottom-20 left-1/4 w-12 h-12 border border-blue-400/15 rotate-12 animate-float" style={{animationDelay:'2.5s'}} />
        <div className="absolute top-1/2 right-10 w-6 h-6 bg-blue-400/10 rotate-45 animate-float" style={{animationDelay:'1s'}} />
      </div>

      <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-orange-900/10 to-transparent" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-blue-800/10 blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block font-body text-orange-400 text-sm font-semibold tracking-widest uppercase mb-4 bg-orange-900/30 px-4 py-1.5 rounded-full border border-orange-700/30">
            Why JGU
          </span>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
            Our Strengths
          </h2>
          <p className="font-body text-white/50 max-w-xl mx-auto text-lg">
            A blend of heritage, innovation, and unwavering commitment to student success.
          </p>
        </div>

        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {strengths.map((s, i) => <StrengthCard key={s.title} s={s} i={i} />)}
        </div>

        <div className="text-center mt-16">
          <a href="#contact" className="glow-btn inline-flex items-center gap-2 px-8 py-4 rounded-2xl border border-orange-500/50 text-orange-400 font-semibold hover:bg-orange-500/10 transition-colors font-body">
            Start Your Journey at JGU <span>→</span>
          </a>
        </div>
      </div>
    </section>
  )
}
