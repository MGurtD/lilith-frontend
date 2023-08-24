import { RouteRecordRaw } from "vue-router";

const CustomerType = () => import("./views/CustomerType.vue");
const Customers = () => import("./views/Customers.vue");
const Customer = () => import("./views/Customer.vue");
const SalesOrders = () => import("./views/SalesOrders.vue");
const SalesOrder = () => import("./views/SalesOrder.vue");
const References = () => import("./views/references.vue");
const Reference = () => import("./views/reference.vue");
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
  { path: "/referencia", name: "References", component: References },
  {
    path: "/referencia/:id",
    name: "Referencia",
    component: Reference,
    props: true,
  },
  { path: "/sales-invoice", name: "SalesInvoices", component: SalesInvoices },
  {
    path: "/sales-invoice/:id",
    name: "SalesInvoice",
    component: SalesInvoice,
    props: true,
  },
  { path: "/salesorder", name:"SalesOrders", component: SalesOrders },
  { path: "/salesorder/:id", name:"SalesOrder", component: SalesOrder },
] as Array<RouteRecordRaw>;

