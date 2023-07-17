import { RouteRecordRaw } from "vue-router";

const Enterprise = () => import("./views/Enterprise.vue");
const Enterprises = () => import("./views/Enterprises.vue");
const Site = () => import("./views/Site.vue");
const Sites = () => import("./views/Sites.vue");
const Area = () => import("./views/area.vue");
const Areas = () => import("./views/areas.vue");
const WorkcenterType = () => import("./views/workcentertype.vue");
const WorkcenterTypes = () => import("./views/workcentertypes.vue");
const Workcenter = () => import("./views/workcenter.vue");
const Workcenters = () => import("./views/workcenters.vue");

export default [
  {
    path: "/enterprise/:id",
    name: "Enterprise",
    component: Enterprise,
  },
  {
    path: "/enterprise",
    name: "Enterprises",
    component: Enterprises,
  },
  {
    path: "/site/:id",
    name: "Site",
    component: Site,
  },
  {
    path: "/site",
    name: "Sites",
    component: Sites,
  },
  {
    path: "/area/:id",
    name: "Area",
    component: Area,
  },
  {
    path: "/area",
    name: "Areas",
    component: Areas,
  },
  {
    path: "/workcentertype/:id",
    name: "WorkcenterType",
    component: WorkcenterType,
  },
  {
    path: "/workcentertype",
    name: "WorkcenterTypes",
    component: WorkcenterTypes,
  },
  {
    path: "/workcenter/:id",
    name: "Workcenter",
    component: Workcenter,
  },
  {
    path: "/workcenter",
    name: "Workcenters",
    component: Workcenters,
  },
] as Array<RouteRecordRaw>;
