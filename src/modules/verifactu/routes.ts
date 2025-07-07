import { RouteRecordRaw } from "vue-router";

const VerifactuFindInvoices = () => import("./views/VerifactuFindInvoices.vue");

export default [
  {
    path: "/verifactu/find-invoices",
    name: "VerifactuFindInvoices",
    component: VerifactuFindInvoices,
  },
] as RouteRecordRaw[];
