<script lang="ts" setup>
import { FormInst } from "naive-ui";
import { ref } from "vue";
import { useChainStore } from "@/stores/chainStore";
import { connectMetaMask } from "@/utils/metamask-tool";
import createToken from "@/utils/web3-token";
import { register } from "@/api/userApi";

const chain = useChainStore();
const formValue = ref({
  userName: "",
  password: "",
  repeatPassword: "",
});
const formRef = ref<FormInst | null>(null);
function validatePasswordSame(rule, value): boolean {
  return value === formValue.value.password;
}
const rules = {
  userName: [
    {
      required: true,
      message: "Please enter username",
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: "Please enter password",
      trigger: ["blur"],
    },
  ],
  repeatPassword: [
    {
      required: true,
      message: "Please enter the password again",
      trigger: ["blur"],
    },
    {
      validator: validatePasswordSame,
      message: "The two passwords are inconsistent",
      trigger: ["blur", "password-input"],
    },
  ],
};

async function isConnect() {
  if (!chain.account) {
    const account = await connectMetaMask();
    chain.$patch({ account });
    return account;
  } else {
    return chain.account;
  }
}

/**
 * 表单校验
 * metamask连接
 * 生成token
 * 发送请求
 */
function toRegist(e: MouseEvent) {
  e.preventDefault();
  formRef.value?.validate((errors) => {
    if (!errors) {
      const { userName, password } = formValue.value;
      isConnect().then(async (account) => {
        await createToken();
        const param = {
          username: userName,
          password: password,
          ethaddr: account,
        };

        register(param).then((res) => {});
      });
    } else {
      console.error(errors);
    }
  });
}
</script>

<template>
  <div class="mx-auto h-full flex flex-col bg-stone-900">
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
          class="flex-1"
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
          <p class="h-fit w-full mt-0 mb-3 text-white text-right text-cyan-600">
            Forgot your password?
          </p>
          <n-form-item>
            <n-button
              class="w-full bg-cyan-600 font-bold text-white"
              color="#0891b2"
              @click="toRegist"
            >
              Sign up
            </n-button>
          </n-form-item>
        </n-form>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
