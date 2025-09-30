
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
        'primary': '#8B5CF6', // A vibrant purple
        'secondary': '#FBBF24', // A bright gold
        'accent': '#10B981', // A magical green
        'background-start': '#1E293B', // A dark slate blue
        'background-end': '#0F172A', // A darker slate blue
        'foreground': '#F8FAFC', // A light, clean white
        'muted-foreground': '#94A3B8', // A muted gray
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        serif: ['var(--font-medieval-sharp)'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
export default config
