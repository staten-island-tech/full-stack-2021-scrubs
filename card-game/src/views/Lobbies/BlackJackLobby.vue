<template>
  <div>
    <Lobby
      v-if="!roomCreated"
      :game="game"
      :gameType="gameType"
      @code="gameCode = $event"
      @created="roomCreated = $event"
    />
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
      gameType: "BlackJackGame",
      roomCreated: false
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
