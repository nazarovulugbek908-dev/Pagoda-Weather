/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pagoda: {
          sky: '#38bdf8',
          sun: '#fbbf24',
          cloud: '#e0f2fe',
          night: '#0f172a',
          dusk: '#7c3aed',
          dawn: '#f97316',
        },
      },
      fontFamily: {
        sans: ['Instrument Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'ray-rotate': 'ray-rotate 20s linear infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'fog-drift': 'fog-drift 15s ease-in-out infinite',
        'cloud-drift': 'cloud-drift 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'ray-rotate': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.5', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        'fog-drift': {
          '0%, 100%': { transform: 'translateX(0px)' },
          '50%': { transform: 'translateX(30px)' },
        },
        'cloud-drift': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100vw)' },
        },
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        light: {
          ...require('daisyui/src/theming/themes')['light'],
          primary: '#38bdf8',
          secondary: '#7c3aed',
          accent: '#fbbf24',
          neutral: '#1e293b',
          'base-100': '#f0f9ff',
          'base-200': '#e0f2fe',
          'base-300': '#bae6fd',
          info: '#38bdf8',
          success: '#34d399',
          warning: '#fbbf24',
          error: '#f87171',
        },
        dark: {
          ...require('daisyui/src/theming/themes')['dark'],
          primary: '#38bdf8',
          secondary: '#7c3aed',
          accent: '#fbbf24',
          neutral: '#1e293b',
          'base-100': '#0f172a',
          'base-200': '#1e293b',
          'base-300': '#334155',
          info: '#38bdf8',
          success: '#34d399',
          warning: '#fbbf24',
          error: '#f87171',
        },
      },
    ],
    darkTheme: 'dark',
  },
}

