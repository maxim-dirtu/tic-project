import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AuthentificationView from "../views/AuthentificationView.vue";
import ListHistoryView from "../views/ListHistoryView.vue";

const routes = [
  { path: "/", name: "Home", component: HomeView },
  { path: "/authentification", name: "Authentification", component: AuthentificationView },
  { path: "/listHistory", name: "ListHistory", component: ListHistoryView },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
