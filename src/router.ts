import { createWebHistory, createRouter } from "vue-router";
import Home from "./views/Home.vue";

const Item = () => import("./views/Item.vue");
const Category = () => import("./views/Category.vue");
const EmployeeCategory = () => import("./views/EmployeeCategory.vue");
const EventStatus = () => import("./views/EventStatus.vue");

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "Home", component: Home },
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
  ],
});

export default router;
