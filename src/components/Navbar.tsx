'use client'

import { useState, useEffect } from 'react'
import { Menu, X, GraduationCap } from 'lucide-react'
import { navLinks } from '@/data/siteData'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id) })
    }, { threshold: 0.5 })
    document.querySelectorAll('section[id]').forEach(s => observer.observe(s))

    return () => { window.removeEventListener('scroll', onScroll); observer.disconnect() }
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg shadow-navy-900/10 py-3' : 'bg-transparent py-5'
    }`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-navy-900 to-orange-600 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className={`font-display font-bold text-lg leading-none block transition-colors ${scrolled ? 'text-navy-900' : 'text-white'}`}>
              JG University
            </span>
            <span className={`text-[10px] font-body tracking-widest uppercase transition-colors ${scrolled ? 'text-orange-600' : 'text-orange-300'}`}>
              Knowledge Beyond Boundaries
            </span>
          </div>
        </a>

        <ul className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => {
            const id = link.href.replace('#','')
            const isActive = activeSection === id
            return (
              <li key={link.href}>
                <a href={link.href}
                  className={`relative font-body text-sm font-medium transition-colors pb-1 ${
                    isActive
                      ? scrolled ? 'text-orange-600' : 'text-orange-400'
                      : scrolled ? 'text-gray-700 hover:text-navy-900' : 'text-white/90 hover:text-white'
                  }`}>
                  {link.label}
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-orange-500 rounded-full transition-all duration-300 ${isActive ? 'w-full' : 'w-0'}`} />
                </a>
              </li>
            )
          })}
        </ul>

        <div className="hidden lg:flex items-center gap-3">
          <a href="#contact"
            className="glow-btn px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-600 to-orange-500 text-white text-sm font-semibold shadow-lg shadow-orange-500/30">
            Apply Now
          </a>
        </div>

        <button onClick={() => setIsOpen(!isOpen)}
          className={`lg:hidden p-2 rounded-lg transition-all ${scrolled ? 'text-navy-900' : 'text-white'}`}>
          <div className={`transition-all duration-300 ${isOpen ? 'rotate-90 scale-110' : ''}`}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </div>
        </button>
      </nav>

      <div className={`lg:hidden transition-all duration-400 ease-in-out overflow-hidden ${isOpen ? 'max-h-[420px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="bg-white/98 backdrop-blur-md border-t border-gray-100 px-4 py-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setIsOpen(false)}
              className="text-gray-700 font-medium py-2 border-b border-gray-100 last:border-0 hover:text-orange-600 hover:translate-x-1 transition-all">
              {link.label}
            </a>
          ))}
          <a href="#contact" onClick={() => setIsOpen(false)}
            className="mt-2 text-center px-5 py-3 rounded-xl bg-gradient-to-r from-orange-600 to-orange-500 text-white font-semibold shadow-lg">
            Apply Now
          </a>
        </div>
      </div>
    </header>
  )
}
