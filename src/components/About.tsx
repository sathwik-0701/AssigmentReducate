'use client'

import { useEffect, useRef } from 'react'
import { CheckCircle2 } from 'lucide-react'

const highlights = [
  'UGC approved, sponsored by ASIA Charitable Trust',
  'Over 60 years of educational legacy since 1965',
  'Successfully managing 17 colleges and 3 schools',
  'Globally recognised curriculum with industry partnerships',
  'Fostering entrepreneurship, research, and innovation',
]

function Tilt3D({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current; if (!el) return
    const r = el.getBoundingClientRect()
    const rx = ((e.clientY - r.top - r.height/2) / r.height) * -12
    const ry = ((e.clientX - r.left - r.width/2) / r.width) * 12
    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(10px)`
  }
  const onLeave = () => { if (ref.current) ref.current.style.transform = 'perspective(900px) rotateX(0) rotateY(0) translateZ(0)' }

  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}
      className={className}
      style={{ transition: 'transform 0.35s cubic-bezier(0.23,1,0.32,1)', transformStyle: 'preserve-3d' }}>
      {children}
    </div>
  )
}

export default function About() {
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target) } })
    }, { threshold: 0.15 })
    ;[leftRef.current, rightRef.current].forEach(el => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" className="py-24 lg:py-32 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left 3D card */}
          <div ref={leftRef} className="reveal-left relative">
            <Tilt3D>
              <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-navy-900 to-navy-800 p-1 shadow-2xl shadow-navy-900/40 shimmer">
                <div className="rounded-[22px] bg-gradient-to-br from-navy-800 to-navy-950 p-10 text-white relative overflow-hidden">
                  {/* Decorative bg */}
                  <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-orange-600/10 blur-2xl" />
                  <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-blue-600/10 blur-2xl" />

                  <p className="font-display text-2xl lg:text-3xl font-semibold leading-snug mb-6 relative z-10">
                    "Knowledge is power that no one can take away from you."
                  </p>
                  <div className="w-12 h-1 bg-gradient-to-r from-orange-500 to-orange-400 rounded-full mb-6" />
                  <p className="font-body text-white/65 text-base leading-relaxed relative z-10">
                    JG University empowers its students to explore and gain wisdom beyond the pages of books. Our pedagogy matches everyday challenges while bringing out academic brilliance.
                  </p>

                  {/* Spinning ring decoration */}
                  <div className="absolute top-4 right-4 w-24 h-24 rounded-full border border-orange-500/20" style={{animation:'orbitSpin 12s linear infinite'}} />
                </div>
              </div>
            </Tilt3D>

            {/* Floating accent card */}
            <div className="absolute -bottom-6 -right-4 bg-white rounded-2xl shadow-xl p-5 w-52 border border-gray-100 hover:-translate-y-1 transition-transform duration-300">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-xl animate-float">🎯</div>
                <div>
                  <p className="font-body text-xs text-gray-400">Our Mission</p>
                  <p className="font-body text-sm font-semibold text-navy-900">Excellence First</p>
                </div>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                <div className="bg-gradient-to-r from-orange-500 to-orange-400 h-1.5 rounded-full w-[88%]" style={{animation:'shimmerSlide 2.5s ease-in-out infinite'}} />
              </div>
              <p className="text-xs text-gray-400 mt-1 text-right">88% placement rate</p>
            </div>

            {/* Top badge */}
            <div className="absolute -top-6 -left-4 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl shadow-lg shadow-orange-500/30 p-4 text-white text-center w-28 animate-float" style={{animationDelay:'1s'}}>
              <p className="font-display text-2xl font-bold">60+</p>
              <p className="font-body text-xs">Years of Trust</p>
            </div>
          </div>

          {/* Right content */}
          <div ref={rightRef} className="reveal-right">
            <span className="inline-block font-body text-orange-600 text-sm font-semibold tracking-widest uppercase mb-4 bg-orange-50 px-4 py-1.5 rounded-full">
              About Us
            </span>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-navy-900 leading-tight mb-6">
              A Legacy of Learning,
              <span className="block gradient-text">Reimagined for Tomorrow</span>
            </h2>
            <p className="font-body text-gray-600 text-lg leading-relaxed mb-8">
              JG University is a new-age tech-driven institution offering programmes that evolve with future industry demands. Sponsored by the ASIA Charitable Trust — a name synonymous with educational excellence since 1965.
            </p>

            <ul className="space-y-4 mb-10">
              {highlights.map((item, i) => (
                <li key={item}
                  className="flex items-start gap-3 p-3 rounded-xl hover:bg-orange-50 transition-colors duration-200 group cursor-default"
                  style={{ transitionDelay: `${i*60}ms` }}
                >
                  <CheckCircle2 className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                  <span className="font-body text-gray-700 text-sm">{item}</span>
                </li>
              ))}
            </ul>

            <a href="#programs" className="glow-btn inline-flex items-center gap-2 px-6 py-3.5 bg-navy-900 text-white rounded-xl font-semibold hover:bg-navy-800 transition-colors shadow-lg shadow-navy-900/20">
              Explore Our Programs
              <span className="text-orange-400">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
