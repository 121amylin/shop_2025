// https://nuxt.com/docs/api/configuration/nuxt-config
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxt/image", "@nuxt/icon", "@nuxt/fonts", "@element-plus/nuxt",'@pinia/nuxt', 'pinia-plugin-persistedstate/nuxt',],
  vite: {
    plugins: [
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "~/assets/scss/main.scss";`,
        },
      },
    },
  },
});
