import PkView from "../views/pk/PkView.vue";
import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/home/HomeView";
import UserAccountLoginView from "../views/user/account/UserAccountLoginView";
import UserAccountRegisterView from "../views/user/account/UserAccountRegisterView";
import RanklistIndexView from "../views/ranklist/RanklistIndexView";
import NotFound from "../views/error/NotFound";
import store from "../store/index";
import UserBotIndexView from "../views/user/bot/UserBotIndexView";
import AdminView from "../views/AdminView";
import JudgeView from "../views/pk/JudgeView";
import SortOneView from "../views/pk/SortOneView";
import StarView from "../views/pk/StarView.vue";
import SortTwoView from "../views/pk/SortTwoView.vue";
import SortThreeView from "../views/pk/SortThreeView.vue";
import SortFourView from "../views/pk/SortFourView.vue";
import RankList1 from "../views/ranklist/RankList1.vue";
import RankList2 from "../views/ranklist/RankList2.vue";
import RankList3 from "../views/ranklist/RankList3.vue";
import RankList4 from "../views/ranklist/RankList4.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: {
      requestAuth: false,
    },
  },

  {
    path: "/judge",
    name: "judge",
    component: JudgeView,
    meta: {
      requestAuth: false,
    },
  },
  {
    path: "/pk/",
    name: "pk_index",
    component: PkView,
    meta: {
      requestAuth: false,
    },
  },
  {
    path: "/sortone",
    name: "sortone",
    component: SortOneView,
    meta: {
      requestAuth: false,
    },
  },
  {
    path: "/sorttwo",
    name: "sorttwo",
    component: SortTwoView,
    meta: {
      requestAuth: false,
    },
  },
  {
    path: "/sortthree",
    name: "sortthree",
    component: SortThreeView,
    meta: {
      requestAuth: false,
    },
  },
  {
    path: "/sortfour",
    name: "sortfour",
    component: SortFourView,
    meta: {
      requestAuth: false,
    },
  },
  {
    path: "/star",
    name: "star",
    children: [],
    component: StarView,
    meta: {
      requestAuth: false,
    },
  },
  {
    path: "/ranklist/",
    name: "ranklist_index",
    component: RanklistIndexView,
    meta: {
      requestAuth: false,
    },
  },
  {
    path: "/ranklist1/",
    name: "ranklist1",
    component: RankList1,
    meta: {
      requestAuth: false,
    },
  },
  {
    path: "/ranklist2/",
    name: "ranklist2",
    component: RankList2,
    meta: {
      requestAuth: false,
    },
  },
  {
    path: "/ranklist3/",
    name: "ranklist3",
    component: RankList3,
    meta: {
      requestAuth: false,
    },
  },
  {
    path: "/ranklist4/",
    name: "ranklist4",
    component: RankList4,
    meta: {
      requestAuth: false,
    },
  },
  {
    path: "/user/bot/",
    name: "user_bot_index",
    component: UserBotIndexView,
    meta: {
      requestAuth: true,
    },
  },
  {
    path: "/user/account/login/",
    name: "user_account_login",
    component: UserAccountLoginView,
    meta: {
      requestAuth: false,
    },
  },
  {
    path: "/user/account/register/",
    name: "user_account_register",
    component: UserAccountRegisterView,
    meta: {
      requestAuth: false,
    },
  },
  {
    path: "/404/",
    name: "404",
    component: NotFound,
    meta: {
      requestAuth: false,
    },
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/404/",
  },
  {
    path: "/admin",
    name: "admin_index",
    component: AdminView,
    meta: {
      requestAuth: false,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requestAuth && !store.state.user.is_login) {
    next({ name: "user_account_login" });
  } else {
    next();
  }
});

export default router;
