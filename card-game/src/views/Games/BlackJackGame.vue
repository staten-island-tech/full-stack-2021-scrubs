<template>
  <div>
    <div class="game-interface">
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto&display=swap"
        rel="stylesheet"
      />
      <div v-if="finished === true">
        <div class="end-text" v-if="victor == 'won'">You Have Won!!!</div>
        <div class="end-text" v-else-if="victor == 'tie'">
          You Have Tied With Someone!
        </div>
        <div class="end-text" v-else-if="victor == 'lost'">
          You Have Lost :(
        </div>
        <button @click="playAgain">Play Again?</button>
      </div>
      <div
        v-for="(player, index) in players"
        :key="index"
        class="players game-text"
      >
        <div
          class="game-text"
          v-if="player.turnOrder == 1 && player.name !== name"
        >
          {{ player.name }}'s Turn
        </div>
        <div
          class="game-text"
          v-else-if="player.turnOrder == 1 && player.name === name"
        >
          Your Turn
        </div>
        <div
          class="game-text"
          v-if="
            player.turnOrder != 1 && player.name == name && finished !== true
          "
        >
          Waiting for a player...
        </div>
        <div class="game-text" v-if="player.name !== name && finished !== true">
          {{ player.name }}
          <br />
          Score: ???
        </div>
        <div class="game-text" v-else>
          You
          <br />
          Score: {{ player.cardScore }}
        </div>
        <div class="game-text" v-if="player.blackJack && player.name === name">
          BlackJack!!!
        </div>
        <div class="game-text" v-if="player.busted && player.name === name">
          Busted!!!
        </div>
        <div class="card-hand">
          <div v-for="(cards, index) in player.hand" :key="cards.code">
            <img
              v-if="index === 0 && player.name !== name && finished !== true"
              src="../../deck/images/back.png"
              alt="back"
              class="card-image"
              id="card-back"
            />
            <img
              v-else
              :src="cards.image"
              :alt="cards.code"
              class="card-image"
              id="card-front"
            />
          </div>
        </div>
        <button
          v-if="
            canHit === true &&
            player.name == name &&
            player.turnOrder === 1 &&
            busted !== true &&
            blackJack !== true &&
            finished !== true
          "
          @click="hit(player)"
        >
          Hit
        </button>
        <button
          v-if="
            (canHit === true &&
              player.name == name &&
              player.turnOrder === 1 &&
              player.played === false &&
              finished !== true) ||
            (player.busted === true &&
              player.name === name &&
              player.played === false &&
              player.turnOrder === 1 &&
              finished !== true) ||
            (player.blackJack !== true &&
              player.name === name &&
              player.played === false &&
              player.turnOrder === 1 &&
              finished !== true)
          "
          @click="stand(player)"
        >
          Stand
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { database } from "../../firebase.js";
import { deck } from "../../deck/deck.js";
export default {
  name: "Game",
  data() {
    return {
      blackJack: false,
      cardScore: 0,
      code: "",
      master: "",
      name: "",
      deck: deck,
      canHit: false,
      busted: false,
      played: false,
      finished: true,
      victor: false,
      players: [],
      lobby: "../../views/Lobbies/BlackJackLobby.vue",
      i: 0,
      gameStarted: false,
    };
  },
  async mounted() {
    this.code = this.$route.params.data.code;
    this.name = this.$route.params.data.name;
    this.master = this.$route.params.data.master;
    let game = await database.collection("games").doc(`blackjack${this.code}`);
    game.onSnapshot((snapshot) => {
      let data = snapshot.data();
      this.deck = data.deck;
      this.players = data.gamePlayers;
      this.finished = data.finished;
      data.gamePlayers.forEach((player) => {
        if (player.turnOrder === 1) {
          player.canHit = true;
          if (player.name == this.name) {
            this.canHit = true;
            this.cardScore = player.cardScore;
          }
        }
      });
      if (this.i === 0 && data.finished === true) {
        this.i = this.i + 1;
        this.determineWinner();
      }
    });
    //dealing
    if (this.master === true) {
      game.get().then((doc) => {
        let players = doc.data().gamePlayers;
        this.randomizeOrder(players);
        players.forEach((player) => {
          for (let i = 0; i < 2; i++) {
            let randomCard = this.deck[this.randomDeck()];
            player.hand.push(randomCard);
            let last = player.hand.length - 1;
            let remove = this.deck.indexOf(player.hand[last]);
            this.deck.splice(remove, 1);
            player.cardScore += randomCard.blackjack;
            this.check(player);
          }
        });
        game.update({
          deck: this.deck,
          gamePlayers: players,
        });
      });
    }
  },
  methods: {
    randomDeck() {
      return Math.floor(Math.random() * this.deck.length);
    },
    hit(playerHand) {
      let randomHit = this.deck[this.randomDeck(playerHand)];
      playerHand.hand.push(randomHit);
      let last = playerHand.hand.length - 1;
      let remove = this.deck.indexOf(playerHand.hand[last]);
      this.deck.splice(remove, 1);
      playerHand.cardScore +=
        playerHand.hand[playerHand.hand.length - 1].blackjack;
      playerHand.hand.forEach((card) => {
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
    stand(player) {
      player.stand = true;
      this.check(player);
    },
    check(playerStats) {
      if (playerStats.cardScore > 21 && playerStats.name === this.name) {
        this.canHit = false;
        this.busted = true;
        playerStats.canHit = false;
        playerStats.busted = true;
      } else if (
        playerStats.cardScore === 21 &&
        playerStats.name === this.name
      ) {
        this.canHit = false;
        this.blackJack = true;
        playerStats.canHit = false;
        playerStats.blackJack = true;
      }
      if (playerStats.stand == true) {
        this.canHit = false;
        this.played = true;
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
      function isFinished(el) {
        return el.played === true;
      }
      if (this.players.every(isFinished)) {
        this.finished = true;
        this.gameStarted = false;
        this.determineWinner();
      }
      database.collection("games").doc(`blackjack${this.code}`).update({
        gamePlayers: this.players,
        finished: this.finished,
        gameStarted: this.gameStarted,
      });
    },
    determineWinner() {
      let cardScores = [];
      let opposingVictor = false;
      let opposingBusted = false;
      this.players.forEach((player) => {
        if (player.name !== this.name) {
          if (player.blackJack === true) {
            opposingVictor = true;
          }
          if (player.busted === true) {
            opposingBusted = true;
          }
          if (player.busted !== true && player.blackJack !== true) {
            cardScores.push(player.cardScore);
          }
        }
      });
      if (
        (this.blackJack === true && opposingVictor === true) ||
        (this.busted === true &&
          opposingBusted === true &&
          opposingVictor !== true &&
          cardScores.length === 0) ||
        ((this.cardScore === Math.max(cardScores)) === true &&
          opposingVictor !== true)
      ) {
        this.victor = "tie";
      } else if (
        (this.blackJack === true && opposingVictor !== true) ||
        (this.cardScore > Math.max(cardScores) === true &&
          opposingVictor !== true &&
          this.busted !== true)
      ) {
        this.victor = "won";
      } else {
        this.victor = "lost";
      }
      this.players.forEach((player) => {
        if (player.name === this.name) {
          player.victor = this.victor;
        }
      });
      database.collection("games").doc(`blackjack${this.code}`).update({
        gamePlayers: this.players,
      });
    },
    randomizeOrder(players) {
      let totalPlayers = players.length;
      let order = [];
      for (let i = 1; i <= totalPlayers; i++) {
        order.push(i);
      }
      players.forEach((player) => {
        let random = Math.floor(Math.random() * order.length);
        player.turnOrder = order[random];
        order.splice(random, 1);
      });
    },
    async playAgain() {
      let game = await database
        .collection("games")
        .doc(`blackjack${this.code}`);
      game.get().then((doc) => {
        let lobbyPeople = doc.data().lobby.lobbyPlayers;
        lobbyPeople.push({
          master: this.master,
          name: this.name,
        });
        game.update(
          {
            lobby: {
              lobbyPlayers: lobbyPeople,
            },
          },
          {
            merge: true,
          }
        );
      });
      let data = {
        name: this.name,
        code: this.code,
        master: this.master,
      };
      this.$router.push({ name: "BlackjackRoom", params: { data } });
    },
  },
};
</script>

<style lang="scss" scoped>
.game-interface {
  height: 100vh;
  background-image: radial-gradient(
    50% 50% at 50% 50%,
    rgba(#315f48, 0.87) 0%,
    rgba(#163d2a, 0.87) 100%
  );
  font-size: 2rem;
  text-align: center;
}
.end-text {
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 3.5rem;
}
.game-text {
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 2rem;
}

#leave {
  display: block;
  text-align: left;
}
.card-hand {
  display: flex;
  justify-content: space-evenly;
}
.players {
  justify-content: space-evenly;
  font-size: 10px;
  width: 100%;
}
#card-back {
  width: 20rem;
}
#card-front {
  width: 19rem;
}
</style>