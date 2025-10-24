import {
  RouteRecordRaw,
  NavigationGuardNext,
  RouteLocationNormalized,
} from "vue-router";
import { usePlantStore } from "./store";

const MainPlant = () => import("./views/Main.vue");
const OperatorClockIn = () => import("./views/OperatorClockIn.vue");
const SiteAreas = () => import("./views/SiteAreas.vue");
const WorkcenterDetail = () => import("./views/WorkcenterDetail.vue");

// Navigation guard para verificar operador
const checkOperatorAuth = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const plantStore = usePlantStore();

  // Intentar recuperar operador de localStorage si no está en memoria
  if (!plantStore.operator) {
    await plantStore.getOperator();
  }

  // Si existe operador y estamos en clockin, redirigir a areas
  if (plantStore.operator && to.name === "OperatorClockIn") {
    next({ name: "PlantAreas" });
  }
  // Si NO existe operador y estamos en areas, redirigir a clockin
  else if (!plantStore.operator && to.name === "PlantAreas") {
    next({ name: "OperatorClockIn" });
  }
  // Permitir acceso
  else {
    next();
  }
};

export default [
  {
    path: "/plant",
    name: "MainPlant",
    component: MainPlant,
    redirect: { name: "OperatorClockIn" },
    children: [
      {
        path: "clockin",
        name: "OperatorClockIn",
        component: OperatorClockIn,
        beforeEnter: checkOperatorAuth,
      },
      {
        path: "areas",
        name: "PlantAreas",
        component: SiteAreas,
        beforeEnter: checkOperatorAuth,
      },
    ],
  },
  {
    path: "/plant/workcenter/:id",
    name: "WorkcenterDetail",
    component: WorkcenterDetail,
    props: true,
  },
] as Array<RouteRecordRaw>;
