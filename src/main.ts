import { createApp } from "vue";
import { createPinia, Pinia } from "pinia";
import "./assets/style.scss";
import App from "./App.vue";
import { BoardValue } from "./types";

const pinia: Pinia = createPinia();

createApp(App).use(pinia).mount("#app");
