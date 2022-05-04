<script lang="ts" setup>
import { FormInst, FormRules } from "naive-ui";
import { ref } from "vue";
import { useChainStore } from "@/stores/chainStore";
import { connectMetaMask } from "@/utils/metamask-tool";
import createToken from "@/utils/web3-token";
import { register } from "@/api/userApi";
import ChangePwd from "./changePwd.vue";

const chain = useChainStore();
const formValue = ref({
  userName: "",
  password: "",
  repeatPassword: "",
});
const formRef = ref<FormInst | null>(null);
const showModal = ref(false);
function validatePasswordSame(rule, value): boolean {
  return value === formValue.value.password;
}
const rules: FormRules = {
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
 * Form validate
 * Connect Metamask
 * Make Token
 * Regist request
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

        register(param).then((res) => {
          // TODO success callback
        });
      });
    } else {
      console.error(errors);
    }
  });
}

function showChangePwdModel() {
  showModal.value = true;
}

function closeModal() {
  showModal.value = false;
}
</script>

<template>
  <div class="mx-auto w-2/3 h-full flex flex-col bg-stone-900">
    <div id="prompttitle" class="w-full h-1/4 flex">
      <span class="text-white text-5xl font-bold my-auto mx-auto">
        Register an account to play online!
      </span>
    </div>
    <div id="formcontainer">
      <div
        id="form"
        class="w-2/5 bg-stone-900 px-4 box-shadow shadow-2xl rounded mx-auto"
      >
        <n-form
          ref="formRef"
          :show-label="false"
          :label-width="80"
          :model="formValue"
          :rules="rules"
        >
          <div class="mb-2 text-white">
            <label class="font-bold">Address: </label
            >{{ chain.account || "--" }}
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
              type="password"
            />
          </n-form-item>
          <n-form-item label="" path="repeatPassword">
            <n-input
              v-model:value="formValue.repeatPassword"
              placeholder="Repeat password"
              type="password"
            />
          </n-form-item>
          <p
            class="h-fit w-full mt-0 mb-3 text-white text-right text-cyan-600 cursor-pointer"
            @click="showChangePwdModel"
          >
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

    <ChangePwd :show="showModal" @closeClick="closeModal" />
  </div>
</template>
<style scoped></style>
