import { createWebHistory, createRouter } from "vue-router";
import Home from "./components/Home.vue";
//import HelloWorld from './components/HelloWorld.vue'

const Item = () => import("./components/Item.vue");
const Category = () => import("./components/Category.vue");

const routes = [
    {
        path: "/",
        name: "home",
        component: Home,
    },
    {
        path: "/item",
        name: "item",
        component: Item,
    },
    {
        path: "/category",
        name: "category",
        component: Category,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;