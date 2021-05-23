<template>
  <div class="lobbies">
    <router-link :id="route" :to="path">{{ game }}</router-link>
  </div>
</template>

<script>
export default {
  name: "CardGames",
  data() {
    return {};
  },
  props: {
    path: String,
    route: String,
    game: String
  }
};
</script>

<style lang="scss" scoped>
.lobbies {
  display: flex;
  text-align: center;
  width: 100%;
  justify-content: space-evenly;
}
img {
  width: 10%;
}
</style>
