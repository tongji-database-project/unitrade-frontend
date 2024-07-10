import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import axios from "axios";
import VueAxios from "vue-axios";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import App from "./App.vue";
import router from "./router";

const app = createApp(App)
app.use(ElementPlus);
app.use(createPinia());
app.use(router);
app.use(VueAxios, axios);
app.provide("axios", app.config.globalProperties.axios);

app.mount("#app");
