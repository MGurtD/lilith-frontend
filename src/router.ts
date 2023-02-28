import { createWebHistory, createRouter } from "vue-router";
//import Home from "./views/Home.vue";
import Statistics from "./views/Statistics.vue"

const Item = () => import("./views/Item.vue");
const Category = () => import("./views/Category.vue");
const EmployeeCategory = () => import("./views/EmployeeCategory.vue");
const EventStatus = () => import("./views/EventStatus.vue");
const Event = () => import("./views/Event.vue");

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "Home", component: Statistics },
    { path: "/config/category", name: "Category", component: Category },
    {
      path: "/config/employeecategory",
      name: "EmployeeCategory",
      component: EmployeeCategory,
    },
    {
      path: "/config/eventstatus",
      name: "EventStatus",
      component: EventStatus,
    },
    {
      path: "/config/item",
      name: "item",
      component: Item,
    },
    {
      path: "/data/event",
      name: "event",
      component: Event,
    },
  ],
});

export default router;