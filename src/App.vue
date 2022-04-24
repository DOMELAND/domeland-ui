<script lang="ts">
import { useChainStore } from "@/stores/chainStore";
import MessageToast from "@/components/message/message-toast.vue";
import {
  checkMetaMask,
  changeChainAccount,
  getChainBalance,
} from "./utils/metamask-tool";

export default {
  components: { MessageToast },
  setup() {
    const chain = useChainStore();

    // 判断metamask是否安装
    // 若安装，则监听账户切换，账户切换后，重新获取余额
    const isMetaMask = checkMetaMask();
    if (isMetaMask) {
      changeChainAccount().then(async (account: string) => {
        chain.$patch({ account });
        const balance = await getChainBalance(account);
        chain.$patch({ balance });
      });
    }
  },
};
</script>

<template>
  <div class="w-screen h-screen">
    <n-message-provider>
      <MessageToast />
    </n-message-provider>

    <RouterView />
  </div>
</template>
<style></style>
