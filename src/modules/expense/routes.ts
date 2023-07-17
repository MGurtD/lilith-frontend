import { RouteRecordRaw } from "vue-router";

const ExpenseType = () => import("./views/ExpenseType.vue");
const ExpenseTypes = () => import("./views/ExpenseTypes.vue");
const Expense = () => import("./views/Expense.vue");
const Expenses = () => import("./views/Expenses.vue");
const ExpenseDashboard = () => import("./views/ExpenseDashboard.vue");

export default [
  {
    path: "/expensetype",
    name: "Expense Types",
    component: ExpenseTypes,
  },
  {
    path: "/expensetype/:id",
    name: "Expense Type",
    component: ExpenseType,
    props: true,
  },
  {
    path: "/expense",
    name: "Expenses",
    component: Expenses,
  },
  {
    path: "/expense/:id",
    name: "Expense",
    component: Expense,
    props: true,
  },
  {
    path: "/expense-dashboard",
    name: "ExpenseDashboard",
    component: ExpenseDashboard,
  },
] as Array<RouteRecordRaw>;
