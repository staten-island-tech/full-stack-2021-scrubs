<template>
  <div>
    <Lobby :game="game" :gameType="gameType" :gameRoom="gameRoom" />
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
      gameType: "BlackJackGame",
      gameRoom: "BlackjackRoom"
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
© 2021 GitHub, Inc.