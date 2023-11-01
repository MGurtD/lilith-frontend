import { RouteRecordRaw } from "vue-router";

const Enterprise = () => import("./views/enterprise.vue");
const Enterprises = () => import("./views/enterprises.vue");
const Site = () => import("./views/site.vue");
const Sites = () => import("./views/sites.vue");
const Area = () => import("./views/area.vue");
const Areas = () => import("./views/areas.vue");
const WorkcenterType = () => import("./views/workcentertype.vue");
const WorkcenterTypes = () => import("./views/workcentertypes.vue");
const Workcenter = () => import("./views/workcenter.vue");
const Workcenters = () => import("./views/workcenters.vue");
const Workcentercost = () => import("./views/workcentercost.vue");
const Workcentercosts = () => import("./views/workcentercosts.vue");
const MachineStatus = () => import("./views/machinestatus.vue");
const MachineStatuses = () => import("./views/machinestatuses.vue");
const Operator = () => import("./views/operator.vue");
const Operators = () => import("./views/operators.vue");
const OperatorType = () => import("./views/operatortype.vue");
const OperatorTypes = () => import("./views/operatortypes.vue");

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
