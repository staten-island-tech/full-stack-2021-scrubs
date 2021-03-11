<template>
  <div class="play">
    <CardGames :game="game1" :path="router1" />
    <CardGames :game="game2" :path="router2" />
    <CardGames :game="game3" :path="router3" />
  </div>
</template>

<script>
import CardGames from "@/components/CardGames.vue";

export default {
  name: "Games",
  components: {
    CardGames
  },
  data() {
    return {
      game1: "Poker",
      game2: "Big Two",
      game3: "Blackjack",
      router1: "PokerLobby",
      router2: "BigTwoLobby",
      router3: "BlackJackLobby",
      router1Path: "/PokerLobby",
      router2Path: "/BigTwoLobby",
      router3Path: "/BlackJackLobby"
    };
  }
};
</script>
