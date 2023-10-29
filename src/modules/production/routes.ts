import { RouteRecordRaw } from "vue-router";

const Enterprise = () => import("./views/Enterprise.vue");
const Enterprises = () => import("./views/Enterprises.vue");
const Site = () => import("./views/Site.vue");
const Sites = () => import("./views/Sites.vue");
const Area = () => import("./views/Area.vue");
const Areas = () => import("./views/Areas.vue");
const WorkcenterType = () => import("./views/WorkcenterType.vue");
const WorkcenterTypes = () => import("./views/WorkcenterTypes.vue");
const Workcenter = () => import("./views/Workcenter.vue");
const Workcenters = () => import("./views/Workcenters.vue");
const Workcentercost = () => import("./views/WorkcenterCost.vue");
const Workcentercosts = () => import("./views/WorkcenterCosts.vue");
const MachineStatus = () => import("./views/MachineStatus.vue");
const MachineStatuses = () => import("./views/MachineStatuses.vue");
const Operator = () => import("./views/Operator.vue");
const Operators = () => import("./views/Operators.vue");
const OperatorType = () => import("./views/OperatorType.vue");
const OperatorTypes = () => import("./views/OperatorTypes.vue");

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
  {
    path: "/workcentercost/:id",
    name: "Workcentercost",
    component: Workcentercost,
  },
  {
    path: "/workcentercost",
    name: "Workcentercosts",
    component: Workcentercosts,
  },
  {
    path: "/operatortype/:id",
    name: "Operatortype",
    component: OperatorType,
  },
  {
    path: "/operatortype",
    name: "Operatortypes",
    component: OperatorTypes,
  },
  {
    path: "/operator/:id",
    name: "Operator",
    component: Operator,
  },
  {
    path: "/operator",
    name: "Operators",
    component: Operators,
  },
  {
    path: "/machinestatus/:id",
    name: "MachineStatus",
    component: MachineStatus,
  },
  {
    path: "/machinestatus",
    name: "MachineStatuses",
    component: MachineStatuses,
  },
] as Array<RouteRecordRaw>;
