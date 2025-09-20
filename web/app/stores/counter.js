import { defineStore } from "pinia";

export const useCounterStore = defineStore("counter", {
  state: () => ({
    count: 0,
  }),
  actions: {
    increment() {
      this.count++;
    },
  },
  persist: true,// ✅ 啟用持久化
  // persist: {
  //   key: "my-counter", // localStorage key
  //   storage: sessionStorage, // 存在 sessionStorage
  //   paths: ["count"], // 只存 count 欄位
  // },
});
