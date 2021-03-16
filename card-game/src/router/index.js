import Vue from "vue";
import VueRouter from "vue-router";
import auth from "../views/auth.vue";
import authCreate from "../views/authCreate.vue";
import signedIn from "../views/signedIn.vue";
import board from "../views/board.vue";
import blackjack from "../views/blackjack.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "blackjack",
    component: blackjack,
  },
  {
    path: "/",
    name: "board",
    component: board,
  },
  {
    path: "/",
    name: "signedIn",
    component: signedIn,
  },
  {
    path: "/",
    name: "auth",
    component: auth,
  },
  {
    path: "/",
    name: "authCreate",
    component: authCreate,
  },
  // {
  //   path: "/",
  //   name: "signedIn",
  //   component: signedIn,
  // },
  // {
  //   path: "/",
  //   name: "board",
  //   component: board,
  // },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
