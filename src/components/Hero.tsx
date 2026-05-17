'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Play } from 'lucide-react'

const WORDS = ['Excellence', 'Innovation', 'Leadership', 'Discovery']

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let W = window.innerWidth
    let H = window.innerHeight
    canvas.width = W
    canvas.height = H

    type P = { x:number; y:number; z:number; vx:number; vy:number; vz:number; r:number; color:string }
    const palette = ['#f97316','#fbbf24','#7b95fa','#ffffff','#ea580c']
    const particles: P[] = Array.from({length: 130}, () => ({
      x: Math.random()*W, y: Math.random()*H, z: Math.random()*800,
      vx: (Math.random()-0.5)*0.4, vy: (Math.random()-0.5)*0.4, vz: -0.6-Math.random()*0.6,
      r: Math.random()*2.5+0.5,
      color: palette[Math.floor(Math.random()*palette.length)],
    }))

    let mouseX = W/2, mouseY = H/2
    const onMouse = (e: MouseEvent) => { mouseX=e.clientX; mouseY=e.clientY }
    window.addEventListener('mousemove', onMouse)

    let raf: number
    function draw() {
      ctx.clearRect(0,0,W,H)
      const cx=W/2, cy=H/2
      const tiltX=((mouseX-cx)/cx)*0.35
      const tiltY=((mouseY-cy)/cy)*0.35
      for (const p of particles) {
        p.x+=p.vx+tiltX*0.2; p.y+=p.vy+tiltY*0.2; p.z+=p.vz
        if (p.z<1) p.z=800
        if (p.x<0) p.x=W; if (p.x>W) p.x=0
        if (p.y<0) p.y=H; if (p.y>H) p.y=0
        const sc=800/(800+p.z)
        const px=(p.x-cx)*sc+cx, py=(p.y-cy)*sc+cy
        const sz=p.r*sc*2.8, al=Math.min(1,sc*2.2)
        ctx.beginPath(); ctx.arc(px,py,sz,0,Math.PI*2)
        ctx.fillStyle=p.color+Math.floor(al*200).toString(16).padStart(2,'0')
        ctx.fill()
      }
      for (let i=0;i<particles.length;i++) {
        for (let j=i+1;j<particles.length;j++) {
          const a=particles[i],b=particles[j]
          const d=Math.hypot(a.x-b.x,a.y-b.y)
          if (d<110) {
            ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y)
            ctx.strokeStyle=`rgba(249,115,22,${(1-d/110)*0.1})`
            ctx.lineWidth=0.5; ctx.stroke()
          }
        }
      }
      raf=requestAnimationFrame(draw)
    }
    draw()
    const onResize=()=>{W=window.innerWidth;H=window.innerHeight;canvas.width=W;canvas.height=H}
    window.addEventListener('resize',onResize)
    return ()=>{ cancelAnimationFrame(raf); window.removeEventListener('mousemove',onMouse); window.removeEventListener('resize',onResize) }
  },[])

  return <canvas ref={canvasRef} className="absolute inset-0 z-10 pointer-events-none" />
}

