<template>
  <div>
    <button id="leave">
      <router-link to="home">Leave</router-link>
    </button>
    <div v-if="!gameStarted" class="game-interface">
      <div>Code: {{ code }}</div>
      <p v-for="(player, index) in playerNames" :key="index">
        {{ player.name }}
      </p>
      <button
        v-if="!disableStart && playersInLobby > 1 && master === true"
        @click="start"
      >
        Start
      </button>
      <p v-if="playersInLobby <= 1">Waiting for more people to join...</p>
      <p v-if="!master">Waiting for host to start...</p>
      <p v-if="disableStart">Waiting for game to load...</p>
    </div>
    <div v-if="gameStarted">
      <div v-for="player in players" :key="player.name">
        <div v-if="player.turnOrder == 1">{{ player.name }}'s Turn</div>
      </div>
      <div v-for="(hands, index) in players" :key="index" class="players">
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
import { deck } from "@/deck/deck";
import { database } from "@/firebase.js";
export default {
  name: "Game",
  data() {
    return {
      i: 0,
      master: false,
      code: "",
      disableStart: false,
      deck: deck,
      deckV: [],
      name: "",
      playersInLobby: 0,
      playerNames: [],
      players: [
        {
          player: true,
          cardScore: 0,
          hand: [],
          name: "Player 1",
          canHit: false,
          blackJack: false,
          busted: false,
          turnOrder: null,
          played: false,
          stand: false,
          result: ""
        },
        {
          player: true,
          cardScore: 0,
          hand: [],
          name: "Player 2",
          canHit: false,
          blackJack: false,
          busted: false,
          turnOrder: null,
          played: false,
          stand: false,
          result: ""
        }
      ],
      gameStarted: false,
      finished: false,
      lobby: "../../views/blackjacklobby.vue"
    };
  },
  props: {
    gameCode: String
  },
  async mounted() {
    this.code = this.$route.params.data.code;
    this.name = this.$route.params.data.name;
    this.master = this.$route.params.data.master;
    let game = await database.collection("games").doc(`blackjack${this.code}`);
    await game.onSnapshot(async snapshot => {
      let gameLobby = await snapshot.data().lobby;
      this.playersInLobby = await gameLobby.lobbyPlayers.length;
      for (let i = 0; i < gameLobby.lobbyPlayers.length; i++) {
        if (i === 0) {
          this.playerNames = [];
        }
        this.playerNames.push(gameLobby.lobbyPlayers[i]);
      }
      console.log(this.playersInLobby);
      console.log(this.playerNames);
    });
  },
  methods: {
    start() {
      this.disableStart = true;
      this.gameStarted = true;
    },
    randomDeck() {
      return Math.floor(Math.random() * this.deckV.length);
    },
    async deal() {
      let vm = this;
      this.disableStart = true;
      await vm.reset();
      /*       await dataBase.get().then(snapshot => {
        let firestoreConsole = snapshot.data();
        vm..players = firestoreConsole.players;
        vm..deckV = firestoreConsole.deck;
      }); */
      vm.players.forEach(function(hands) {
        hands.hand = [];
        if (hands.player == true) {
          for (let i = 0; i < 2; i++) {
            hands.hand.push(vm.deckV[vm.randomDeck()]);
            let last = hands.hand.length - 1;
            let remove = vm.deckV.indexOf(hands.hand[last]);
            vm.deckV.splice(remove, 1);
          }
          hands.hand.forEach(card => {
            if (card.value == "ACE") {
              card.blackjack = 11;
            }
            hands.cardScore += card.blackjack;
          });
        }
        vm.check(hands);
      });
      this.randomizeOrder();
      /*       await dataBase.update({
        deckV: vm..deckV,
        players: vm..players,
        gameStarted: true
      });
      await dataBase.get().then(snapshot => {
        let firestoreConsole = snapshot.data();
        vm..gameStarted = firestoreConsole.gameStarted;
      }); */
    },
    async reset() {
      this.deckV = [];
      this.finished = false;
      this.gameStarted = false;
      this.players.forEach(player => {
        player.cardScore = 0;
        player.hand = [];
        player.canHit = false;
        player.blackJack = false;
        player.busted = false;
        player.turnOrder = null;
        player.played = false;
        player.stand = false;
        player.result = "";
      });
      /*       await dataBase
        .update({
          deckV: .deckV,
          finished: .finished,
          gameStarted: .gameStarted,
          players: .players
        })
        .catch(err => {
          console.log("error lol");
          console.log(err);
        }); */
    },
    async hit(playerHand) {
      let randomHit = this.deckV[this.randomDeck()];
      playerHand.hand.push(randomHit);
      let last = playerHand.hand.length - 1;
      let remove = this.deckV.indexOf(playerHand.hand[last]);
      this.deckV.splice(remove, 1);
      playerHand.cardScore +=
        playerHand.hand[playerHand.hand.length - 1].blackjack;
      playerHand.hand.forEach(card => {
        if (card.value === "ACE") {
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
        this.players.forEach(player => {
          player.turnOrder -= 1;
          if (player.turnOrder <= 0) {
            player.turnOrder = this.players.length;
          }
          if (player.turnOrder == 1 && !player.played) {
            player.canHit = true;
          }
        });
      }
      function isFinished(el) {
        return el.played === true;
      }
      if (this.players.every(isFinished)) {
        this.finished = true;
      }
      /*       await dataBase.update({
        players: this..players,
        finished: this..finished
      });
      await dataBase
        .get()
        .then(snapshot => {
          let firestoreConsole = snapshot.data();
          this..players = firestoreConsole.players;
          this..finished = firestoreConsole.finished;
        })
        .catch(err => {
          console.log("error lul");
          console.log(err);
        }); */
    },
    randomizeOrder() {
      let players = this.players.length;
      let order = [];
      for (let i = 1; i <= players; i++) {
        order.push(i);
      }
      this.players.forEach(player => {
        let random = Math.floor(Math.random() * order.length);
        player.turnOrder = order[random];
        order.splice(random, 1);
        if (player.turnOrder == 1) {
          player.canHit = true;
        }
      });
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