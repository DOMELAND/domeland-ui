import { createRouter, createWebHistory } from "vue-router";
import Skeleton from '@/views/MainSkeleton.vue';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Skeleton,
    },
  ],
});

export default router;
