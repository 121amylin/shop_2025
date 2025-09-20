import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import AutoImport from "unplugin-auto-import/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
      imports: ["vue", "vue-router", "pinia"],
      dts: "src/auto-imports.d.ts", // 自動生成 ts 定義
    }),
    Components({
      resolvers: [ElementPlusResolver()],
      dts: "src/components.d.ts",
    }),
  ],css: {
  preprocessorOptions: {
    scss: {
      additionalData: `@use "styles/main.scss";`
    }
  },
    resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // @ 指向 src
    },
  },
    server: {
    port: 3002,
    open: true,
  },
}
});
