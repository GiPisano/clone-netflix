<script>
export default {
  data() {
    return {
      inputValue: "",
    };
  },

  emits: ["search"],
};
</script>

<template>
  <div class="header">
    <RouterLink to="/">
      <h2>Boolflix</h2>
    </RouterLink>

    <div>
      <input
        v-model="inputValue"
        @keyup="$emit('search', this.inputValue)"
        type="text"
        placeholder="Search.."
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  width: 100%;

  background-color: black;
  color: white;
  height: 65px;
  // position: fixed;
  // z-index: 1;

  h2 {
    color: red;
    font-size: 30px;
    font-family: Georgia, serif;
  }

  input {
    width: 200px;
    height: 30px;
    font-size: 15px;
    padding: 5px;
  }
}
</style>
