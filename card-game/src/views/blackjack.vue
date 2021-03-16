<template>
    <div id="container">
      <input type = "text" v-on:input=" gameID = $event.target.value" placeholder="Game ID" ref="gameID"/>
      <button @click="input()">Input</button>
      <button v-on:click="connecttoGame">Connect to Game</button>
      <button v-on:click="shuffleDeck">Shuffle Deck</button>
      <button v-on:click="hit">Hit</button>
      <button v-on:click="stand">Stand</button>
      <!-- <img src="../assets/CardBack.png" /> -->
      <div id="player01hand">
      </div>
    </div>
</template>
<script>
import { deck } from "../deck/deck.js"
import {database} from "@/firebase"
var gameID = "placeholder";
var playerID = "placeholder";
const deckcodes = Object.keys(deck)
console.log(deckcodes)
export default {
  data() {
    return {  
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
        console.log(availableSlots)
        playerID = availableSlots[0]
        claimedSlots.push(playerID)
        console.log(playerID)
        availableSlots.splice(0,1);
        await database.collection(gameID).doc('players').update({availableslots: availableSlots});
        await database.collection(gameID).doc('players').update({claimedslots: claimedSlots});
      }
    },
    shuffleDeck: async function() {
      for (let i = deckcodes.length - 1; i > -1; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [deckcodes[i], deckcodes[j]] = [deckcodes[j], deckcodes[i]];
      }
      const obj = {array: deckcodes}
      await database.collection('blackjack01').doc('deck').set(obj);
      await database.collection('blackjack01').doc('player01data').update({hand: []});
      document.getElementById('player01hand').innerHTML = "";
      },
    hit: async function() {
        // const deck = database.collection("blackjack01").doc("deck");
        const loadeddeck = await database.collection("blackjack01").doc("deck").get();
        const data = loadeddeck.data();
        const draw = data["array"].slice(0,1)
        data["array"].splice(0,1);
        const obj = {array: data["array"]}
        await database.collection('blackjack01').doc('deck').set(obj);
        const playerData = await database.collection("blackjack01").doc("player01data").get();
        var playerHand = playerData.data()["hand"];
        playerHand.push(draw[0])
        console.log(playerHand)
        await database.collection('blackjack01').doc('player01data').update({hand: playerHand});
        const image = deck[playerHand[playerHand.length-1]]["image"]; 
        console.log(image)
        document.getElementById('player01hand').innerHTML = document.getElementById('player01hand').innerHTML + `<img src=${image} />`;
      },
    stand: async function() {
        const playerData = await database.collection("blackjack01").doc("player01data").get();
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