function TiltCard({children}: {children: React.ReactNode}) {
  const ref = useRef<HTMLDivElement>(null)
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el=ref.current; if(!el) return
    const r=el.getBoundingClientRect()
    const rx=((e.clientY-r.top-r.height/2)/r.height)*-16
    const ry=((e.clientX-r.left-r.width/2)/r.width)*16
    el.style.transform=`perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.02,1.02,1.02)`
  }
  const onLeave=()=>{ if(ref.current) ref.current.style.transform='perspective(1000px) rotateX(0) rotateY(0) scale3d(1,1,1)' }
  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} style={{transition:'transform 0.3s cubic-bezier(0.23,1,0.32,1)',transformStyle:'preserve-3d'}}>
      {children}
    </div>
  )
}

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0)
  const [vis, setVis] = useState(true)

  useEffect(() => {
    const iv = setInterval(() => {
      setVis(false)
      setTimeout(()=>{ setWordIndex(i=>(i+1)%WORDS.length); setVis(true) }, 450)
    }, 2800)
    return ()=>clearInterval(iv)
  },[])

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[#03081a]" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a1535] via-[#03081a] to-[#1a0800] opacity-90" />

      {/* Morphing blobs */}
      <div className="absolute top-1/4 -left-40 w-[600px] h-[600px] bg-orange-600/15 blob" style={{filter:'blur(60px)',animationDelay:'0s'}} />
      <div className="absolute bottom-0 -right-40 w-[500px] h-[500px] bg-blue-800/15 blob" style={{filter:'blur(60px)',animationDelay:'3s'}} />

      {/* 3D orbit rings */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" style={{perspective:'600px'}}>
        <div style={{position:'absolute',top:'-300px',left:'-300px',width:'600px',height:'600px',borderRadius:'50%',border:'1px solid rgba(249,115,22,0.12)',animation:'orbitSpin 10s linear infinite',transformStyle:'preserve-3d'}} />
        <div style={{position:'absolute',top:'-460px',left:'-460px',width:'920px',height:'920px',borderRadius:'50%',border:'1px solid rgba(249,115,22,0.06)',animation:'orbitSpin 18s linear infinite reverse',transformStyle:'preserve-3d'}} />
      </div>

      <ParticleCanvas />

      <div className="absolute inset-0 opacity-[0.025]" style={{backgroundImage:'linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)',backgroundSize:'60px 60px'}} />

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-28 pb-20">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 mb-10 px-5 py-2.5 rounded-full glass border border-white/10 animate-fade-in" style={{animationFillMode:'both'}}>
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-white/80 text-sm font-body">Admissions Open 2026–27</span>
          <span className="text-orange-400 text-sm">→</span>
        </div>

        <TiltCard>
          <h1 className="font-display text-white leading-[1.05] mb-8">
            <span className="block text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold animate-fade-up" style={{animationDelay:'0.1s',animationFillMode:'both'}}>
              A University Built for
            </span>
            <span className="block text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold mt-3" style={{
              opacity: vis?1:0,
              transform: vis?'translateY(0) rotateX(0deg)':'translateY(-24px) rotateX(20deg)',
              transition:'all 0.45s cubic-bezier(0.23,1,0.32,1)',
              background:'linear-gradient(135deg,#fb923c,#fbbf24,#f97316)',
              WebkitBackgroundClip:'text',
              WebkitTextFillColor:'transparent',
              backgroundClip:'text',
              display:'inline-block',
              filter: vis?'drop-shadow(0 0 40px rgba(249,115,22,0.5))':'none',
            }}>
              {WORDS[wordIndex]}
            </span>
          </h1>
        </TiltCard>

        <p className="font-body text-white/60 text-lg sm:text-xl max-w-2xl mx-auto mb-12 leading-relaxed animate-fade-up" style={{animationDelay:'0.3s',animationFillMode:'both'}}>
          JG University — a tech-driven, UGC-approved institution in Ahmedabad — empowers students with industry-relevant knowledge, world-class mentorship, and global opportunities.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 animate-fade-up" style={{animationDelay:'0.5s',animationFillMode:'both'}}>
          <a href="#programs" className="glow-btn group flex items-center gap-3 px-9 py-4 rounded-2xl bg-gradient-to-r from-orange-600 to-orange-500 text-white font-semibold text-base shadow-2xl shadow-orange-500/40">
            Explore Programs
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a href="#about" className="group flex items-center gap-3 px-9 py-4 rounded-2xl glass border border-white/20 text-white font-semibold hover:border-orange-500/40 hover:bg-white/10 transition-all duration-300">
            <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center group-hover:bg-orange-500/40 transition-colors">
              <Play className="w-3.5 h-3.5 fill-orange-400 text-orange-400" />
            </div>
            Watch Our Story
          </a>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-white/30 text-xs font-body uppercase tracking-widest animate-fade-up" style={{animationDelay:'0.7s',animationFillMode:'both'}}>
          {['UGC Approved','NAAC Accredited','ASIA Charitable Trust','Est. 1965'].map(b=>(
            <span key={b} className="flex items-center gap-2 hover:text-white/60 transition-colors cursor-default">
              <span className="w-1.5 h-1.5 bg-orange-500/60 rounded-full" />{b}
            </span>
          ))}
        </div>
      </div>

      <a href="#stats" className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white/30 hover:text-white/60 transition-colors">
        <span className="text-[10px] font-body tracking-[0.3em] uppercase">Scroll</span>
        <div className="w-6 h-10 rounded-full border border-white/20 flex items-start justify-center p-1.5">
          <div className="w-1.5 h-2.5 bg-orange-400 rounded-full animate-bounce" />
        </div>
      </a>
    </section>
  )
}
