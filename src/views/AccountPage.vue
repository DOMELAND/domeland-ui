<script lang="ts" setup></script>
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
        class="w-2/5 h-5/6 bg-stone-800 box-shadow shadow-2xl rounded mx-auto p-8 flex"
      >
        <form class="flex-1 space-y-2">
          <div id="formtitle" class="mt-20 mb-2 font-bold text-3xl text-white">
            Enter account details
          </div>
          <div class="w-full">
            <input
              class="w-full rounded-lg focus:ring-1 ring-inset ring-cyan-600 placeholder:text-gray-400"
              placeholder="Username"
              name=""
              type="text"
              value=""
            />
          </div>
          <div class="w-full">
            <input
              class="w-full rounded-lg focus:ring-1 ring-inset ring-cyan-600 placeholder:text-gray-400"
              placeholder="Password"
              name=""
              type="password"
              value=""
            />
          </div>
          <div class="w-full">
            <input
              class="w-full rounded-lg focus:ring-1 ring-inset ring-cyan-600 placeholder:text-gray-400"
              placeholder="Repeat password"
              name=""
              type="password"
              value=""
            />
          </div>
          <div id="promptfooter" class="h-fit w-full text-white text-lg">
            <p>
              Please note, we <span class="font-bold">cannot</span> reset your
              account if you forget your password. Make sure it's
              <span
                class="font-bold text-cyan-600 underline decoration-2 underline-offset-2"
                >secure</span
              >
              and write it down.
            </p>
          </div>
          <div id="submit" class="w-full h-fit">
            <button class="w-full h-10 bg-cyan-600 flex rounded">
              <span class="mx-auto my-auto font-bold text-white"
                >I acknowledge and want to register</span
              >
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
