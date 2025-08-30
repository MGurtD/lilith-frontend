import { RouteRecordRaw } from "vue-router";

const VerifactuFindInvoices = () => import("./views/VerifactuFindInvoices.vue");
const VerifactuInvoiceIntegration = () =>
  import("./views/VerifactuInvoiceIntegration.vue");
const InvoiceIntegrationRequests = () =>
  import("./views/InvoiceIntegrationRequests.vue");

export default [
  {
    path: "/verifactu/find-invoices",
    name: "VerifactuFindInvoices",
    component: VerifactuFindInvoices,
  },
  {
    path: "/verifactu/invoice-integration",
    name: "VerifactuInvoiceIntegration",
    component: VerifactuInvoiceIntegration,
  },
  {
    path: "/verifactu/integration-requests",
    name: "InvoiceIntegrationRequests",
    component: InvoiceIntegrationRequests,
  },
] as RouteRecordRaw[];
