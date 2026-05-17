import { GraduationCap, Facebook, Twitter, Linkedin, Instagram, Youtube } from 'lucide-react'

const footerLinks = {
  Programs: [
    { label: 'MBA', href: '#programs' },
    { label: 'BBA / BBA (Hons)', href: '#programs' },
    { label: 'B.Tech (AI & ML)', href: '#programs' },
    { label: 'BCA / MCA', href: '#programs' },
    { label: 'Certificate Courses', href: '#programs' },
  ],
  University: [
    { label: 'About JGU', href: '#about' },
    { label: 'Our Strengths', href: '#strengths' },
    { label: 'Faculty', href: '#' },
    { label: 'Research', href: '#' },
    { label: 'Campus Life', href: '#' },
  ],
  Admissions: [
    { label: 'Apply Now', href: '#contact' },
    { label: 'Eligibility', href: '#' },
    { label: 'Scholarships', href: '#' },
    { label: 'Fee Structure', href: '#' },
    { label: 'International Students', href: '#' },
  ],
}

const socials = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Youtube, href: '#', label: 'YouTube' },
]

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-white">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand col */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-navy-700 to-orange-600 flex items-center justify-center shadow-lg">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-display font-bold text-lg block text-white leading-none">JG University</span>
                <span className="text-[10px] font-body tracking-widest text-orange-400 uppercase">Knowledge Beyond Boundaries</span>
              </div>
            </div>
            <p className="font-body text-gray-400 text-sm leading-relaxed mb-6 max-w-xs">
              A new-age tech-driven university in Ahmedabad, empowering the next generation of global leaders through innovation, excellence, and purposeful education.
            </p>
            {/* Socials */}
            <div className="flex gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-orange-600 hover:text-white hover:border-orange-600 transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link cols */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-body font-semibold text-white text-sm uppercase tracking-widest mb-5">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="font-body text-gray-400 text-sm hover:text-orange-400 transition-colors animated-underline"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee trust badges */}
      <div className="border-t border-white/5 py-4 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap gap-12 text-gray-600 text-xs font-body uppercase tracking-widest">
          {[...Array(3)].fill(['UGC Approved', 'NAAC Accredited', 'ASIA Charitable Trust', 'Est. 1965', '17+ Colleges', '3 Schools', '10,000+ Alumni', 'Industry Partnerships']).flat().map((item, i) => (
            <span key={i} className="flex items-center gap-2">
              <span className="w-1 h-1 bg-orange-600 rounded-full" />
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/5 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-body text-gray-600">
          <p>© {new Date().getFullYear()} JG University. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gray-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-400 transition-colors">Terms of Use</a>
            <a href="#" className="hover:text-gray-400 transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
