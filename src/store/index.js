import { reactive } from "vue";

export const store = reactive({
  api: {
    apiUri: import.meta.env.VITE_API_URI,
    key: import.meta.env.VITE_API_KEY,
    imgPhat: import.meta.env.VITE_IMAGE_PATH,
  },

  movies: [],
  trendingMovies: [],
  tvSeries: [],
  trendingTv: [],
  topRatedMovies: [],
  upcomingMovie: [],
  tvOnTheAir: [],
});
