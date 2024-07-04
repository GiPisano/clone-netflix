<script>
import { store } from "../store";
// import AppCard from "./AppCard.vue";

export default {
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
      } else {
        return "/src/assets/imgDefault/default.png";
      }
    },
    // Bandiere lingua
    iconsflag(langCode) {
      if (langCode == "en") {
        return "/src/assets/flags/en.png";
      }
      if (langCode == "fr") {
        return "/src/assets/flags/fr.png";
      }
      if (langCode == "it") {
        return "/src/assets/flags/it.png";
      }
      if (langCode == "ja") {
        return "/src/assets/flags/ja.png";
      }
      if (langCode == "de") {
        return "/src/assets/flags/de.png";
      }
      return "/src/assets/flags/generalFlag.png";
    },
    // Scorrimento a sinistra
    scrollLeft(sliderRef) {
      console.log("Scrolling left");
      const slider = this.$refs[sliderRef];
      if (slider) {
        console.log("Slider found", slider);
        const scrollAmount = 150;
        slider.scrollLeft -= scrollAmount;
      } else {
        console.log("Slider not found");
      }
    },
    // Scorrimento a destra
    scrollRight(sliderRef) {
      console.log("Scrolling right");
      const slider = this.$refs[sliderRef];
      if (slider) {
        console.log("Slider found", slider);
        const scrollAmount = 150;
        slider.scrollLeft += scrollAmount;
      } else {
        console.log("Slider not found");
      }
    },
  },
};
</script>

<template>
  <!-- *************** Trending Movies *************** -->
  <h2 v-show="store.trendingMovies.length > 0">Trending Movies</h2>
  <div class="container">
    <div class="slider" ref="trendingMovies">
      <div class="handle left-handle" @click="scrollLeft('trendingMovies')">
        <i class="fa-solid fa-chevron-left"></i>
      </div>
      <img
        v-for="movie in store.trendingMovies"
        :key="movie.id"
        :src="pathImg(movie)"
        alt=""
      />
      <div class="handle right-handle" @click="scrollRight('trendingMovies')">
        <div><i class="fa-solid fa-chevron-right"></i></div>
      </div>
    </div>
  </div>

  <!-- *************** Movie TopRated *************** -->
  <h2 v-show="store.topRatedMovies.length > 0">Top Rated Movies</h2>
  <div class="container">
    <div class="slider" ref="topRatedMovies">
      <div class="handle left-handle" @click="scrollLeft('topRatedMovies')">
        <i class="fa-solid fa-chevron-left"></i>
      </div>
      <img
        v-for="tv in store.topRatedMovies"
        :key="tv.id"
        :src="pathImg(tv)"
        alt=""
      />
      <div class="handle right-handle" @click="scrollRight('topRatedMovies')">
        <div><i class="fa-solid fa-chevron-right"></i></div>
      </div>
    </div>
  </div>

  <!-- *************** Trending Tv *************** -->

  <h2 v-show="store.trendingTv.length > 0">Trending Tv</h2>
  <div class="container">
    <div class="slider" ref="trendingTv">
      <div class="handle left-handle" @click="scrollLeft('trendingTv')">
        <i class="fa-solid fa-chevron-left"></i>
      </div>
      <img
        v-for="tv in store.trendingTv"
        :key="tv.id"
        :src="pathImg(tv)"
        alt=""
      />
      <div class="handle right-handle" @click="scrollRight('trendingTv')">
        <div><i class="fa-solid fa-chevron-right"></i></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  position: relative; /* Aggiungi position: relative; per posizionare gli handle all'interno */
}

.slider {
  display: flex;
  flex-grow: 1;
  scroll-behavior: smooth;
  overflow-x: auto;
  width: calc(100% - 6rem); /* considera la larghezza degli handle */
}

.handle {
  border: none;
  flex-grow: 0;
  width: 3rem;
  height: 150px;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
  margin: 0.25rem 0;
  font-size: 3rem;
  color: white;
  cursor: pointer;
  border-radius: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

.left-handle {
  left: 0;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

.right-handle {
  right: 0; /* Posiziona a destra */
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.slider > img {
  flex: 0 0 auto;
  width: 150px;
  aspect-ratio: auto;
  padding: 0.25rem;
  border-radius: 1rem;
}
</style>
