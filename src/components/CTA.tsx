'use client'

import { useEffect, useRef, useState } from 'react'
import { Send, Phone, Mail, MapPin } from 'lucide-react'

function FloatingShape({ style }: { style: React.CSSProperties }) {
  return <div className="absolute border border-orange-500/15 rounded-full animate-float" style={style} />
}

export default function CTA() {
  const ref = useRef<HTMLDivElement>(null)
  const [submitted, setSubmitted] = useState(false)
  const [fields, setFields] = useState({ first:'', last:'', email:'', phone:'', program:'' })
  const [focused, setFocused] = useState<string | null>(null)

  useEffect(() => {
    const el = ref.current; if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { el.classList.add('visible'); observer.unobserve(el) }
    }, { threshold: 0.15 })
    observer.observe(el); return () => observer.disconnect()
  }, [])

  const inputClass = (name: string) =>
    `w-full px-4 py-3 rounded-xl border font-body text-sm text-gray-900 placeholder-gray-300 focus:outline-none transition-all duration-300 ${
      focused === name
        ? 'border-orange-400 ring-2 ring-orange-400/20 shadow-lg shadow-orange-400/10'
        : 'border-gray-200 hover:border-gray-300'
    }`

  return (
    <section id="contact" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-navy-950 via-navy-900 to-slate-900" />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-orange-900/20 to-transparent" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-orange-600/10 blob" style={{filter:'blur(60px)'}} />

      {/* Floating shapes */}
      <FloatingShape style={{width:80,height:80,top:'10%',left:'5%',animationDelay:'0s'}} />
      <FloatingShape style={{width:140,height:140,top:'30%',right:'8%',animationDelay:'2s'}} />
      <FloatingShape style={{width:60,height:60,bottom:'20%',left:'15%',animationDelay:'4s'}} />

      <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage:'linear-gradient(rgba(255,255,255,0.8) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.8) 1px,transparent 1px)',backgroundSize:'40px 40px'}} />

      <div ref={ref} className="reveal relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <span className="inline-block font-body text-orange-400 text-sm font-semibold tracking-widest uppercase mb-4 bg-orange-900/30 px-4 py-1.5 rounded-full border border-orange-700/30">
              Admissions 2026–27
            </span>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
              Your Future Starts
              <span className="block text-orange-400" style={{filter:'drop-shadow(0 0 20px rgba(251,146,60,0.5))'}}>Here & Now</span>
            </h2>
            <p className="font-body text-white/55 text-lg leading-relaxed mb-10">
              Take the first step towards a transformative education. Connect with our admissions team and explore the programme that's right for you.
            </p>

            <div className="space-y-5">
              {[
                { icon: Phone, label: '+91 79 4000 XXXX', sub: 'Mon–Sat, 9am–6pm' },
                { icon: Mail, label: 'admissions@jguni.in', sub: 'We reply within 24 hours' },
                { icon: MapPin, label: 'ASIA Charitable Trust Campus, Ahmedabad', sub: 'Near SG Highway, Gujarat' },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="flex items-start gap-4 group cursor-default">
                  <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-orange-500/20 group-hover:scale-110 transition-all duration-300">
                    <Icon className="w-4 h-4 text-orange-400" />
                  </div>
                  <div>
                    <p className="font-body text-white font-medium text-sm">{label}</p>
                    <p className="font-body text-white/40 text-xs">{sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div className="bg-white rounded-3xl p-8 shadow-2xl hover:shadow-orange-500/10 transition-shadow duration-500" style={{ transformStyle: 'preserve-3d' }}>
            {submitted ? (
              <div className="flex flex-col items-center justify-center text-center py-10">
                <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center text-4xl mb-4 animate-float">✅</div>
                <h3 className="font-display text-2xl font-bold text-navy-900 mb-2">Thank You!</h3>
                <p className="font-body text-gray-500">Our admissions team will reach out within 24 hours.</p>
              </div>
            ) : (
              <>
                <h3 className="font-display text-2xl font-bold text-navy-900 mb-1">Request Information</h3>
                <p className="font-body text-gray-400 text-sm mb-7">Fill in your details and we'll be in touch.</p>

                <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true) }} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="font-body text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1.5">First Name</label>
                      <input type="text" required placeholder="Rahul"
                        className={inputClass('first')}
                        onFocus={() => setFocused('first')} onBlur={() => setFocused(null)}
                        onChange={e => setFields(f => ({...f, first: e.target.value}))} />
                    </div>
                    <div>
                      <label className="font-body text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1.5">Last Name</label>
                      <input type="text" required placeholder="Patel"
                        className={inputClass('last')}
                        onFocus={() => setFocused('last')} onBlur={() => setFocused(null)}
                        onChange={e => setFields(f => ({...f, last: e.target.value}))} />
                    </div>
                  </div>

                  {[
                    { name:'email', label:'Email', type:'email', placeholder:'rahul@email.com' },
                    { name:'phone', label:'Phone', type:'tel', placeholder:'+91 98765 43210' },
                  ].map(({ name, label, type, placeholder }) => (
                    <div key={name}>
                      <label className="font-body text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1.5">{label}</label>
                      <input type={type} required placeholder={placeholder}
                        className={inputClass(name)}
                        onFocus={() => setFocused(name)} onBlur={() => setFocused(null)} />
                    </div>
                  ))}

                  <div>
                    <label className="font-body text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1.5">Interested Program</label>
                    <select required
                      className={inputClass('program') + ' bg-white'}
                      onFocus={() => setFocused('program')} onBlur={() => setFocused(null)}>
                      <option value="">Select a programme</option>
                      {['MBA','BBA / BBA (Hons)','B.Tech (CS / IT / AI)','BCA / MCA','B.Com / M.Com','Ph.D.','Certificate Course'].map(o=>(
                        <option key={o}>{o}</option>
                      ))}
                    </select>
                  </div>

                  <button type="submit"
                    className="glow-btn flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-gradient-to-r from-orange-600 to-orange-500 text-white font-semibold shadow-lg shadow-orange-500/30 font-body mt-2">
                    <Send className="w-4 h-4" />
                    Submit Application
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
