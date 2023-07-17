import { createWebHistory, createRouter } from "vue-router";
import PurchaseRoutes from "./modules/purchase/routes";
import ExpenseRoutes from "./modules/expense/routes";
import ProductionRoutes from "./modules/production/routes";

const Home = () => import("./views/Home.vue");
const Users = () => import("./views/Users.vue");
const User = () => import("./views/User.vue");
const PaymentMethods = () => import("./views/PaymentMethods.vue");
const PaymentMethod = () => import("./views/PaymentMethod.vue");
const Exercise = () => import("./views/Exercise.vue");
const Exercises = () => import("./views/Exercises.vue");
const Taxes = () => import("./views/Taxes.vue");
const Tax = () => import("./views/Tax.vue");

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "Home", component: Home },

    { path: "/users", name: "Users", component: Users },
    { path: "/user/:id", name: "User", component: User },
    {
      path: "/payment-methods",
      name: "PaymentMethods",
      component: PaymentMethods,
    },
    {
      path: "/payment-methods/:id",
      name: "PaymentMethod",
      component: PaymentMethod,
      props: true,
    },
    {
      path: "/exercise",
      name: "Exercises",
      component: Exercises,
    },
    {
      path: "/exercise/:id",
      name: "Exercise",
      component: Exercise,
      props: true,
    },
    {
      path: "/taxes",
      name: "Taxes",
      component: Taxes,
    },
    {
      path: "/tax/:id",
      name: "Tax",
      component: Tax,
      props: true,
    },
    ...PurchaseRoutes,
    ...ExpenseRoutes,
    ...ProductionRoutes,
  ],
});

export default router;
