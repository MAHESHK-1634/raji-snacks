/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        maroon: {
          DEFAULT: '#6D281B',
          light: '#853424',
          dark: '#521D13',
          50: '#FAF2F0',
          100: '#F4DFDC',
        },
        gold: {
          DEFAULT: '#E9A52B',
          light: '#F1BD5B',
          soft: '#F3E2B9',
          dark: '#C88716',
          50: '#FEFAF0',
        },
        cream: {
          DEFAULT: '#F8F0DF',
          light: '#FBF7EE',
          dark: '#EDE0C8',
        },
        forest: {
          DEFAULT: '#344B32',
          light: '#486645',
          dark: '#243422',
          50: '#F2F5F2',
        },
        warmwhite: '#FFFDF7',
        darktext: '#29231F',
        mutedtext: '#766D64',
        bordercream: '#E8DDCB',
        errorred: '#B42318',
        successgreen: '#28734A',
      },
      fontFamily: {
        display: ['Fraunces', 'Playfair Display', 'Georgia', 'serif'],
        body: ['Manrope', 'Inter', 'system-ui', 'sans-serif'],
        tamil: ['Noto Sans Tamil', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(109, 40, 27, 0.06), 0 2px 6px -1px rgba(109, 40, 27, 0.04)',
        'soft-md': '0 10px 25px -4px rgba(109, 40, 27, 0.08), 0 4px 10px -2px rgba(109, 40, 27, 0.04)',
        'soft-lg': '0 20px 35px -6px rgba(109, 40, 27, 0.12), 0 8px 16px -3px rgba(109, 40, 27, 0.06)',
        'gold-glow': '0 0 25px -3px rgba(233, 165, 43, 0.35)',
      },
      borderRadius: {
        'brand': '14px',
        'brand-lg': '20px',
        'brand-xl': '28px',
      },
      aspectRatio: {
        '4/3': '4 / 3',
        '16/9': '16 / 9',
        '21/9': '21 / 9',
        '16/10': '16 / 10',
        '4/5': '4 / 5',
      }
    },
  },
  plugins: [],
}
