import { RouteRecordRaw } from "vue-router";

const Warehouse = () => import("./views/warehouse.vue");
const Warehouses = () => import("./views/warehouses.vue");
export default [
  {
    path: "/warehouse/:id",
    name: "Warehouse",
    component: Warehouse,
  },
  {
    path: "/warehouse",
    name: "Warehouses",
    component: Warehouses,
  },
] as Array<RouteRecordRaw>;
