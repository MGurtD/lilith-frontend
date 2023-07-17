import { RouteRecordRaw } from "vue-router";

const Suppliers = () => import("./views/Suppliers.vue");
const Supplier = () => import("./views/Supplier.vue");
const SupplierType = () => import("./views/SupplierType.vue");
const PurchaseInvoiceSeries = () => import("./views/PurchaseInvoiceSeries.vue");
const PurchaseInvoiceSerie = () => import("./views/PurchaseInvoiceSerie.vue");
const PurchaseInvoiceStatuses = () =>
  import("./views/PurchaseInvoiceStatuses.vue");
const PurchaseInvoiceStatus = () => import("./views/PurchaseInvoiceStatus.vue");
const PurchaseInvoicesByDates = () =>
  import("./views/PurchaseInvoicesByDates.vue");

const PurchaseInvoices = () => import("./views/PurchaseInvoices.vue");
const PurchaseInvoice = () => import("./views/PurchaseInvoice.vue");

export default [
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
    path: "/purchaseinvoiceserie",
    name: "PurchaseInvoiceSeries",
    component: PurchaseInvoiceSeries,
  },
  {
    path: "/purchaseinvoiceserie/:id",
    name: "PurchaseInvoiceSerie",
    component: PurchaseInvoiceSerie,
    props: true,
  },
  {
    path: "/purchaseinvoicestatus",
    name: "PurchaseInvoiceStatuses",
    component: PurchaseInvoiceStatuses,
  },
  {
    path: "/purchaseinvoicestatus/:id",
    name: "PurchaseInvoiceStatus",
    component: PurchaseInvoiceStatus,
    props: true,
  },
  {
    path: "/purchaseinvoice/:id",
    name: "PurchaseInvoice",
    component: PurchaseInvoice,
    props: true,
  },
  {
    path: "/purchaseinvoice",
    name: "PurchaseInvoices",
    component: PurchaseInvoices,
    props: true,
  },
  {
    path: "/purchaseinvoices-by-period",
    name: "PurchaseInvoicesByDates",
    component: PurchaseInvoicesByDates,
  },
] as Array<RouteRecordRaw>;
