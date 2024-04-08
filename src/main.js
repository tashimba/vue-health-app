import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";

import "vuetify/styles";
import { createVuetify } from "vuetify";

import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "@mdi/font/css/materialdesignicons.css";

import router from "./router/router.js";

import { useFoodStore } from "./stores/useFoodStore.js";
import { useDaysStore } from "./stores/useDaysStore.js";

const vuetify = createVuetify({
  components,
  directives,
});

const pinia = createPinia();

createApp(App).use(vuetify).use(router).use(pinia).mount("#app");

export const foodStore = useFoodStore();
export const daysStore = useDaysStore();
