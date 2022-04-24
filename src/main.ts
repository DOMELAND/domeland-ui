import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersist from "pinia-plugin-persist";

import App from "./App.vue";
import router from "./router";
import "./index.css";
import naive from "naive-ui";

const app = createApp(App);
const pinia = createPinia();

pinia.use(piniaPluginPersist);

app.use(pinia).use(router).use(naive);

app.mount("#app");
