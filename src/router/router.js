import { createWebHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Calendar",
    component: () => import("../pages/CalendarPage.vue"),
  },
  {
    path: "/analysis",
    component: () => import("../pages/AnalysisPage.vue"),
    name: "Analysis",
  },
  {
    path: "/foods",
    component: () => import("../pages/FoodsPage.vue"),
    name: "Foods",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
