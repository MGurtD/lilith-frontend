import { createWebHistory, createRouter } from "vue-router";
import Home from "./views/Home.vue";

const Login = () => import("./views/Login.vue");

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "Home", component: Home },
    { path: "/login", name: "Login", component: Login },
    //{ path: "/config/category", name: "Category", component: Category }
  ],
});

export default router;
