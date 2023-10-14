import { RouteRecordRaw } from "vue-router";

const CustomerType = () => import("./views/CustomerType.vue");
const Customers = () => import("./views/Customers.vue");
const Customer = () => import("./views/Customer.vue");
const SalesOrders = () => import("./views/SalesOrders.vue");
const SalesOrder = () => import("./views/SalesOrder.vue");
const SalesInvoices = () => import("./views/SalesInvoices.vue");
const SalesInvoice = () => import("./views/SalesInvoice.vue");

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
  { path: "/sales-invoice", name: "SalesInvoices", component: SalesInvoices },
  {
    path: "/sales-invoice/:id",
    name: "SalesInvoice",
    component: SalesInvoice,
    props: true,
  },
  { path: "/salesorder", name: "SalesOrders", component: SalesOrders },
  { path: "/salesorder/:id", name: "SalesOrder", component: SalesOrder },
] as Array<RouteRecordRaw>;
