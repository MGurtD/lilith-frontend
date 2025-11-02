<<<<<<< HEAD
import {
  RouteRecordRaw,
  NavigationGuardNext,
  RouteLocationNormalized,
} from "vue-router";
import { useStore } from "../../store";
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
  const store = useStore();
  const plantStore = usePlantStore();

  // Intentar recuperar operador de localStorage si no está en memoria
  if (!plantStore.operator) {
    await plantStore.getOperator();
  }

  // Configurar sidebar según estado del operador
  store.sidebar.collapsed = true;
  store.sidebar.hideToggle = plantStore.operator ? true : false;

  // Si existe operador y estamos en clockin, redirigir a areas
  if (plantStore.operator && to.name === "OperatorClockIn") {
    next({ name: "SiteAreas" });
  }
  // Si NO existe operador y estamos en areas, redirigir a clockin
  else if (!plantStore.operator && to.name === "SiteAreas") {
    next({ name: "OperatorClockIn" });
  }
  // Permitir acceso
  else {
    next();
  }
};

=======
import { RouteRecordRaw } from "vue-router";

const MainPlant = () => import("./views/Main.vue");
const WorkcenterDetail = () => import("./views/WorkcenterDetail.vue");

>>>>>>> origin/main
export default [
  {
    path: "/plant",
    name: "MainPlant",
    component: MainPlant,
<<<<<<< HEAD
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
    ],
=======
  },
  {
    path: "/workcenter-detail/:id",
    name: "WorkcenterDetail",
    component: WorkcenterDetail,
    props: true,
>>>>>>> origin/main
  },
] as Array<RouteRecordRaw>;
