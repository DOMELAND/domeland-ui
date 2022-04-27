<script setup lang="ts">
import { ref } from "vue";
import { FormInst, FormRules } from "naive-ui";
import { useChainStore } from "@/stores/chainStore";
import { connectMetaMask } from "@/utils/metamask-tool";
import createToken from "@/utils/web3-token";
import { changePwd } from "@/api/userApi";

const props = defineProps({ show: Boolean });
const emit = defineEmits(["closeClick"]);
const chain = useChainStore();
const formValue = ref({
  password: "",
  repeatPassword: "",
});
const formRef = ref<FormInst | null>(null);
function validatePasswordSame(rule, value): boolean {
  return value === formValue.value.password;
}
const rules: FormRules = {
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

function closableModal() {
  emit("closeClick", props.show);
  formValue.value = {
    password: "",
    repeatPassword: "",
  };
}

/**
 * Form validate
 * Connect Metamask
 * Make Token
 * ChangePassword request
 */
function changePwdConfirm() {
  formRef.value?.validate((errors) => {
    if (!errors) {
      const { password } = formValue.value;
      isConnect().then(async (account) => {
        await createToken();
        const param = {
          password: password,
          ethaddr: account,
        };

        changePwd(param).then((res) => {
          closableModal();
        });
      });
    } else {
      console.error(errors);
    }
  });
}
</script>

<template>
  <div>
    <n-modal v-model:show="props.show" :mask-closable="false">
      <n-card
        class="w-2/5"
        title="Reset password"
        :bordered="false"
        size="huge"
        role="dialog"
        closable
        :segmented="{
          content: true,
        }"
        :on-close="closableModal"
      >
        <n-form
          ref="formRef"
          :show-label="false"
          :label-width="80"
          :model="formValue"
          :rules="rules"
        >
          <div class="mb-4">
            <label class="font-bold">Address: </label
            >{{ chain.account || "--" }}
          </div>

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
        </n-form>
        <template #footer>
          <div class="text-center">
            <n-button
              class="bg-cyan-600 font-bold text-white"
              color="#0891b2"
              @click="closableModal"
            >
              Cancel
            </n-button>
            <n-button
              class="bg-cyan-600 font-bold ml-10 text-white"
              color="#0891b2"
              @click="changePwdConfirm"
            >
              Confirm
            </n-button>
          </div>
        </template>
      </n-card>
    </n-modal>
  </div>
</template>

<style scoped></style>
