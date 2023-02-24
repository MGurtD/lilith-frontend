import { createWebHistory, createRouter } from "vue-router";
import Home from "./components/Home.vue";
//import HelloWorld from './components/HelloWorld.vue'

const Item = () => import("./components/Item.vue");
const Category = () => import("./components/Category.vue");
const EmployeeCategory = () => import("./components/EmployeeCategory.vue");
const EventStatus = () => import("./components/EventStatus.vue");
const Event = () => import("./components/Event.vue");

const routes = [
    {
        path: "/",
        name: "home",
        component: Home,
    },
    {
        path: "/config/item",
        name: "item",
        component: Item,
    },
    {
        path: "/config/category",
        name: "category",
        component: Category,
    },
    {
        path: "/config/employeecategory",
        name: "employeecategory",
        component: EmployeeCategory,
    },
    {
        path: "/config/eventstatus",
        name: "eventstatus",
        component: EventStatus
    },
    {
        path: "/data/event",
        name: "event",
        component: Event
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;