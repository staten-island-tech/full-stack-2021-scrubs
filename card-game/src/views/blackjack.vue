<template>
    <div id="container">
      <input type = "text" v-if= "!connected" v-on:input=" gameID = $event.target.value" placeholder="Game ID" ref="gameID"/>
      <button v-if= "!connected" @click="input()">Input</button>
      <button v-if= "!connected" v-on:click="connecttoGame">Connect to Game</button>
      <button v-if= "connected" v-on:click="shuffleDeck">Shuffle Deck</button>
      <button v-if= "connected && active" v-on:click="hit">Hit</button>
      <button v-if= "connected && active" v-on:click="stand">Stand</button>
      <div v-if= "connected">Deck size is: {{deckSize}}</div>
      <div v-if= "connected">Value of your cards is: {{handValue}}</div>
      <div v-if= "connected">Opponent hand size is: {{opponentHandSize}}</div>
      <div v-if= "connected">Event log: {{eventLog}}</div>
      <div id="player01hand"></div>
      <div id="player02hand"></div>
    </div>
</template>
<script>
import { deck } from "../deck/deck.js"
import {database} from "@/firebase"
var gameID = "placeholder";
var playerID = "placeholder";
const deckcodes = Object.keys(deck)
export default {
  data() {
    return {  
      connected: false,
      active: true,
      deckSize: 52,
      handValue: 0,
      opponentHandSize: 0,
      eventLog: "",
    };
  },
  methods: {
    input: function() {
        gameID = `blackjack${this.gameID}`
    },
    connecttoGame: async function() {
      await database.collection(gameID).doc("events").update({events: []});
      // await database.collection(gameID).doc('players').update({availableslots: ["player01", "player02"]});
      // await database.collection(gameID).doc('players').update({claimedslots: []});
      const playerInfo = await database.collection(gameID).doc("players").get();
      var availableSlots = playerInfo.data()["availableslots"]
      var claimedSlots = playerInfo.data()["claimedslots"]
      if (availableSlots.length !== 0) {
        playerID = availableSlots[0]
        this.connected = true;
        claimedSlots.push(playerID)
        availableSlots.splice(0,1);
        await database.collection(gameID).doc('players').update({availableslots: availableSlots});
        await database.collection(gameID).doc('players').update({claimedslots: claimedSlots});
        const deck = database.collection(gameID).doc("deck");
        deck.onSnapshot(deckSnapshot => {
          const data = deckSnapshot.data();
          this.deckSize = data["array"].length;
        })
        if (playerID === "player01") {
          const opponentHand = database.collection(gameID).doc("player02data");
          opponentHand.onSnapshot(opponentHandSnapshot => {
          const data = opponentHandSnapshot.data();
          this.opponentHandSize = data["hand"].length;
        })
        } else {
          const opponentHand = database.collection(gameID).doc("player01data");
          opponentHand.onSnapshot(opponentHandSnapshot => {
          const data = opponentHandSnapshot.data();
          this.opponentHandSize = data["hand"].length;
        })
        }
        const events = database.collection(gameID).doc("events");
        events.onSnapshot(eventsSnapshot => {
        const data = eventsSnapshot.data();
        this.eventLog = data["events"]
        })
      } else {
        alert("Game is full.");
      }
    },
    shuffleDeck: async function() {
      for (let i = deckcodes.length - 1; i > -1; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [deckcodes[i], deckcodes[j]] = [deckcodes[j], deckcodes[i]];
      }
      const obj = {array: deckcodes}
      await database.collection(gameID).doc('deck').set(obj);
      await database.collection(gameID).doc('player01data').update({hand: []});
      await database.collection(gameID).doc('player02data').update({hand: []});
      document.getElementById(`${playerID}hand`).innerHTML = "";
      const eventsData = await database.collection(gameID).doc('events').get()
      var events = eventsData.data()["events"];
      events.push(`${playerID} shuffled the deck`)
      await database.collection(gameID).doc("events").update({events: events});
      },
    hit: async function() {
        // const deck = database.collection("blackjack01").doc("deck");
        const eventsData = await database.collection(gameID).doc('events').get()
        var events = eventsData.data()["events"];
        events.push(`${playerID} hit`)
        await database.collection(gameID).doc("events").update({events: events});
        const loadeddeck = await database.collection(gameID).doc("deck").get();
        const data = loadeddeck.data();
        const draw = data["array"].slice(0,1)
        data["array"].splice(0,1);
        const obj = {array: data["array"]}
        await database.collection(gameID).doc('deck').set(obj);
        const playerData = await database.collection(gameID).doc(`${playerID}data`).get();
        var playerHand = playerData.data()["hand"];
        playerHand.push(draw[0])
        // console.log(playerHand)
        await database.collection(gameID).doc(`${playerID}data`).update({hand: playerHand});
        const image = deck[playerHand[playerHand.length-1]]["image"]; 
        // console.log(image)
        document.getElementById(`${playerID}hand`).innerHTML = document.getElementById(`${playerID}hand`).innerHTML + `<img src=${image} />`;
        const playerDataContinued = database.collection(gameID).doc(`${playerID}data`);
        playerDataContinued.onSnapshot(playerDataContinuedSnapshot => {
          const playerHand = playerDataContinuedSnapshot.data()["hand"];
          const activePlayer = playerDataContinuedSnapshot.data()["activePlayer"];
          if (activePlayer == true) {
            this.active = true
          } else {
            this.active = false
          }
          
          // var standValue = 0;
          console.log(`Player hand is ${playerHand}`)
          playerHand.forEach((card) => {
            // console.log(card)
            console.log(deck[card])
            this.handValue = deck[card]["blackjack"];
            // deck[card]["blackjack"];
          })
        })
      },
    stand: async function() {
        const eventsData = await database.collection(gameID).doc('events').get()
        var events = eventsData.data()["events"];
        events.push(`${playerID} stood`)
        await database.collection(gameID).doc("events").update({events: events});
        const playerData = await database.collection(gameID).doc(`${playerID}data`).get();
        var playerHand = playerData.data()["hand"];
        // console.log(`Player hand is ${playerHand}`)
        var standValue = 0;
        playerHand.forEach(function(card) {
          // console.log(card)
          standValue = standValue + deck[card]["blackjack"];
        })
        console.log(standValue)
    }
    },
}
</script>
<style>
</style>