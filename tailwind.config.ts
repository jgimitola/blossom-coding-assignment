import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './modules/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        magnifier: 'hsla(218, 11%, 65%, 1)',
        disabled: 'hsla(216, 12%, 84%, 1)',
        search: 'hsla(220, 14%, 96%, 1)',
        'primary.100': 'hsla(264, 100%, 95%, 1)',
        'primary.600': 'hsla(263, 51%, 55%, 1)',
        'primary.700': 'hsla(263, 47%, 40%, 1)',
        'secondary.600': 'hsla(104, 67%, 53%, 1)',
        titles: 'hsla(221, 39%, 11%, 1)',
        pagetTitle: 'hsla(215, 28%, 17%, 1)',
        label: 'hsla(220, 9%, 46%, 1)',
      },
    },
  },
  plugins: [],
};
export default config;
