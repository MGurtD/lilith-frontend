import { RouteRecordRaw } from "vue-router";

const MainShopfloor = () => import("./views/Main.vue");
const WorkcenterDetail = () => import("./views/WorkcenterDetail.vue");

export default [
  {
    path: "/shopfloor",
    name: "MainShoopfloor",
    component: MainShopfloor,
  },
  {
    path: "/workcenter-detail/:id",
    name: "WorkcenterDetail",
    component: WorkcenterDetail,
    props: true,
  },
] as Array<RouteRecordRaw>;
