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
  store.sidebar.collapsed = !!plantStore.operator;
  store.sidebar.hideToggle = !!plantStore.operator;

  const hasOperator = !!plantStore.operator;
  const isClockInPage = to.path === "/plant/clockin";
  const isProtectedPage =
    to.path === "/plant/areas" || to.path.startsWith("/plant/workcenter");

  // Redirigir solo si es necesario para evitar loops
  if (hasOperator && isClockInPage) {
    // Usuario autenticado intenta acceder a login -> redirigir a áreas
    return next("/plant/areas");
  } else if (!hasOperator && isProtectedPage) {
    // Usuario NO autenticado intenta acceder a páginas protegidas -> redirigir a login
    return next("/plant/clockin");
  }

  // Permitir acceso en todos los demás casos
  next();
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
