import { RouteRecordRaw } from "vue-router";

const PaymentMethods = () => import("./views/PaymentMethods.vue");
const PaymentMethod = () => import("./views/PaymentMethod.vue");
const Exercise = () => import("./views/Exercise.vue");
const Exercises = () => import("./views/Exercises.vue");
const Taxes = () => import("./views/Taxes.vue");
const Tax = () => import("./views/Tax.vue");
const Lifecycles = () => import("./views/Lifecycles.vue");
const Lifecycle = () => import("./views/Lifecycle.vue");
const References = () => import("./views/References.vue");
const Reference = () => import("./views/Reference.vue");

export default [
  {
    path: "/payment-methods",
    name: "PaymentMethods",
    component: PaymentMethods,
  },
  {
    path: "/payment-methods/:id",
    name: "PaymentMethod",
    component: PaymentMethod,
    props: true,
  },
  {
    path: "/exercise",
    name: "Exercises",
    component: Exercises,
  },
  {
    path: "/exercise/:id",
    name: "Exercise",
    component: Exercise,
    props: true,
  },
  {
    path: "/taxes",
    name: "Taxes",
    component: Taxes,
  },
  {
    path: "/tax/:id",
    name: "Tax",
    component: Tax,
    props: true,
  },
  {
    path: "/lifecycle",
    name: "Lifecycles",
    component: Lifecycles,
  },
  {
    path: "/lifecycle/:id",
    name: "Lifecycle",
    component: Lifecycle,
    props: true,
  },
  { path: "/referencia", name: "References", component: References },
  {
    path: "/referencia/:id",
    name: "Referencia",
    component: Reference,
    props: true,
  },
] as Array<RouteRecordRaw>;
