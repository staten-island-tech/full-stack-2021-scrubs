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
      <div v-for="player in players" :key="player.name">
        <div v-if="player.turnOrder == 1">{{ player.name }}'s Turn</div>
      </div>
      <div v-for="(hands, index) in players" :key="index" class="players">
        <div v-if="hands.player">
          <div v-if="hands.turnOrder != 1">Waiting for a player...</div>
          {{ hands.name }}
          <br />
          Score: {{ hands.cardScore }}
          <br />
          <div v-if="hands.blackJack">
            BlackJack!!!
          </div>
          <div v-if="hands.busted">Busted!!!</div>
          <div v-for="cards in hands.hand" :key="cards.code">
            <img :src="cards.image" :alt="cards.code" class="card-image" />
          </div>
          <button v-if="hands.canHit" @click="hit(hands)">Hit</button>
          <button v-if="hands.canHit" @click="stand(hands)">Stand</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { deck } from '../../deck/deck.js';
/* import { database } from "./firebase.js"; */

export default {
  name: 'Game',
  data() {
    return {
      lobby: '../../views/Lobbies/BlackJackLobby.vue',
      deckV: [],
      lobbyName: 'Lobby1',
      players: [
        {
          player: true,
          cardScore: 0,
          hand: [],
          name: 'Player 1',
          canHit: false,
          blackJack: false,
          busted: false,
          turnOrder: null,
          played: false,
          stand: false,
          result: '',
        },
        {
          player: true,
          cardScore: 0,
          hand: [],
          name: 'Player 2',
          canHit: false,
          blackJack: false,
          busted: false,
          turnOrder: null,
          played: false,
          stand: false,
          result: '',
        },
      ],
      gameStarted: false,
      rotation: false,
      spectate: true,
      finished: false,
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
          hands.hand.forEach((card) => {
            if (card.value == 'ACE') {
              card.blackjack = 11;
            }
            hands.cardScore += card.blackjack;
          });
        }
        vm.check(hands);
      });
      this.randomizeOrder();
      /*       database.collection("games").add({
        playerData: vm.players
      }); */
    },
    hit(playerHand) {
      let randomHit = this.deckV[this.randomDeck()];
      playerHand.hand.push(randomHit);
      let last = playerHand.hand.length - 1;
      let remove = this.deckV.indexOf(playerHand.hand[last]);
      this.deckV.splice(remove, 1);
      playerHand.cardScore +=
        playerHand.hand[playerHand.hand.length - 1].blackjack;
      playerHand.hand.forEach((card) => {
        if (card.value === 'ACE') {
          if (playerHand.cardScore >= 21 && card.blackjack != 1) {
            playerHand.cardScore -= card.blackjack;
            card.blackjack = 1;
            playerHand.cardScore += card.blackjack;
          }
        }
      });
      this.check(playerHand);
    },
    stand(player) {
      player.canHit = false;
      player.played = true;
      player.stand = true;
      this.check(player);
    },
    check(playerStats) {
      if (playerStats.cardScore > 21) {
        playerStats.canHit = false;
        playerStats.busted = true;
        playerStats.played = true;
      } else if (playerStats.cardScore == 21) {
        playerStats.canHit = false;
        playerStats.blackJack = true;
        playerStats.played = true;
      } else if (playerStats.stand == true) {
        playerStats.canHit = false;
        playerStats.played = true;
      }
      if (playerStats.played === true) {
        this.players.forEach((player) => {
          player.turnOrder -= 1;
          if (player.turnOrder <= 0) {
            player.turnOrder = this.players.length;
          }
          if (player.turnOrder == 1 && !player.played) {
            player.canHit = true;
          }
        });
      }
    },
    randomizeOrder() {
      let players = this.players.length;
      let order = [];
      for (let i = 1; i <= players; i++) {
        order.push(i);
      }
      this.players.forEach((player) => {
        let random = Math.floor(Math.random() * order.length);
        player.turnOrder = order[random];
        order.splice(random, 1);
        if (player.turnOrder == 1) {
          player.canHit = true;
        }
      });
    },
  },
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
