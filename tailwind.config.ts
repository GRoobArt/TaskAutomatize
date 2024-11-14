import type { Config } from 'tailwindcss'
const { fontFamily } = require('tailwindcss/defaultTheme')

const config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  safelist: [
    {
      pattern:
        /bg-(gray|zinc|purple|orange|green|yellow|blue|red|darkgrey|grey)/,
    },
    {
      pattern:
        /bg-(gray|zinc|purple|orange|green|yellow|blue|red|darkgrey|grey)-(100|200|300|400|500|600|700|800|900|950)/,
    },
    {
      pattern:
        /text-(gray|zinc|purple|orange|green|yellow|blue|red|darkgrey|grey)/,
    },
    {
      pattern:
        /text-(gray|zinc|purple|orange|green|yellow|blue|red|darkgrey|grey)-(100|200|300|400|500|600|700|800|900|950)/,
    },
    {
      pattern:
        /border-(gray|zinc|purple|orange|green|yellow|blue|red|darkgrey|grey)/,
    },
    {
      pattern:
        /border-(gray|zinc|purple|orange|green|yellow|blue|red|darkgrey|grey)-(100|200|300|400|500|600|700|800|900|950)/,
    },
    'grid-cols-board-1',
    'grid-cols-board-2',
    'grid-cols-board-3',
    'grid-cols-board-4',
    'grid-cols-board-5',
    'grid-cols-board-6',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans],
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        gray: {
          DEFAULT: 'hsl(var(--gray))',
          foreground: 'hsl(var(--gray-foreground))',
        },
        zinc: {
          DEFAULT: 'hsl(var(--zinc))',
          foreground: 'hsl(var(--zinc-foreground))',
        },
        blue: {
          DEFAULT: 'hsl(var(--blue))',
          foreground: 'hsl(var(--blue-foreground))',
        },
        yellow: {
          DEFAULT: 'hsl(var(--yellow))',
          foreground: 'hsl(var(--yellow-foreground))',
        },
        green: {
          DEFAULT: 'hsl(var(--green))',
          foreground: 'hsl(var(--green-foreground))',
        },
        red: {
          DEFAULT: 'hsl(var(--red))',
          foreground: 'hsl(var(--red-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        xxl: 'var(--radius) + 8px',
        xl: 'var(--radius) + 4px',
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      gridTemplateColumns: {
        'board-1': 'repeat(1, minmax(325px, 1fr))',
        'board-2': 'repeat(2, minmax(325px, 1fr))',
        'board-3': 'repeat(3, minmax(325px, 1fr))',
        'board-4': 'repeat(4, minmax(325px, 1fr))',
        'board-5': 'repeat(5, minmax(325px, 1fr))',
        'board-6': 'repeat(6, minmax(325px, 1fr))',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config

export default config
