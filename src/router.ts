import { createWebHistory, createRouter } from "vue-router";
import Home from "./views/Home.vue";
import Category from "./views/Category.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "Home", component: Home },
    { path: "/config/category", name: "Login", component: Category },
    //{ path: "/user-timeperiods", name: "TimePeriods", component: TimePeriods },
  ],
});

export default router;
