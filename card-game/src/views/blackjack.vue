<template>
    <div id="container">
      <input type = "text" v-if= "!connected" v-on:input=" gameID = $event.target.value" placeholder="Game ID" ref="gameID"/>
      <button v-if= "!connected" @click="input()">Input</button>
      <button v-if= "!connected" v-on:click="connecttoGame">Connect to Game</button>
      <button v-if= "connected" v-on:click="shuffleDeck">Shuffle Deck</button>
      <button v-if= "connected" v-on:click="hit">Hit</button>
      <button v-if= "connected" v-on:click="stand">Stand</button>
      <!-- <img src="../assets/CardBack.png" /> -->
      <div v-if= "connected">Deck size is: {{deckSize}}</div>
      <div v-if= "connected">Opponent hand size is: {{opponentHandSize}}</div>
      <div id="player01hand"></div>
      <div id="player02hand"></div>
    </div>
</template>
<script>
import { deck } from "../deck/deck.js"
import {database} from "@/firebase"
var gameID = "placeholder";
var playerID = "placeholder";

//variables to create an array that firebase likes, though there's got to be a better way of doing this...
//const deckcodes = Object.keys(deck); array of keys from the deck.js
let deckValues = Object.values(deck).map(a => a.blackjack); //map of the card values, matches up with the keys
let deckIndex = -1;
let baseDeck = [];
Object.keys(deck).forEach(key => {
  deckIndex += 1;
  baseDeck.push({
    cardKey: key,
    cardValue: deckValues[deckIndex]
  })
});

export default {
  data() {
    return {  
      connected: false,
      deckSize: 52,
      opponentHandSize: 0
    };
  },
  methods: {
    input: function() {
        gameID = `blackjack${this.gameID}`
    },
    connecttoGame: async function() {
      const playerInfo = await database.collection(gameID).doc("players").get();
      var availableSlots = playerInfo.data()["availableslots"]
      var claimedSlots = playerInfo.data()["claimedslots"]
      if (availableSlots.length !== 0) {
        playerID = availableSlots[0]
        console.log(playerID)
        this.connected = true;
        claimedSlots.push(playerID)
        availableSlots.splice(0,1);
        await database.collection(gameID).doc('players').update({availableslots: availableSlots});
        await database.collection(gameID).doc('players').update({claimedslots: claimedSlots});
        const deck = database.collection(gameID).doc("deck");
        deck.onSnapshot(deckSnapshot => {
          const data = deckSnapshot.data();
          this.deckSize = data["array"].length;
          console.log(data);
        })
        if (playerID === "player01") {
          const opponentHand = database.collection(gameID).doc("player02data");
          opponentHand.onSnapshot(opponentHandSnapshot => {
          const data = opponentHandSnapshot.data();
          this.opponentHandSize = data["hand"].length;
          this.shuffleDeck();
        })
        } else {
          const opponentHand = database.collection(gameID).doc("player01data");
          opponentHand.onSnapshot(opponentHandSnapshot => {
          const data = opponentHandSnapshot.data();
          this.opponentHandSize = data["hand"].length;
        })
        }
      } else {
        alert("Game is full.");
      }
    },
    shuffleDeck: async function() {
      for (let i = baseDeck.length - 1; i > -1; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [baseDeck[i], baseDeck[j]] = [baseDeck[j], baseDeck[i]];
      }
      const obj = {array: baseDeck}
      await database.collection(gameID).doc('deck').set(obj);
      await database.collection(gameID).doc('player01data').update({hand: []});
      await database.collection(gameID).doc('player02data').update({hand: []});
      document.getElementById(`${playerID}hand`).innerHTML = "";
      },

    hit: async function() {
        // const deck = database.collection("blackjack01").doc("deck");
        const loadeddeck = await database.collection(gameID).doc("deck").get();
        const data = loadeddeck.data();
        console.log(data);
        const draw = data["array"].slice(0,1)
        data["array"].splice(0,1);
        const obj = {array: data["array"]}
        await database.collection(gameID).doc('deck').set(obj);
        const playerData = await database.collection(gameID).doc(`${playerID}data`).get();
        var playerHand = playerData.data()["hand"];
        playerHand.push(draw[0])
        console.log(playerHand)
        await database.collection(gameID).doc(`${playerID}data`).update({hand: playerHand});
        const image = deck[playerHand[playerHand.length-1]]["image"]; 
        console.log(image)
        document.getElementById(`${playerID}hand`).innerHTML = document.getElementById(`${playerID}hand`).innerHTML + `<img src=${image} />`;
      },

    stand: async function() {
        const playerData = await database.collection(gameID).doc(`${playerID}data`).get();
        var playerHand = playerData.data()["hand"];
        var standValue = 0;
        playerHand.forEach(function(card) {
          standValue = standValue + deck[card]["blackjack"];
        })
        console.log(standValue)
    }
    },
}
</script>
<style>
</style>