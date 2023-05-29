import { createWebHistory, createRouter } from "vue-router";

const Home = () => import("./views/Home.vue");
const Suppliers = () => import("./views/Suppliers.vue");
const Customers = () => import("./views/Customers.vue");
const Customer = () => import("./views/Customer.vue");
const CustomerType = () => import("./views/CustomerType.vue");
const Users = () => import("./views/Users.vue");
const User = () => import("./views/User.vue");
const Supplier = () => import("./views/Supplier.vue");
const SupplierType = () => import("./views/SupplierType.vue");

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "Home", component: Home },
    { path: "/customers", name: "Customers", component: Customers },
    {
      path: "/customers/:id",
      name: "Customer",
      component: Customer,
      props: true,
    },
    { path: "/users", name: "Users", component: Users },
    { path: "/user/:id", name: "User", component: User },
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
    {
      path: "/customer-types/:id",
      name: "CustomerType",
      component: CustomerType,
      props: true,
    },
  ],
});

export default router;
