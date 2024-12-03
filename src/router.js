import { createRouter, createWebHistory } from "vue-router";
import AppMain from "./components/AppMain.vue";
import MovieDetails from "./components/MovieDetails.vue";
import TvSeriesDetails from "./components/TvSeriesDetails.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: AppMain,
  },
  {
    path: "/movie/:id",
    name: "MovieDetails",
    component: () => import("./components/MovieDetails.vue"),
    props: (route) => ({ id: route.params.id, media_type: "movie" }), // Aggiungi media_type
  },
  {
    path: "/tv/:id",
    name: "TvSeriesDetails",
    component: () => import("./components/TvSeriesDetails.vue"),
    props: (route) => ({ id: route.params.id, media_type: "tv" }), // Aggiungi media_type
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
