<<<<<<< Updated upstream
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
=======
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
>>>>>>> Stashed changes

export default defineConfig({
  plugins: [react()],
  build: {
<<<<<<< Updated upstream
    outDir: 'dist',
=======
    outDir: "dist", // Default output directory
>>>>>>> Stashed changes
  },
});
