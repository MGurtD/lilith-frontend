import {
  RouteRecordRaw,
  NavigationGuardNext,
  RouteLocationNormalized,
} from "vue-router";
import { useStore } from "../../store";
import { usePlantStore } from "./store";

const OperatorClockIn = () => import("./views/OperatorClockIn.vue");
const SiteAreas = () => import("./views/SiteAreas.vue");
const WorkcenterDetail = () => import("./views/WorkcenterDetail.vue");

// Navigation guard para verificar operador
const checkOperatorAuth = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const store = useStore();
  const plantStore = usePlantStore();

  // Intentar recuperar operador de localStorage si no está en memoria
  if (!plantStore.operator) {
    await plantStore.getOperator();
  }

  // Configurar sidebar según estado del operador
  store.sidebar.collapsed = plantStore.operator ? true : false;
  store.sidebar.hideToggle = plantStore.operator ? true : false;

  // Si existe operador y estamos en clockin, redirigir a areas
  if (plantStore.operator && to.path === "/plant/clockin") {
    next("/plant/areas");
  }
  // Si NO existe operador y estamos en areas, redirigir a clockin
  else if (!plantStore.operator && to.path === "/plant/areas") {
    next("/plant/clockin");
  }
  // Permitir acceso
  else {
    next();
  }
};

export default [
  {
    path: "/plant",
    redirect: "/plant/clockin",
  },
  {
    path: "/plant/clockin",
    name: "OperatorClockIn",
    component: OperatorClockIn,
    beforeEnter: checkOperatorAuth,
  },
  {
    path: "/plant/areas",
    name: "SiteAreas",
    component: SiteAreas,
    beforeEnter: checkOperatorAuth,
  },
  {
    path: "/plant/workcenter/:id",
    name: "WorkcenterDetail",
    component: WorkcenterDetail,
    beforeEnter: checkOperatorAuth,
    props: true,
  },
] as Array<RouteRecordRaw>;
