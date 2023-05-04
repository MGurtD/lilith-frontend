import { createWebHistory, createRouter } from "vue-router";

const Home = () => import("./views/Home.vue");
const Register = () => import("./views/Register.vue");
const Suppliers = () => import("./views/Suppliers.vue");
const Customers = () => import("./views/Customers.vue");

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "Home", component: Home },
    { path: "/register", name: "Register", component: Register },
    { path: "/customers", name: "Customers", component: Customers },
    { path: "/suppliers", name: "Suppliers", component: Suppliers },
  ],
});

export default router;
