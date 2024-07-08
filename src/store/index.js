import { reactive } from "vue";

export const store = reactive({
  api: {
    apiUri: "https://api.themoviedb.org/3",
    key: "e5070052f9ec6dfe5bcf6c3d61c62c05",
    imgPhat: "https://image.tmdb.org/t/p/w342/",
  },

  movies: [],
  trendingMovies: [],
  tvSeries: [],
  trendingTv: [],
  topRatedMovies: [],
  upcomingMovie: [],
  tvOnTheAir: [],
});
