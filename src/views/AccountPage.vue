<script lang="ts" setup>
import { FormInst } from "naive-ui";
import { ref } from "vue";
import { useChainStore } from "@/stores/chainStore";
import { connectMetaMask } from "@/utils/metamask-tool";

const chain = useChainStore();
const formValue = ref({
  userName: "",
  password: "",
  repeatPassword: "",
});
const formRef = ref<FormInst | null>(null);
const rules = {
  userName: {
    required: true,
    message: "Please enter username",
    trigger: "blur",
  },
  password: {
    required: true,
    message: "Please enter password",
    trigger: ["blur"],
  },
  repeatPassword: {
    required: true,
    message: "Please enter the password again",
    trigger: ["blur"],
  },
};

async function connect() {
  if (!chain.account) {
    const account = await connectMetaMask();
    chain.$patch({ account });
    return account;
  } else {
    return chain.account;
  }
}

function toRegist(e: MouseEvent) {
  e.preventDefault();
  formRef.value?.validate((errors) => {
    if (!errors) {
      const { userName, password, repeatPassword } = formValue.value;
      console.log(userName, password, repeatPassword);
      connect().then((account) => {
        console.log(account);
      });
    } else {
      console.log(errors);
    }
  });
}
</script>

<template>
  <div class="mx-auto w-2/3 h-full flex flex-col bg-stone-900">
    <div id="prompttitle" class="w-full h-1/4 flex">
      <span class="text-white text-5xl font-bold my-auto mx-auto">
        Register an account to play online!
      </span>
    </div>
    <div id="formcontainer" class="flex-1 flex">
      <div
        id="form"
        class="w-2/5 h-5/6 bg-stone-1000 box-shadow shadow-2xl rounded mx-auto p-8 flex"
      >
        <n-form
          class="flex-1 space-y-2"
          ref="formRef"
          label-placement="left"
          :label-width="80"
          :model="formValue"
          :rules="rules"
        >
          <div id="formtitle" class="mb-2 font-bold text-3xl text-white">
            Enter account details
          </div>
          <div class="mb-2 text-white">
            Address: {{ chain.account || "--" }}
          </div>
          <n-form-item label="" path="userName">
            <n-input
              v-model:value="formValue.userName"
              placeholder="Username"
            />
          </n-form-item>
          <n-form-item label="" path="password">
            <n-input
              v-model:value="formValue.password"
              placeholder="password"
            />
          </n-form-item>
          <n-form-item label="" path="repeatPassword">
            <n-input
              v-model:value="formValue.repeatPassword"
              placeholder="Repeat password"
            />
          </n-form-item>
          <p class="h-fit w-full text-white text-lg">
            Please note, we <span class="font-bold">cannot</span> reset your
            account if you forget your password. Make sure it's
            <span
              class="
                font-bold
                text-cyan-600
                underline
                decoration-2
                underline-offset-2
              "
              >secure</span
            >
            and write it down.
          </p>
          <n-form-item>
            <n-button
              class="bg-cyan-600 font-bold text-white"
              color="#0891b2"
              @click="toRegist"
            >
              I acknowledge and want to register
            </n-button>
          </n-form-item>
        </n-form>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
