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
    // richiesta axois per film e serie tv
    fetchMovies(inputValue) {
      axios
        .get(`${store.api.apiUri}/search/movie`, {
          params: {
            api_key: store.api.key,
            query: inputValue,
          },
        })
        .then((res) => {
          store.movies = res.data.results.map((movie) => {
            return {
              title: movie.title,
              original_title: movie.original_title,
              language: movie.original_language,
              vote: Math.floor(movie.vote_average / 2) + 1,
              poster_path: movie.poster_path,
              overview: movie.overview,
            };
          });
        });
    },

    fetchTvSeries(inputValue) {
      axios
        .get(`${store.api.apiUri}/search/tv`, {
          params: {
            api_key: store.api.key,
            query: inputValue,
          },
        })
        .then((res) => {
          store.tvSeries = res.data.results.map((tvSerie) => {
            return {
              title: tvSerie.name,
              original_title: tvSerie.original_name,
              language: tvSerie.original_language,
              vote: Math.floor(tvSerie.vote_average / 2) + 1,
              poster_path: tvSerie.poster_path,
              overview: tvSerie.overview,
            };
          });
        });
    },

    // richiesta axois per trend films
    fetchTrendingMovie() {
      axios
        .get(`${store.api.apiUri}/movie/popular`, {
          params: {
            api_key: store.api.key,
          },
        })
        .then((res) => {
          store.trendingMovies = res.data.results.map((trendingMovies) => {
            return {
              title: trendingMovies.title,
              original_title: trendingMovies.original_title,
              language: trendingMovies.original_language,
              vote: Math.floor(trendingMovies.vote_average / 2) + 1,
              poster_path: trendingMovies.poster_path,
              overview: trendingMovies.overview,
            };
          });
        });
    },

    fetchTrendingSerie() {
      axios
        .get(`${store.api.apiUri}/tv/popular`, {
          params: {
            api_key: store.api.key,
          },
        })
        .then((res) => {
          store.trendingTv = res.data.results.map((trendingTv) => {
            return {
              title: trendingTv.title,
              original_title: trendingTv.original_title,
              language: trendingTv.original_language,
              vote: Math.floor(trendingTv.vote_average / 2) + 1,
              poster_path: trendingTv.poster_path,
              overview: trendingTv.overview,
            };
          });
        });
    },

    // movie/top_rated

    fetchMovieTopRated() {
      axios
        .get(`${store.api.apiUri}/movie/top_rated`, {
          params: {
            api_key: store.api.key,
          },
        })
        .then((res) => {
          store.topRatedMovies = res.data.results.map((topRatedMovies) => {
            return {
              title: topRatedMovies.title,
              original_title: topRatedMovies.original_title,
              language: topRatedMovies.original_language,
              vote: Math.floor(topRatedMovies.vote_average / 2) + 1,
              poster_path: topRatedMovies.poster_path,
              overview: topRatedMovies.overview,
            };
          });
        });
    },
  },
  // funzione dell'input Search
  performSearch(inputValue) {
    this.fetchMovies(inputValue), this.fetchTvSeries(inputValue);
  },

  created() {
    this.fetchTrendingMovie();
    this.fetchTrendingSerie();
    this.fetchMovieTopRated();
  },
};
</script>

<template>
  <div class="container">
    <app-header @search="performSearch"></app-header>

    <app-main></app-main>
  </div>
</template>

<style lang="scss">
@use "./styles/general.scss";

.container {
  overflow: hidden;
}
</style>
