import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        // Point this to your live Render backend!
        target: "https://hrms-backend-awpf.onrender.com",
        changeOrigin: true,
        secure: true, // Set to true because Render uses https
      },
    },
  },
});