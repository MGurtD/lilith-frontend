import { createWebHistory, createRouter } from "vue-router";

const Home = () => import("./views/Home.vue");
const Suppliers = () => import("./views/Suppliers.vue");
const Customers = () => import("./views/Customers.vue");
const Users = () => import("./views/Users.vue");
const Supplier = () => import("./views/Supplier.vue");
const SupplierType = () => import("./views/SupplierType.vue");

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "Home", component: Home },
    { path: "/customers", name: "Customers", component: Customers },
    { path: "/suppliers", name: "Suppliers", component: Suppliers },
    {
      path: "/suppliers/:id",
      name: "Supplier",
      component: Supplier,
      props: true,
    },
    {
      path: "/supplier-types/:id",
      name: "SupplierType",
      component: SupplierType,
      props: true,
    },
    { path: "/users", name: "Users", component: Users },
  ],
});

export default router;
