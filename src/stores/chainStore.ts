import { defineStore } from "pinia";

export const useChainStore = defineStore("chain", {
  state: () => {
    return { account: "", balance: "", token: "" };
  },
  persist: {
    enabled: true,
    // strategies: [
    //   {
    //     paths: [], // 指定要持久化的数据，默认全部
    //     storage: localStorage, // 保存位置，默认保存在sessionStorage
    //   },
    // ],
  },
});
