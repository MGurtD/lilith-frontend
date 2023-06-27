import { createWebHistory, createRouter } from "vue-router";

const Home = () => import("./views/Home.vue");
const Users = () => import("./views/Users.vue");
const User = () => import("./views/User.vue");

const PaymentMethods = () => import("./views/PaymentMethods.vue");
const PaymentMethod = () => import("./views/PaymentMethod.vue");
const Exercise = () => import("./views/Exercise.vue");
const Exercises = () => import("./views/Exercises.vue");
const Taxes = () => import("./views/Taxes.vue");
const Tax = () => import("./views/Tax.vue");

const Customers = () => import("./modules/sales/views/Customers.vue");
const Customer = () => import("./modules/sales/views/Customer.vue");
const CustomerType = () => import("./modules/sales/views/CustomerType.vue");

const Suppliers = () => import("./modules/purchase/views/Suppliers.vue");
const Supplier = () => import("./modules/purchase/views/Supplier.vue");
const SupplierType = () => import("./modules/purchase/views/SupplierType.vue");
const PurchaseInvoiceSeries = () =>
  import("./modules/purchase/views/PurchaseInvoiceSeries.vue");
const PurchaseInvoiceSerie = () =>
  import("./modules/purchase/views/PurchaseInvoiceSerie.vue");
const PurchaseInvoiceStatuses = () =>
  import("./modules/purchase/views/PurchaseInvoiceStatuses.vue");
const PurchaseInvoiceStatus = () =>
  import("./modules/purchase/views/PurchaseInvoiceStatus.vue");
const PurchaseInvoicesByDates = () =>
  import("./modules/purchase/views/PurchaseInvoicesByDates.vue");

const PurchaseInvoices = () =>
  import("./modules/purchase/views/PurchaseInvoices.vue");
const PurchaseInvoice = () =>
  import("./modules/purchase/views/PurchaseInvoice.vue");

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
    {
      path: "/purchaseinvoices-by-period",
      name: "PurchaseInvoicesByDates",
      component: PurchaseInvoicesByDates,
    },
  ],
});

export default router;
