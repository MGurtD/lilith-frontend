import { RouteRecordRaw } from "vue-router";

const MainPlant = () => import("./views/Main.vue");
const WorkcenterDetail = () => import("./views/WorkcenterDetail.vue");

export default [
  {
    path: "/plant",
    name: "MainPlant",
    component: MainPlant,
  },
  {
    path: "/plant/workcenter/:id",
    name: "WorkcenterDetail",
    component: WorkcenterDetail,
    props: true,
  },
] as Array<RouteRecordRaw>;
