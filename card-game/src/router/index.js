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
    path: "/about",
    name: "About",
    component: () => import("../views/UserInterface/About.vue")
  },
  {
    path: "/games",
    name: "Games",
    component: () => import("../views/UserInterface/Games.vue")
  },
  {
    path: "/credits",
    name: "Credits",
    component: () => import("../views/UserInterface/Credits.vue")
  },
  {
    path: "/donate",
    name: "Donate",
    component: () => import("../views/UserInterface/Donate.vue")
  },
  {
    path: "/Pokerlobby",
    name: "PokerLobby",
    component: () => import("../views/Lobbies/PokerLobby.vue")
  },
  {
    path: "/BigTwolobby",
    name: "BigTwoLobby",
    component: () => import("../views/Lobbies/BigTwoLobby.vue")
  },
  {
    path: "/BlackJacklobby",
    name: "BlackJackLobby",
    component: () => import("../views/Lobbies/BlackJackLobby.vue")
  },
  {
    path: "/PokerGame",
    name: "PokerGame",

    component: () => import("../views/Games/PokerGame.vue")
  },
  {
    path: "/BigTwoGame",
    name: "BigTwoGame",

    component: () => import("../views/Games/BigTwoGame.vue")
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