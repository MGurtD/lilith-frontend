import { RouteRecordRaw } from "vue-router";

const IncomesAndExpensesDashboard = () =>
  import("./views/IncomesAndExpensesDashboard.vue");

export default [
  {
    path: "/incomesandexpensesdashboard",
    name: "IncomesAndExpensesDashboard",
    component: IncomesAndExpensesDashboard,
    props: true,
  },
] as Array<RouteRecordRaw>;
