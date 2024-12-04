<script>
export default {
  data() {
    return {
      inputValue: "",
    };
  },

  methods: {
    clearInputAndGoHome() {
      this.inputValue = ""; // Svuota l'input
      this.$router.push({ path: "/", query: {} }); // Torna alla home
      // Resetta i risultati della ricerca
      this.$emit("search", ""); // Emesso per far ripristinare i dati di default
    },

    // Metodo per gestire il tasto Invio
    handleKeyup(event) {
      if (event.key === "Enter") {
        this.$emit("search", this.inputValue); // Emette la ricerca
      }
    },
  },
};
</script>

<template>
  <div class="header">
    <RouterLink to="/" @click="clearInputAndGoHome">
      <h2>Boolflix</h2>
    </RouterLink>

    <div class="search-container">
      <input
        v-model="inputValue"
        @keyup="handleKeyup"
        type="text"
        placeholder="Search..."
        class="search-input"
      />
      <i class="fa-solid fa-search search-icon"></i>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  width: 100%;
  background-color: black;
  color: white;
  height: 65px;
  position: fixed;
  z-index: 100;

  h2 {
    color: red;
    font-size: 30px;
    font-family: "Georgia", serif;
    text-transform: uppercase;
    letter-spacing: 2px;
    cursor: pointer;
    white-space: nowrap;
  }

  .search-container {
    display: flex;
    align-items: center;
    position: relative;

    .search-input {
      width: 250px;
      height: 40px;
      font-size: 16px;
      padding: 0 10px 0 40px;
      border-radius: 25px;
      border: 1px solid #ccc;
      background-color: #333;
      color: white;
      transition: all 0.3s ease;
      outline: none;

      &:focus {
        border-color: red;
        background-color: #444;
      }

      &::placeholder {
        color: #bbb;
      }
    }

    .search-icon {
      position: absolute;
      left: 10px;
      font-size: 18px;
      color: #bbb;
      transition: all 0.3s ease;
    }
  }

  @media (max-width: 480px) {
    h2 {
      font-size: 20px;
      letter-spacing: 0px;
      padding-right: 10px;
    }

    .search-container {
      .search-input {
        width: 180px;
      }
    }
  }
}
</style>
