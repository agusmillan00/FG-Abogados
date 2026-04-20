import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary:       '#2D1A00',
        accent:        '#B5C87A',
        'accent-dark': '#8A9E52',
        cream:         '#F8F8F0',
        'cream-dark':  '#F2F2E8',
        muted:         '#7A6A55',
        border:        '#DDD9CC',
        'bg-footer':   '#1A0E00',
      },
      fontFamily: {
        serif: ['Poppins', 'system-ui', 'sans-serif'],
        sans:  ['Poppins', 'system-ui', 'sans-serif'],
      },
      screens: {
        'sm': '576px',
        'md': '768px',
        'lg': '992px',
        'xl': '1200px',
        '2xl': '1400px',
      },
    },
  },
  plugins: [],
}
export default config
