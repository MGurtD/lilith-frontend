import { RouteRecordRaw } from "vue-router";

const Warehouse = () => import("./views/Warehouse.vue");
const Warehouses = () => import("./views/Warehouses.vue");
const Stocks = () => import("./views/Stocks.vue");
const StockMovements = () => import("./views/StockMovements.vue");

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
  {
    path: "/stocks",
    name: "Stocks",
    component: Stocks,
  },
  {
    path: "/stockmovement",
    name:"stockMovements",
    component: StockMovements,
  }
] as Array<RouteRecordRaw>;
