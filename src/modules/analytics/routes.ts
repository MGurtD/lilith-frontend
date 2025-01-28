import { RouteRecordRaw } from "vue-router";

const IncomesAndExpensesDashboard = () =>
  import("./views/IncomesAndExpensesDashboard.vue");
const Dashboard = () => import("./views/Dashboard.vue");

export default [
  {
    path: "/incomesandexpensesdashboard",
    name: "IncomesAndExpensesDashboard",
    component: IncomesAndExpensesDashboard,
    props: true,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
] as Array<RouteRecordRaw>;
