<script>
import { store } from "../store";

export default {
  data() {
    return {
      detail: {},
      trailerKey: null,
    };
  },
  methods: {
    pathImg(production) {
      return `${store.api.imgPhat}${production.poster_path}`;
    },
    async fetchDetail(id) {
      try {
        const response = await fetch(
          `${store.api.apiUri}/movie/${id}?api_key=${store.api.key}`
        );
        const data = await response.json();
        this.detail = {
          title: data.title,
          language: data.original_language,
          vote: Math.floor(data.vote_average / 2) + 1,
          poster_path: data.poster_path,
          overview: data.overview,
          release_date: data.release_date,
        };

        const videoResponse = await fetch(
          `${store.api.apiUri}/movie/${id}/videos?api_key=${store.api.key}`
        );
        const videoData = await videoResponse.json();
        const trailer = videoData.results.find(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );
        this.trailerKey = trailer ? trailer.key : null;
      } catch (error) {
        console.error("Error fetching movie details or videos:", error);
      }
    },
    goBack() {
      this.$router.go(-1);
    },
  },
  created() {
    const movieId = this.$route.params.id;
    this.fetchDetail(movieId);
  },
};
</script>

<template>
  <div class="detail-container">
    <button @click="goBack" class="back-button">← Back</button>

    <!-- Background / Video Section -->
    <div class="background">
      <template v-if="trailerKey">
        <iframe
          class="trailer"
          :src="`https://www.youtube.com/embed/${trailerKey}?autoplay=1&controls=0&loop=1&playlist=${trailerKey}`"
          frameborder="0"
          allow="autoplay; fullscreen"
          allowfullscreen
        ></iframe>
      </template>
      <template v-else>
        <img :src="pathImg(detail)" alt="Movie poster" class="background-img" />
      </template>
    </div>

    <!-- Content Section -->
    <div class="content">
      <div class="poster">
        <img :src="pathImg(detail)" alt="Movie poster" class="poster-img" />
      </div>
      <div class="info">
        <h1 class="title">{{ detail.title }}</h1>
        <p class="overview">{{ detail.overview }}</p>
        <div class="details">
          <span class="rating">{{ detail.vote }} / 5</span>
          <span v-if="detail.language" class="language">{{
            detail.language.toUpperCase()
          }}</span>
          <span class="release-date">{{ detail.release_date }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.detail-container {
  background-color: #111;
  color: #fff;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.background {
  position: relative;
  height: 50vh;
  width: 100%;
  overflow: hidden;
}

.background-img {
  object-fit: cover;
  width: 100%;
  height: 100%;
}

.trailer {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
}

.content {
  display: flex;
  flex-direction: row;
  padding: 2rem;
  position: relative;
  z-index: 1;
  flex-wrap: wrap;
}

.poster {
  margin-right: 2rem;
}

.poster-img {
  border-radius: 10px;
  object-fit: cover;
  width: 200px;
  height: 300px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.7);
}

.info {
  flex: 1;
  display: flex;
  flex-direction: column;
  max-width: 700px;
}

.title {
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.overview {
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  max-width: 700px;
  color: #b3b3b3;
}

.details {
  display: flex;
  gap: 1.5rem;
}

.details span {
  font-size: 1.2rem;
  font-weight: 600;
}

.rating {
  color: #ffcc00;
}

.language {
  color: #fff;
}

.release-date {
  color: #b3b3b3;
}

.back-button {
  background-color: transparent;
  color: #fff;
  border: 1px solid #fff;
  padding: 0.5rem 1rem;
  font-size: 1.2rem;
  cursor: pointer;
  margin: 1rem;
  border-radius: 5px;
}

.back-button:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
</style>
