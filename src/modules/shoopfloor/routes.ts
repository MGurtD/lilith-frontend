import { RouteRecordRaw } from "vue-router";

const MainShopfloor = () => import("./views/Main.vue");
export default [
  {
    path: "/shopfloor",
    name: "MainShoopfloor",
    component: MainShopfloor,
  },
] as Array<RouteRecordRaw>;
