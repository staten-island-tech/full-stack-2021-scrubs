  
/* eslint-disable prettier/prettier */
import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/UserInterface/Home.vue";


Vue.use(VueRouter);

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((error) => { //eslint-disable-line no-unused-vars

  });
};
// eslint-disable-next-line prettier/prettier
const routes = [{
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/auth",
    name: "auth",
    component: () => import("../views/UserInterface/auth.vue")
  },
  {
    path: "/authCreate",
    name: "authCreate",
    component: () => import("../views/UserInterface/authCreate.vue")
  },
  {
    path: "/BlackJacklobby",
    name: "BlackJackLobby",
    component: () => import("../views/Lobbies/BlackJackLobby.vue")
  },
  {
    path: "/BlackJackGame",
    name: "BlackJackGame",
    component: () => import("../views/Games/BlackJackGame.vue"),
    props: true,
  },
  {
    path: "/BlackjackRoom",
    name: "BlackjackRoom",
    component: () => import("../views/Rooms/BlackjackRoom.vue"),
    props: true,
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;