<template>
  <div>
    <button id="leave">
      <router-link to="/BlackJackLobby">Leave</router-link>
    </button>
    <div v-if="!serverSided.gameStarted" class="game-interface">
      <hr />
      {{ serverSided.lobbyName }}
      <hr />
      <p v-for="(player, index) in serverSided.players" :key="index">
        {{ player.name }}
      </p>
      <button v-if="!serverSided.disableStart" @click="deal">Start</button>
      <p v-if="serverSided.disableStart">Waiting for game to load...</p>
    </div>
    <div v-if="serverSided.gameStarted">
      <div v-for="player in serverSided.players" :key="player.name">
        <div v-if="player.turnOrder == 1">{{ player.name }}'s Turn</div>
      </div>
      <div
        v-for="(hands, index) in serverSided.players"
        :key="index"
        class="players"
      >
        <div v-if="hands.player">
          <div v-if="hands.turnOrder != 1 && !hands.played">
            Waiting for a player...
          </div>
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
import { db } from './firebase.js';

let dataBase = db.collection('game').doc('GOK7vK6j4yW23QRdRPv2');
export default {
  name: 'Game',
  data() {
    return {
      serverSided: {
        disableStart: false,
        deck: deck,
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
        finished: false,
        fireStoreID: '',
      },
      lobby: '../../views/Lobbies/BlackJackLobby.vue',
    };
  },
  methods: {
    randomDeck() {
      return Math.floor(Math.random() * this.serverSided.deckV.length);
    },
    async deal() {
      let vm = this;
      this.serverSided.disableStart = true;
      await vm.reset();
      await dataBase.get().then((snapshot) => {
        let firestoreConsole = snapshot.data();
        vm.serverSided.players = firestoreConsole.players;
        vm.serverSided.deckV = firestoreConsole.deck;
      });
      vm.serverSided.players.forEach(function(hands) {
        hands.hand = [];
        if (hands.player == true) {
          for (let i = 0; i < 2; i++) {
            hands.hand.push(vm.serverSided.deckV[vm.randomDeck()]);
            let last = hands.hand.length - 1;
            let remove = vm.serverSided.deckV.indexOf(hands.hand[last]);
            vm.serverSided.deckV.splice(remove, 1);
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
      await dataBase.update({
        deckV: vm.serverSided.deckV,
        players: vm.serverSided.players,
        gameStarted: true,
      });
      await dataBase.get().then((snapshot) => {
        let firestoreConsole = snapshot.data();
        vm.serverSided.gameStarted = firestoreConsole.gameStarted;
      });
    },
    async reset() {
      let serverSided = this.serverSided;
      serverSided.deckV = [];
      serverSided.finished = false;
      serverSided.gameStarted = false;
      serverSided.players.forEach((player) => {
        player.cardScore = 0;
        player.hand = [];
        player.canHit = false;
        player.blackJack = false;
        player.busted = false;
        player.turnOrder = null;
        player.played = false;
        player.stand = false;
        player.result = '';
      });
      await dataBase
        .update({
          deckV: serverSided.deckV,
          finished: serverSided.finished,
          gameStarted: serverSided.gameStarted,
          players: serverSided.players,
        })
        .catch((err) => {
          console.log('error lol');
          console.log(err);
        });
    },
    async hit(playerHand) {
      let randomHit = this.serverSided.deckV[this.randomDeck()];
      playerHand.hand.push(randomHit);
      let last = playerHand.hand.length - 1;
      let remove = this.serverSided.deckV.indexOf(playerHand.hand[last]);
      this.serverSided.deckV.splice(remove, 1);
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
    async stand(player) {
      player.canHit = false;
      player.played = true;
      player.stand = true;
      this.check(player);
    },
    async check(playerStats) {
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
        this.serverSided.players.forEach((player) => {
          player.turnOrder -= 1;
          if (player.turnOrder <= 0) {
            player.turnOrder = this.serverSided.players.length;
          }
          if (player.turnOrder == 1 && !player.played) {
            player.canHit = true;
          }
        });
      }
      function isFinished(el) {
        return el.played === true;
      }
      if (this.serverSided.players.every(isFinished)) {
        this.serverSided.finished = true;
      }
      await dataBase.update({
        players: this.serverSided.players,
        finished: this.serverSided.finished,
      });
      await dataBase
        .get()
        .then((snapshot) => {
          let firestoreConsole = snapshot.data();
          this.serverSided.players = firestoreConsole.players;
          this.serverSided.finished = firestoreConsole.finished;
        })
        .catch((err) => {
          console.log('error lul');
          console.log(err);
        });
    },
    randomizeOrder() {
      let players = this.serverSided.players.length;
      let order = [];
      for (let i = 1; i <= players; i++) {
        order.push(i);
      }
      this.serverSided.players.forEach((player) => {
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
