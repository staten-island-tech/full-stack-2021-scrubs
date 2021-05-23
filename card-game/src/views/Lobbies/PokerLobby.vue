<template>
  <div>
    <Lobby :gameType="game" />
  </div>
</template>

<script>
import Lobby from "@/components/Lobby.vue";

export default {
  components: {
    Lobby
  },
  data() {
    return {
      game: "/PokerGame"
    };
  }
};
</script>

<style lang="scss" scoped>
div {
  font-size: 20px;
}
#games {
  text-align: left;
}
</style>
