/// <reference types="vitest" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: 'setup-vitest.ts',
        /**
         * for in-source testing.
         * {@link https://vitest.dev/guide/in-source.html}
         */
        includeSource: ['src/**/*.{ts,tsx}'],
    },
})

