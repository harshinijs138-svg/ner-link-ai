/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#070B14", surface: "#0B1120", panel: "#111827", line: "#1F2937",
        primary: "#38BDF8", ok: "#22C55E", warn: "#F59E0B", danger: "#EF4444",
        orange: "#FB923C", muted: "#94A3B8",
      },
      fontFamily: { sans: ["Inter", "system-ui", "-apple-system", "Segoe UI", "sans-serif"] },
    },
  },
  plugins: [],
};
