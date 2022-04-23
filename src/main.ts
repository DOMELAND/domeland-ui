import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import './index.css';
import naive from 'naive-ui'

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(naive)

app.mount("#app");
