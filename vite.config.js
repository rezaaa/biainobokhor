import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
// https://snappfood.ir/mobile/v1/order/reorder?page=0&size=500
export default defineConfig({
  plugins: [svelte()],
  // server: {
  //   proxy: {
  //     '/order': {
  //       target: 'https://snappfood.ir/mobile/v1',
  //       changeOrigin: true,
  //       secure: false
  //     },
  //     '/user': {
  //       target: 'https://snappfood.ir/mobile/v2',
  //       changeOrigin: true,
  //       secure: false
  //     }
  //   }
  // }
})
