/// <reference types="vitest/config" />

import { defineConfig } from 'vite'
import { InlineConfig } from 'vitest'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
const testConfig: InlineConfig = {
  environment: 'jsdom',
  setupFiles: ['test-setup.js'],
  globals: true,
  include: ['./src/**/*.test.{tsx,ts}'],
}

export default defineConfig({
  plugins: [react(), svgr()],
  test: testConfig,
  build: {
    outDir: "../backend/src/main/resources/static/",
  },
})