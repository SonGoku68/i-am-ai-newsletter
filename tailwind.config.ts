import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        'bg-base':        '#090C10',
        'bg-surface':     '#0F1318',
        'bg-raised':      '#151A21',
        'bg-subtle':      '#1C2330',
        'border-dim':     '#1E2733',
        'border-soft':    '#2A3543',
        'text-primary':   '#E8EDF3',
        'text-secondary': '#7A8A9B',
        'text-muted':     '#3D4E60',
        'accent':         '#00C2FF',
        'accent-hot':     '#7B61FF',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
}

export default config
