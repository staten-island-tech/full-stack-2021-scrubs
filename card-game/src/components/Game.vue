<template>
  <div>
    <button id="leave">
      <router-link :to="lobby">Leave</router-link>
    </button>
    <div v-if="!gameStarted" class="game-interface">
      <hr />
      {{ lobbyName }}
      <hr />
      <p v-for="player in players" :key="player">
        {{ player }}
      </p>
      <button @click="deal">Start</button>
    </div>
    <!--     <div v-if="gameStarted">
      <button @click="deal">Try Again</button>
      <div v-for="(hand, index) in playerHand" :key="index" class="hand">
        Player {{ index + 1 }} Hand
        <div v-for="cards in playerHand[index].hand" :key="cards.code">
          {{ cards.value }}
          {{ cards.suit }}
          <hr />
          <img :src="cards.image" alt="cards.code" />
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
let deck = require("../deck/deck.js").deck;
export default {
  name: "Game",
  props: {
    lobby: String,
    draw: Number,
    playerHand: Array
  },
  data() {
    return {
      deck: [],
      lobbyName: "Lobby1",
      players: ["Player1", "Player2", "Player3", "Player4"],
      gameStarted: false,
      rotation: false,
      spectate: true,
      finished: false
    };
  },
  methods: {
    deal() {
      this.deck = deck;
      let randomDeal = Math.floor(Math.random() * deck.length);
      /*       console.log(this.deck);
      console.log(this.playerHand); */
      console.log(randomDeal);
    }
  }
};
</script>

<style lang="scss" scoped>
.game-interface {
  font-size: 20px;
}
#leave {
  display: block;
  text-align: left;
}
.hand {
  justify-content: space-evenly;
  font-size: 7px;
  width: 100%;
  display: flex;
}
img {
  width: 50%;
}
</style>