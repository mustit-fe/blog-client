import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        mustitBlack: '#1F1F2C',
        mustitRed: '#F52644',
        // mustitGrey: {
        //   100: '#c8c8c8',
        //   300: '#a0a0a0',
        //   500: '#646464',
        //   700: '#323232',
        // },
        themeNavy: '#28264C',
        themeGray: {
          100: '#E8EAE7',
          300: '#A6A7A8',
        },
        themeRed: '#A40033',
        themeBlue: {
          100: '#959EC9',
          500: '#4E5174',
        },
      },
    },
  },
  plugins: [],
};
export default config;
