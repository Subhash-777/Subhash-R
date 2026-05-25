/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#09090f',
          secondary: '#0d0d1a',
          tertiary: '#12121f',
        },
        accent: {
          primary: '#7c3aed',
          secondary: '#8b5cf6',
          glow: '#6d28d9',
        },
        terminal: {
          green: '#22c55e',
          prompt: '#8b5cf6',
          text: '#e2e8f0',
          comment: '#64748b',
        },
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Geist Mono', 'Fira Code', 'monospace'],
        sans: ['Inter', 'SF Pro Display', 'system-ui', 'sans-serif'],
      },
      animation: {
        blink: 'blink 1s step-end infinite',
        glitch: 'glitch 3s infinite',
        ping: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
        'spin-slow': 'spin 60s linear infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        glitch: {
          '0%, 90%, 100%': { clipPath: 'none', transform: 'none' },
          '91%': { clipPath: 'rect(40px, 9999px, 45px, 0)', transform: 'skew(-0.5deg)' },
          '93%': { clipPath: 'rect(10px, 9999px, 35px, 0)', transform: 'skew(0.3deg)' },
          '95%': { clipPath: 'rect(70px, 9999px, 80px, 0)', transform: 'skew(-0.2deg)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
