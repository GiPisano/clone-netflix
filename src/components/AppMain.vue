<script>
import { store } from "../store";
import Slider from "./Slider.vue";

export default {
  components: {
    Slider,
  },
  data() {
    return {
      store,
    };
  },
  methods: {
    // Generazione path copertina film e serie tv
    pathImg(production) {
      if (production.poster_path) {
        return `${store.api.imgPhat}${production.poster_path}`;
      }
    },
    // Bandiere lingua
    iconsflag(langCode) {
      const flagMap = {
        en: "/src/assets/flags/en.png",
        fr: "/src/assets/flags/fr.png",
        it: "/src/assets/flags/it.png",
        ja: "/src/assets/flags/ja.png",
        de: "/src/assets/flags/de.png",
      };
      return flagMap[langCode] || "/src/assets/flags/generalFlag.png";
    },
  },
};
</script>

<template>
  <div class="search">
    <div v-for="movie in store.movies" :key="movie.id">
      <div class="container-img" v-if="movie.poster_path !== null">
        <img :src="pathImg(movie)" alt="" />
      </div>
    </div>

    <div v-for="tvSerie in store.tvSeries" :key="tvSerie.id">
      <div class="container-img" v-if="tvSerie.poster_path !== null">
        <img :src="pathImg(tvSerie)" alt="" />
      </div>
    </div>
  </div>
  <div v-show="store.movies <= 0 && store.tvSeries <= 0">
    <Slider
      v-if="store.trendingMovies.length > 0"
      title="Trending Movies"
      :items="store.trendingMovies"
      :imgPathFunc="pathImg"
      sliderRef="trendingMovies"
    />

    <Slider
      v-if="store.topRatedMovies.length > 0"
      title="Top Rated Movies"
      :items="store.topRatedMovies"
      :imgPathFunc="pathImg"
      sliderRef="topRatedMovies"
    />

    <Slider
      v-if="store.trendingTv.length > 0"
      title="Trending Tv"
      :items="store.trendingTv"
      :imgPathFunc="pathImg"
      sliderRef="trendingTv"
    />

    <Slider
      v-if="store.upcomingMovie.length > 0"
      title="Upcoming Movies"
      :items="store.upcomingMovie"
      :imgPathFunc="pathImg"
      sliderRef="upcomingMovie"
    />

    <Slider
      v-if="store.tvOnTheAir.length > 0"
      title="Tv On The Air"
      :items="store.tvOnTheAir"
      :imgPathFunc="pathImg"
      sliderRef="tvOnTheAir"
    />
  </div>
</template>

<style lang="scss" scoped>
.search {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  .container-img {
    width: 150px;
    height: 213px;
    img {
      border-radius: 1rem;
      padding: 0.25rem;
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
