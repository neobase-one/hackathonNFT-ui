import headlessTailwind from '@headlessui/tailwindcss';
import tailwindForms from '@tailwindcss/forms';
import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.tsx',
    './src/components/**/*.tsx',
    './src/layouts/**/*.tsx',
  ],
  plugins: [
    tailwindForms,
    headlessTailwind({ prefix: 'ui' }),
  ],
  theme: {
    fontSize: {
      xs: 'clamp(0.75rem, 0.725rem + 0.125vw, 0.875rem)/* 12px */',
      sm: 'clamp(0.875rem, 0.85rem + 0.125vw, 1rem)/* 14px */',
      base: 'clamp(1rem, 0.975rem + 0.125vw, 1.125rem)/* 16px */',
      lg: 'clamp(1.125rem, 0.95rem + 0.25vw, 1.25rem)/* 18px */',
      xl: 'clamp(1.25rem, 1.225rem + 0.125vw, 1.375rem)/* 20px */',
      '2xl': 'clamp(1.5rem, 1.475rem + 0.125vw, 1.625rem)/* 24px */',
      '3xl': 'clamp(1.875rem, 1.85rem + 0.125vw, 2rem)/* 30px */',
      '4xl': 'clamp(2.25rem, 2.225rem + 0.125vw, 2.375rem)/* 36px */',
      '5xl': 'clamp(3rem, 2.975rem + 0.125vw, 3.125rem)/* 48px */',
      '6xl': 'clamp(3.75rem, 3.725rem + 0.125vw, 3.875rem)/* 60px */',
      '7xl': 'clamp(4.5rem, 4.475rem + 0.125vw, 4.625rem)/* 72px */',
      '8xl': 'clamp(6rem, 5.975rem + 0.125vw, 6.125rem)/* 96px */',
      '9xl': 'clamp(8rem, 7.975rem + 0.125vw, 8.125rem)/* 128px */',
    },
    extend: {
      maxWidth: {
        screen: '100vw',
      },
      fontFamily: {
        handwriting: ['var(--homemade-apple-font)'],
      },
      colors: {
        primary: 'rgb(236,231,204)',
      },
    },
  },
} satisfies Config;
