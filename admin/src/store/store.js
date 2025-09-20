// src/store/store.js
import { createPinia, defineStore } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

// 建立 Pinia 實例
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

// 範例 Store
export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
    name: 'Amy',
  }),
  getters: {
    doubleCount: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count++
    },
  },
  persist: true, // 持久化整個 store
})

export default pinia
