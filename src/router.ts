import { createWebHistory, createRouter } from "vue-router";
import SharedRoutes from "./modules/shared/routes";
import PurchaseRoutes from "./modules/purchase/routes";
import ExpenseRoutes from "./modules/expense/routes";
import SalesRoutes from "./modules/sales/routes";
import ProductionRoutes from "./modules/production/routes";

const Home = () => import("./views/Home.vue");
const Users = () => import("./views/Users.vue");
const User = () => import("./views/User.vue");

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "Home", component: Home },

    { path: "/users", name: "Users", component: Users },
    { path: "/user/:id", name: "User", component: User },
    ...SharedRoutes,
    ...SalesRoutes,
    ...PurchaseRoutes,
    ...ExpenseRoutes,
    ...ProductionRoutes,
  ],
});

export default router;
