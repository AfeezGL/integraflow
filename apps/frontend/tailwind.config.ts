import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/ui/**/*.{js,ts,jsx,tsx,mdx}",
    "../../node_modules/@tremor/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        intg: {
          bg: {
            "1": "#21173A",
            "2": "#53389E",
            "3": "#322751",
            "4": "#2F254B",
          },
          text: {
            "1": "#DBD4EB",
            "2": "#DAD1EE",
            "3": "#9582C0",
            "4": "#AFAAC7",
            "5": "#F2F2F2",
            DEFAULT: "#AFAAC7",
          },
          black: {
            1: "#050505",
            DEFAULT: "#050505",
          },
        },
      },
      backgroundImage: {
        "gradient-button":
          "linear-gradient(27deg, #53389E 8.33%, #6941C6 91.67%)",
        "gradient-button-hover":
          "linear-gradient(27deg, #299532 8.33%, #7EE787 91.67%)",
      },
    },
  },
};

export default config;
