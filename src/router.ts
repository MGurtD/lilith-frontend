import { createWebHistory, createRouter } from "vue-router";

const Home = () => import("./views/Home.vue");
const PaymentMethods = () => import("./views/PaymentMethods.vue");
const PaymentMethod = () => import("./views/PaymentMethod.vue");
const Suppliers = () => import("./modules/purchase/views/Suppliers.vue");
const Supplier = () => import("./modules/purchase/views/Supplier.vue");
const Customers = () => import("./modules/sales/views/Customers.vue");
const Customer = () => import("./modules/sales/views/Customer.vue");
const CustomerType = () => import("./modules/sales/views/CustomerType.vue");
const Users = () => import("./views/Users.vue");
const User = () => import("./views/User.vue");
const SupplierType = () => import("./modules/purchase/views/SupplierType.vue");
const PurchaseInvoiceSeries = () =>
  import("./modules/purchase/views/PurchaseInvoiceSeries.vue");
const PurchaseInvoiceSerie = () =>
  import("./modules/purchase/views/PurchaseInvoiceSerie.vue");

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
      props: true,
    },
    {
      path: "/purchaseinvoiceserie/:id",
      name: "PurchaseInvoiceSerie",
      component: PurchaseInvoiceSerie,
      props: true,
    },
  ],
});

export default router;
