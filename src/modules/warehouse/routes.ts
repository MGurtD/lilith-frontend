import { RouteRecordRaw } from "vue-router";

const Warehouse = () => import("./views/Warehouse.vue");
const Warehouses = () => import("./views/Warehouses.vue");
const RawMaterialType = () => import("./views/ReferenceType.vue");
const RawMaterialTypes = () => import("./views/ReferenceTypes.vue");

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
