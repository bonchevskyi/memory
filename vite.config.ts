import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgrPlugin from 'vite-plugin-svgr';

export default defineConfig({
    plugins: [react(), tsconfigPaths(), svgrPlugin()],
    build: {
        outDir: 'dist',
    },
    server: {
        port: 3000,
        open: false,
    },
});
