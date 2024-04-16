import { createWebHistory, createRouter } from "vue-router";
import SharedRoutes from "./modules/shared/routes";
import PurchaseRoutes from "./modules/purchase/routes";
import SalesRoutes from "./modules/sales/routes";
import ProductionRoutes from "./modules/production/routes";
import WarehouseRoutes from "./modules/warehouse/routes";
import ShoopfloorRoutes from "./modules/shoopfloor/routes";

const Home = () => import("./views/Home.vue");
const Users = () => import("./views/Users.vue");
const User = () => import("./views/User.vue");
const Reports = () => import("./views/Reports.vue");

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "Home", component: Home },

    { path: "/users", name: "Users", component: Users },
    { path: "/user/:id", name: "User", component: User },
    { path: "/reports", name: "Reports", component: Reports },
    ...SharedRoutes,
    ...SalesRoutes,
    ...PurchaseRoutes,
    ...ProductionRoutes,
    ...WarehouseRoutes,
    ...ShoopfloorRoutes,
  ],
});

export default router;
