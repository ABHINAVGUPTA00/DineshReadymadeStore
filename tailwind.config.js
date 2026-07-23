/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FAF7F2',
          100: '#F5EFE6',
          200: '#EDE4DD',
          300: '#D2CAC3',
          400: '#B8AFA7',
        },
        charcoal: {
          800: '#222222',
          900: '#171717',
          950: '#0D0D0D',
        },
        maroon: {
          600: '#A31D24',
          700: '#800020',
          800: '#5C0017',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        display: ['Syne', 'Outfit', 'sans-serif'],
      },
      aspectRatio: {
        'portrait': '3/4',
        'tall': '9/12',
      },
      animation: {
        'marquee': 'marquee 25s linear infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 4s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
}
