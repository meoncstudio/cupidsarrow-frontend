import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "home"
  },
  {
    path: "/signin",
    mame: "Signin",
    component: () => import("../views/Signin")
  },
  {
    path: "/home",
    mame: "Home",
    component: () => import("../views/Home")
  },
  {
    path: "/user",
    mame: "User",
    component: () => import("../views/User")
  },
  {
    path: "/userview",
    mame: "userview",
    component: () => import("../views/Userview")
  },
  {
    path: "/activity",
    mame: "Activity",
    component: () => import("../views/Activity")
  },
  {
    path: "*",
    component: () => import("../views/NotFound")
  }
];

const router = new VueRouter({
  routes
});

export default router;
