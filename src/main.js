import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";

import "vuetify/styles";
import { createVuetify } from "vuetify";

import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "@mdi/font/css/materialdesignicons.css";
import { ru } from "vuetify/locale";

import router from "./router/router.js";

import { useDaysStore } from "./stores/useDaysStore.js";
import { usePersonStore } from "./stores/usePersonStore.js";

const vuetify = createVuetify({
  components,
  directives,
  locale: {
    locale: "ru",
    fallback: "ru",
    messages: { ru },
  },
});

const pinia = createPinia();

createApp(App).use(vuetify).use(router).use(pinia).mount("#app");

export const daysStore = useDaysStore();
export const personStore = usePersonStore();
