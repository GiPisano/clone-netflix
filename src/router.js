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
    component: MovieDetails,
    props: true,
  },
  {
    path: "/tv/:id",
    name: "TvSeriesDetails",
    component: TvSeriesDetails,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
