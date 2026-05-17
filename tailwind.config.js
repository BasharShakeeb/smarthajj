/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background:  "var(--background)",
        foreground:  "var(--foreground)",
        primary: {
          DEFAULT:    "var(--primary)",
          light:      "var(--primary-light)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT:    "var(--secondary)",
          light:      "var(--secondary-light)",
          foreground: "var(--secondary-foreground)",
        },
        accent:  "var(--accent)",
        muted: {
          DEFAULT:    "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        card: {
          DEFAULT:    "var(--card)",
          foreground: "var(--card-foreground)",
        },
        border: "var(--border)",
        /* Semantic status */
        success: "var(--status-success)",
        warning: "var(--status-warning)",
        danger:  "var(--status-danger)",
        info:    "var(--status-info)",
      },
      borderRadius: {
        lg:  "var(--radius)",
        md:  "calc(var(--radius) - 2px)",
        sm:  "calc(var(--radius) - 4px)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      boxShadow: {
        "primary-sm": "0 2px 8px rgba(0, 107, 60, 0.20)",
        "primary-md": "0 4px 20px rgba(0, 107, 60, 0.25)",
        "secondary-sm": "0 2px 8px rgba(0, 87, 168, 0.20)",
        "secondary-md": "0 4px 20px rgba(0, 87, 168, 0.25)",
        card: "0 1px 4px rgba(13, 31, 45, 0.08)",
      },
    },
  },
  plugins: [],
};
