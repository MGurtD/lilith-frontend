import { RouteRecordRaw } from "vue-router";

const Warehouse = () => import("./views/warehouse.vue");
const Warehouses = () => import("./views/warehouses.vue");
const RawMaterialType = () => import("./views/rawmaterialtype.vue");
const RawMaterialTypes = () => import("./views/rawmaterialtypes.vue");

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
    path: "/rawmaterialtype",
    name: "Rawmaterialtypes",
    component: RawMaterialTypes,
  },
  {
    path: "/rawmaterialtype/:id",
    name: "Rawmaterialtype",
    component: RawMaterialType,
  },
] as Array<RouteRecordRaw>;
