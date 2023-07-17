import { RouteRecordRaw } from "vue-router";

const CustomerType = () => import("./views/CustomerType.vue");
const Customers = () => import("./views/Customers.vue");
const Customer = () => import("./views/Customer.vue");

export default [
  {
    path: "/customer-types/:id",
    name: "CustomerType",
    component: CustomerType,
    props: true,
  },
  { path: "/customers", name: "Customers", component: Customers },
  {
    path: "/customers/:id",
    name: "Customer",
    component: Customer,
    props: true,
  },
] as Array<RouteRecordRaw>;
