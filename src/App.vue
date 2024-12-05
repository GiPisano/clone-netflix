<script>
import { store } from "./store";
import axios from "axios";

import AppHeader from "./components/AppHeader.vue";
import AppMain from "./components/AppMain.vue";

export default {
  data() {
    return {
      store,
    };
  },

  components: { AppHeader, AppMain },

  methods: {
    async fetchData(endpoint, storeProperty) {
      try {
        const response = await axios.get(`${store.api.apiUri}${endpoint}`, {
          params: {
            api_key: store.api.key,
          },
        });
        store[storeProperty] = response.data.results.map((item) => {
          return {
            id: item.id,
            title: item.title || item.name,
            original_title: item.original_title || item.original_name,
            language: item.original_language,
            vote: Math.floor(item.vote_average / 2) + 1,
            poster_path: item.poster_path,
            overview: item.overview,
            media_type: endpoint.includes("movie") ? "movie" : "tv", // Aggiungi media_type
          };
        });
      } catch (error) {
        console.error(`Failed to fetch data from ${endpoint}:`, error);
      }
    },

    performSearch(inputValue) {
      if (!inputValue) {
        // Ripristina i dati di default
        this.fetchData("/movie/popular", "trendingMovies");
        this.fetchData("/tv/popular", "trendingTv");
        this.fetchData("/movie/top_rated", "topRatedMovies");
        this.fetchData("/movie/upcoming", "upcomingMovie");
        this.fetchData("/tv/on_the_air", "tvOnTheAir");
        store.movies = []; // Pulisci i risultati di ricerca
        store.tvSeries = [];
      } else {
        // Esegui la ricerca
        this.fetchData(`/search/movie?query=${inputValue}`, "movies");
        this.fetchData(`/search/tv?query=${inputValue}`, "tvSeries");
      }
    },
  },

  created() {
    this.fetchData("/movie/popular", "trendingMovies");
    this.fetchData("/tv/popular", "trendingTv");
    this.fetchData("/movie/top_rated", "topRatedMovies");
    this.fetchData("/movie/upcoming", "upcomingMovie");
    this.fetchData("/tv/on_the_air", "tvOnTheAir");
  },
  performSearch(inputValue) {
    this.fetchData(`/search/movie?query=${inputValue}`, "movies");
    this.fetchData(`/search/tv?query=${inputValue}`, "tvSeries");
  },
};
</script>

<template>
  <div class="container">
    <app-header @search="performSearch"></app-header>
    <div class="main-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<style lang="scss">
@use "./styles/general.scss";

.container {
  overflow: hidden;
}
.main-content {
  padding-top: 85px;
  padding-bottom: 20px;
  background-color: #111;
  min-height: calc(100vh);
}
</style>
