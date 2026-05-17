/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        body: ['var(--font-body)', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        navy: {
          50: '#f0f4ff',
          100: '#e0e8ff',
          200: '#c7d6fe',
          300: '#a4bafd',
          400: '#7b95fa',
          500: '#5571f5',
          600: '#3d51ea',
          700: '#3040cf',
          800: '#2835a8',
          900: '#0f1f6f',
          950: '#07113d',
        },
        gold: {
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-mesh': 'linear-gradient(135deg, #0f1f6f 0%, #1a3a8f 50%, #c2410c 100%)',
      },
      animation: {
        'fade-up': 'fadeUp 0.7s cubic-bezier(0.23,1,0.32,1) forwards',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-left': 'slideLeft 0.8s cubic-bezier(0.23,1,0.32,1) forwards',
        'slide-right': 'slideRight 0.8s cubic-bezier(0.23,1,0.32,1) forwards',
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 10s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'marquee': 'marquee 30s linear infinite',
        'spin-slow': 'spin 12s linear infinite',
        'spin-reverse': 'spinReverse 18s linear infinite',
        'orbit': 'orbitSpin 8s linear infinite',
        'orbit-slow': 'orbitSpin 14s linear infinite',
        'blob': 'blobMorph 8s ease-in-out infinite',
        'tilt': 'tiltWave 5s ease-in-out infinite',
        'glow-pulse': 'glowPulse 2.5s ease-in-out infinite',
        'number-roll': 'numberRoll 0.5s cubic-bezier(0.23,1,0.32,1) forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(40px) rotateX(10deg)' },
          '100%': { opacity: '1', transform: 'translateY(0) rotateX(0deg)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideLeft: {
          '0%': { opacity: '0', transform: 'translateX(-50px) rotateY(15deg)' },
          '100%': { opacity: '1', transform: 'translateX(0) rotateY(0deg)' },
        },
        slideRight: {
          '0%': { opacity: '0', transform: 'translateX(50px) rotateY(-15deg)' },
          '100%': { opacity: '1', transform: 'translateX(0) rotateY(0deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-18px) rotate(3deg)' },
          '66%': { transform: 'translateY(-8px) rotate(-2deg)' },
        },
        orbitSpin: {
          'from': { transform: 'rotateX(75deg) rotateZ(0deg)' },
          'to': { transform: 'rotateX(75deg) rotateZ(360deg)' },
        },
        blobMorph: {
          '0%,100%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
          '25%': { borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%' },
          '50%': { borderRadius: '50% 60% 30% 60% / 30% 40% 60% 50%' },
          '75%': { borderRadius: '60% 30% 60% 40% / 70% 50% 40% 30%' },
        },
        spinReverse: {
          'from': { transform: 'rotateX(72deg) rotateZ(360deg)' },
          'to': { transform: 'rotateX(72deg) rotateZ(0deg)' },
        },
        tiltWave: {
          '0%,100%': { transform: 'rotateZ(-1deg) skewX(0deg)' },
          '50%': { transform: 'rotateZ(1deg) skewX(1deg)' },
        },
        glowPulse: {
          '0%,100%': { boxShadow: '0 0 20px rgba(249,115,22,0.3)' },
          '50%': { boxShadow: '0 0 50px rgba(249,115,22,0.7), 0 0 100px rgba(249,115,22,0.2)' },
        },
        numberRoll: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}
