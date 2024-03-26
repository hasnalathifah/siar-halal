import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        noise: 'url(/images/background/noise.png)',
        grid: 'url(/images/background/grid.png)',
      },
      fontFamily: {
        heading: ['Cal-Sans', ...defaultTheme.fontFamily.sans],
        body: ['Matter', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: {
          50: 'rgb(var(--tw-color-primary-50) / <alpha-value>)',
          100: 'rgb(var(--tw-color-primary-100) / <alpha-value>)',
          200: 'rgb(var(--tw-color-primary-200) / <alpha-value>)',
          300: 'rgb(var(--tw-color-primary-300) / <alpha-value>)',
          400: 'rgb(var(--tw-color-primary-400) / <alpha-value>)',
          500: 'rgb(var(--tw-color-primary-500) / <alpha-value>)',
          600: 'rgb(var(--tw-color-primary-600) / <alpha-value>)',
          700: 'rgb(var(--tw-color-primary-700) / <alpha-value>)',
          800: 'rgb(var(--tw-color-primary-800) / <alpha-value>)',
          900: 'rgb(var(--tw-color-primary-900) / <alpha-value>)',
          950: 'rgb(var(--tw-color-primary-950) / <alpha-value>)',
        },
        secondary: {
          50: 'rgb(var(--tw-color-secondary-50) / <alpha-value>)',
          100: 'rgb(var(--tw-color-secondary-100) / <alpha-value>)',
          200: 'rgb(var(--tw-color-secondary-200) / <alpha-value>)',
          300: 'rgb(var(--tw-color-secondary-300) / <alpha-value>)',
          400: 'rgb(var(--tw-color-secondary-400) / <alpha-value>)',
          500: 'rgb(var(--tw-color-secondary-500) / <alpha-value>)',
          600: 'rgb(var(--tw-color-secondary-600) / <alpha-value>)',
          700: 'rgb(var(--tw-color-secondary-700) / <alpha-value>)',
          800: 'rgb(var(--tw-color-secondary-800) / <alpha-value>)',
          900: 'rgb(var(--tw-color-secondary-900) / <alpha-value>)',
          950: 'rgb(var(--tw-color-secondary-950) / <alpha-value>)',
        },
        typo: {
          DEFAULT: '#FFFFFF',
          secondary: '#A1A1AA',
          tertiary: '#71717A',
          dark: '#3F3F46',
          icons: '#52525b',
          divider: '#27272A',
          outline: '#27272A',
          disabled: '#27272A',
        },
        dark: '#222222',
        error: '#F87171',
      },
      keyframes: {
        flicker: {
          '0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%': {
            opacity: '0.99',
            filter:
              'drop-shadow(0 0 1px rgba(199, 210, 254)) drop-shadow(0 0 15px rgba(99, 102, 241)) drop-shadow(0 0 1px rgba(165, 180, 252))',
          },
          '20%, 21.999%, 63%, 63.999%, 65%, 69.999%': {
            opacity: '0.4',
            filter: 'none',
          },
        },
        shimmer: {
          '0%': {
            backgroundPosition: '-700px 0',
          },
          '100%': {
            backgroundPosition: '700px 0',
          },
        },
      },
      animation: {
        flicker: 'flicker 3s linear infinite',
        shimmer: 'shimmer 1.3s linear infinite',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries'),
    require('tailwind-scrollbar-hide'),
    require('tailwindcss-animate'),
  ],
} satisfies Config;
