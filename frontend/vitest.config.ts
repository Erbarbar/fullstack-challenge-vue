import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
    plugins: [vue()],
    resolve: {
        tsconfigPaths: true,
    },
    test: {
        globals: true,
        environment: 'jsdom',
        coverage: {
            provider: 'v8',
            reporter: ['text', 'json', 'html'],
            include: ['src/**/*.{ts,tsx,vue}'],
            exclude: ['**/index.ts', 'src/**/types/**', '**/App.vue', '**/main.ts'],
        },
        // setupFiles: ['./tests/setup.js'],
    },
})