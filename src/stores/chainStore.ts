import { ref } from "vue";
import { defineStore } from "pinia";

export const useChainStore = defineStore("chain", function () {
  const account = ref("");
  const balance = ref("");

  return {
    account,
    balance,
  };
});
