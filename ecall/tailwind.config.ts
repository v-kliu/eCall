import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        red: "#e61919"
      },
      fontFamily: {
        inter: "Inter"
      },
      dropShadow: {
        '3xl': '0 35px 35px rgba(0, 0, 0, 0.25)',
        '4xl': [
            '0 35px 35px rgba(230, 25, 25, 0.25)',
            '0 45px 65px rgba(230, 25, 25, 0.15)'
        ]
      },
      // boxShadow: {
      //   '3xl': '0 35px 35px rgba(0, 0, 0, 0.25)',
      //   '4xl': [
      //       '0 8px 16px 0 rgba(230, 25, 25, 0.25)',
      //       '0 12px 40px 0 rgba(230, 25, 25, 0.15)'
      //   ]
      // }
    },
  },
  plugins: [],
};
export default config;
