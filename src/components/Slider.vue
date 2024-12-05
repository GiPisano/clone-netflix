<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
    imgPathFunc: {
      type: Function,
      required: true,
    },
    sliderRef: {
      type: String,
      required: true,
    },
  },
  methods: {
    scrollLeft() {
      const slider = this.$refs[this.sliderRef];
      if (slider) {
        const scrollAmount = 150;
        slider.scrollLeft -= scrollAmount;
      }
    },
    scrollRight() {
      const slider = this.$refs[this.sliderRef];
      if (slider) {
        const scrollAmount = 150;
        slider.scrollLeft += scrollAmount;
      }
    },
  },
};
</script>

<template>
  <div v-show="items.length > 0">
    <h2 class="title">{{ title }}</h2>
    <div class="container">
      <div class="slider" :ref="sliderRef">
        <div class="handle left-handle" @click="scrollLeft">
          <i class="fa-solid fa-chevron-left"></i>
        </div>
        <div v-for="item in items" :key="item.id">
          <router-link
            :to="{
              name:
                item.media_type === 'movie'
                  ? 'MovieDetails'
                  : 'TvSeriesDetails',
              params: { id: item.id },
            }"
          >
            <div class="container-img" v-if="item.poster_path !== null">
              <img :src="imgPathFunc(item)" alt="" />
            </div>
          </router-link>
        </div>

        <div class="handle right-handle" @click="scrollRight">
          <i class="fa-solid fa-chevron-right"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  position: relative;
}

.title {
  color: white;
}

.slider::-webkit-scrollbar {
  display: none;
}

.slider {
  display: flex;
  flex-grow: 1;
  scroll-behavior: smooth;
  overflow-x: auto;
  overflow-y: hidden;
  width: calc(100% - 6rem);
  -ms-overflow-style: none;
  scrollbar-width: none;
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
  right: 0;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

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
</style>
