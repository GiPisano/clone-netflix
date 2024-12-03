<script>
import { store } from "../store";

export default {
  data() {
    return {
      detail: {},
    };
  },
  methods: {
    pathImg(production) {
      return `${store.api.imgPhat}${production.poster_path}`;
    },
    async fetchDetail(id, mediaType) {
      try {
        // Cambia l'endpoint in base al tipo di media (movie o tv)
        const endpoint =
          mediaType === "movie"
            ? `${store.api.apiUri}/movie/${id}?api_key=${store.api.key}`
            : `${store.api.apiUri}/tv/${id}?api_key=${store.api.key}`;

        const response = await fetch(endpoint);
        const data = await response.json();

        // Modifica i dettagli in base ai dati ricevuti
        this.detail = {
          title: data.title || data.name,
          language: data.original_language,
          vote: Math.floor(data.vote_average / 2) + 1,
          poster_path: data.poster_path,
          overview: data.overview,
          release_date: data.release_date || data.first_air_date,
        };
      } catch (error) {
        console.error("Error fetching details:", error);
      }
    },
    goBack() {
      this.$router.go(-1);
    },
  },
  created() {
    const { id, media_type } = this.$route.params; // Ottieni id e media_type dalla rotta
    this.fetchDetail(id, media_type); // Chiamata a fetchDetail con il parametro media_type
  },
};
</script>

<template>
  <div class="detail-container">
    <button @click="goBack" class="back-button">← Back</button>

    <div class="background">
      <img :src="pathImg(detail)" alt="Poster" class="background-img" />
    </div>
    <div class="content">
      <div class="poster">
        <img :src="pathImg(detail)" alt="Poster" class="poster-img" />
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
/* Gli stili sono invariati */
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
}

.background-img {
  object-fit: cover;
  width: 100%;
  height: 100%;
  filter: blur(8px);
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
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

/* Pulsante indietro */
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

/* Stile mobile responsive */
@media (max-width: 768px) {
  .content {
    flex-direction: column;
    padding: 1rem;
  }

  .poster-img {
    width: 150px;
    height: 225px;
  }

  .title {
    font-size: 2rem;
  }

  .overview {
    font-size: 1rem;
  }
}
</style>
