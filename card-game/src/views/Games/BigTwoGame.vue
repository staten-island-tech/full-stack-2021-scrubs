<template>
  <div>
    <Game :lobby="lobby" :draw="draw" :playerHand="playerHand" />
  </div>
</template>

<script>
import Game from "@/components/Game.vue";

export default {
  components: {
    Game
  },
  data() {
    return {
      lobby: "/BigTwoLobby",
      draw: 13,
      playerHand: [
        {
          player: 1,
          hand: []
        },
        {
          player: 2,
          hand: []
        },
        {
          player: 3,
          hand: []
        },
        {
          player: 4,
          hand: []
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped></style>
