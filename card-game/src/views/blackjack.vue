<template>
  <section class="container">
    <input
      id="game-id"
      type="text"
      v-if="!connected"
      v-on:input="gameID = $event.target.value"
      placeholder="Game ID"
      ref="gameID"
    />
    <div class="pre-btns">
      <button id="input-btn" v-if="!connected" @click="input()">Input</button>
      <button id="connect-btn" v-if="!connected" v-on:click="connecttoGame">
        Connect to Game
      </button>
    </div>
    <button v-if="connected" v-on:click="shuffleDeck">Shuffle Deck</button>
    <button v-if="connected" v-on:click="hit">Hit</button>
    <button v-if="connected" v-on:click="stand">Stand</button>
    <!-- <img src="../assets/CardBack.png" /> -->
    <div v-if="connected">Deck size is: {{ deckSize }}</div>
    <div v-if="connected">Opponent hand size is: {{ opponentHandSize }}</div>
    <div id="player01hand"></div>
    <div id="player02hand"></div>
  </section>
</template>
<script>
import { deck } from "../deck/deck.js";
import { database } from "@/firebase";
var gameID = "placeholder";
var playerID = "placeholder";
const deckcodes = Object.keys(deck);
console.log(deckcodes);
export default {
  data() {
    return {
      connected: false,
      deckSize: 52,
      opponentHandSize: 0,
    };
  },
  methods: {
    input: function () {
      gameID = `blackjack${this.gameID}`;
    },
    connecttoGame: async function () {
      const playerInfo = await database.collection(gameID).doc("players").get();
      var availableSlots = playerInfo.data()["availableslots"];
      var claimedSlots = playerInfo.data()["claimedslots"];
      if (availableSlots.length !== 0) {
        playerID = availableSlots[0];
        console.log(playerID);
        this.connected = true;
        claimedSlots.push(playerID);
        availableSlots.splice(0, 1);
        await database
          .collection(gameID)
          .doc("players")
          .update({ availableslots: availableSlots });
        await database
          .collection(gameID)
          .doc("players")
          .update({ claimedslots: claimedSlots });
        const deck = database.collection(gameID).doc("deck");
        deck.onSnapshot((deckSnapshot) => {
          const data = deckSnapshot.data();
          this.deckSize = data["array"].length;
        });
        if (playerID === "player01") {
          const opponentHand = database.collection(gameID).doc("player02data");
          opponentHand.onSnapshot((opponentHandSnapshot) => {
            const data = opponentHandSnapshot.data();
            this.opponentHandSize = data["hand"].length;
          });
        } else {
          const opponentHand = database.collection(gameID).doc("player01data");
          opponentHand.onSnapshot((opponentHandSnapshot) => {
            const data = opponentHandSnapshot.data();
            this.opponentHandSize = data["hand"].length;
          });
        }
      } else {
        alert("Game is full.");
      }
    },
    shuffleDeck: async function () {
      for (let i = deckcodes.length - 1; i > -1; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [deckcodes[i], deckcodes[j]] = [deckcodes[j], deckcodes[i]];
      }
      const obj = { array: deckcodes };
      await database.collection(gameID).doc("deck").set(obj);
      await database
        .collection(gameID)
        .doc("player01data")
        .update({ hand: [] });
      await database
        .collection(gameID)
        .doc("player02data")
        .update({ hand: [] });
      document.getElementById(`${playerID}hand`).innerHTML = "";
    },
    hit: async function () {
      // const deck = database.collection("blackjack01").doc("deck");
      const loadeddeck = await database.collection(gameID).doc("deck").get();
      const data = loadeddeck.data();
      const draw = data["array"].slice(0, 1);
      data["array"].splice(0, 1);
      const obj = { array: data["array"] };
      await database.collection(gameID).doc("deck").set(obj);
      const playerData = await database
        .collection(gameID)
        .doc(`${playerID}data`)
        .get();
      var playerHand = playerData.data()["hand"];
      playerHand.push(draw[0]);
      console.log(playerHand);
      await database
        .collection(gameID)
        .doc(`${playerID}data`)
        .update({ hand: playerHand });
      const image = deck[playerHand[playerHand.length - 1]]["image"];
      console.log(image);
      document.getElementById(`${playerID}hand`).innerHTML =
        document.getElementById(`${playerID}hand`).innerHTML +
        `<img src=${image} />`;
    },
    stand: async function () {
      const playerData = await database
        .collection(gameID)
        .doc(`${playerID}data`)
        .get();
      var playerHand = playerData.data()["hand"];
      var standValue = 0;
      playerHand.forEach(function (card) {
        standValue = standValue + deck[card]["blackjack"];
      });
      console.log(standValue);
    },
  },
};
</script>
<style>
.container {
  text-align: center;
}
#game-id {
  border-radius: 10px;
  margin-top: 15%;
  background-color: rgba(35, 17, 35, 0.42);
  color: #ffd600;
  font-size: 2rem;
}
#input-btn {
  border-radius: 5px;
  background-color: rgba(35, 17, 35, 0.42);
  color: #ffd600;
  font-size: 1.6rem;
  margin-top: 5px;
}
#connect-btn {
  border-radius: 5px;
  background-color: rgba(35, 17, 35, 0.42);
  color: #ffd600;
  font-size: 1.6rem;
  margin-top: 5px;
}
</style>