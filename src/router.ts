import { createWebHistory, createRouter } from "vue-router";
import Home from "./views/Home.vue";
import Category from "./views/Category.vue";
import Event from "./views/Event.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "Home", component: Home },
    { path: "/config/category", name: "Category", component: Category },
    { path: "/data/event", name: "Event", component:Event}
    //{ path: "/user-timeperiods", name: "TimePeriods", component: TimePeriods },
  ],
});

export default router;
