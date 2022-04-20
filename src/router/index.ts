import AccountPageVue from "@/views/AccountPage.vue";
import MainSkeletonVue from "@/views/MainSkeleton.vue";
import { createRouter, createWebHistory } from "vue-router";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: MainSkeletonVue,
    },
    {
      path: "/account",
      name: "account",
      component: AccountPageVue,
    },
  ],
});

export default router;
