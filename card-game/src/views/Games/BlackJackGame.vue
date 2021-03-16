<template>
  <div>
    <button id="leave">
      <router-link to="/BlackJackLobby">Leave</router-link>
    </button>
    <div v-if="!gameStarted" class="game-interface">
      <hr />
      {{ lobbyName }}
      <hr />
      <p v-for="(player, index) in players" :key="index">
        {{ player.name }}
      </p>
      <button @click="deal">Start</button>
    </div>
    <div v-if="gameStarted">
      <div v-for="(hands, index) in players" :key="index" class="players">
        <div v-if="hands.player">
          {{ hands.name }}
          <div v-for="cards in hands.hand" :key="cards.code">
            <img :src="`${cards.image}`" :alt="cards.code" class="card-image" />
          </div>
          <button @click="hit(hands.hand)">Hit</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { deck } from "../../deck/deck.js";
import { database } from "./firebase.js";

export default {
  name: "Game",
  data() {
    return {
      lobby: "../../views/Lobbies/BlackJackLobby.vue",
      deckV: [],
      lobbyName: "Lobby1",
      players: [
        {
          player: true,
          cardScore: 0,
          hand: [],
          name: "Player 1"
        },
        {
          player: true,
          cardScore: 0,
          hand: [],
          name: "Player 2"
        },
      ],
      gameStarted: false,
      rotation: false,
      spectate: true,
      finished: false,
      key: ""
    };
  },
  methods: {
    randomDeck() {
      return Math.floor(Math.random() * this.deckV.length);
    },
    deal() {
      let vm = this;
      vm.gameStarted = true;
      vm.deckV = [];
      deck.forEach(function(cards) {
        vm.deckV.push(cards);
      });
      vm.players.forEach(function(hands) {
        hands.hand = [];
        if (hands.player == true) {
          for (let i = 0; i < 2; i++) {
            hands.hand.push(vm.deckV[vm.randomDeck()]);
            let last = hands.hand.length - 1;
            let remove = vm.deckV.indexOf(hands.hand[last]);
            vm.deckV.splice(remove, 1);
          }
          hands.hand.forEach((card => {
            hands.cardScore += card.blackjack;
            })
          );
        }
      });
      database.collection("games").add({
        playerData: vm.players
      });
    },
    hit(playerHand) {
      playerHand.push(this.deckV[this.randomDeck()]);
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

.players {
  justify-content: space-evenly;
  font-size: 10px;
  width: 100%;
  display: flex;
}

.card-image {
  width: 30%;
}
</style>
