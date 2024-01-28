import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/lib/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      screens: {
        sm: '100%',
        md: '768px',
      },
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        edensor: 'Edensor',
        analogue: 'Analogue',
        strawberrycupcakes: 'Strawberrycupcakes',
        signature: 'Brittany Signature',
        sans: ['var(--font-poppins)'],
        mono: ['var(--font-roboto-mono)'],
      },
      colors: {
        accent: {
          DEFAULT: '#40506B',
        },
      },
    },
  },
  plugins: [],
};
export default config;
