import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default ({ mode }) => {
  const apiUrl =
    mode === 'prod'
      ? 'https://qingmall-6goin5nh5aaec4fa-1304800004.ap-shanghai.service.tcloudbase.com/'
      : 'https://test-1g4eic6e66c1202d-1309122329.ap-shanghai.service.tcloudbase.com/'

  return defineConfig({
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          target: `${apiUrl}qingflow-test/v1.0/`,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
        '/search': {
          target: apiUrl,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/search/, ''),
        },
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
  })
}
