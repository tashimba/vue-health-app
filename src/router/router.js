import { createWebHistory, createRouter } from "vue-router";
import MainPage from "../pages/MainPage.vue";
import AnalysisPage from "../pages/AnalysisPage.vue";
import FoodsPage from "../pages/FoodsPage.vue";

const routes = [
  {
    path: "/",
    component: MainPage,
  },
  {
    path: "/analysis",
    component: AnalysisPage,
  },
  {
    path: "/foods",
    component: FoodsPage,
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;
