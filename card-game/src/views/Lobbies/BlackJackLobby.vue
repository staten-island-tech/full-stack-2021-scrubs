<template>
  <div>
    <Lobby :game="game" :gameType="gameType" @code="gameCode = $event" />
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
      game: "BlackJack Lobby",
      gameCode: "",
      gameType: "BlackJackGame"
    };
  },
  methods: {}
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
