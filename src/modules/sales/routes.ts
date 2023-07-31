import { RouteRecordRaw } from "vue-router";

const CustomerType = () => import("./views/CustomerType.vue");
const Customers = () => import("./views/Customers.vue");
const Customer = () => import("./views/Customer.vue");
const Referencies = () => import("./views/references.vue");
const Referencia = () => import("./views/reference.vue");

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
  { path: "/referencia", name:"References", component: Referencies },
  {
    path: "/referencia/:id",
    name: "Referencia",
    component: Referencia,
    props: true,
  },
] as Array<RouteRecordRaw>;
