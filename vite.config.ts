import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import manifest from "./pwa/manifest"
import { VitePWA, VitePWAOptions } from "vite-plugin-pwa";


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA(manifest as Partial<VitePWAOptions>)],
})
