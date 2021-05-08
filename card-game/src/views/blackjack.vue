<template>
    <div id="container">
      <input type = "text" v-if= "!connected && !pending" v-on:input=" gameID = $event.target.value" placeholder="Game ID" ref="gameID"/>
      <button v-if= "!connected && !pending" @click="input()">Input</button>
      <button v-if= "!connected && !pending" v-on:click="connecttoGame">Connect to Game</button>
      <!-- Shuffle functionality is obsolete -->
      <!-- <button v-if= "connected && active" v-on:click="shuffleDeck">Shuffle Deck</button> -->
      <button v-if= "connected && active && !standing && !gameOver" v-on:click="hit">Hit</button>
      <button v-if= "connected && active && !standing && !gameOver" v-on:click="stand">Stand</button>
      <button v-if= "gameOver" v-on:click="restart">Play again</button>
      <div v-if= "pending">Waiting for more players to connect</div>
      <div v-if= "connected && !gameOver">Deck size is: {{deckSize}}</div>
      <div v-if= "connected && !gameOver">You are active is: {{active}}</div>
      <div v-if= "connected && !gameOver">Value of your cards is: {{handValue}}</div>
      <div v-if= "connected && !gameOver">Opponent hand size is: {{opponentHandSize}}</div>
      <div v-if= "connected && !gameOver">Event log: {{eventLog}}</div>
      <div v-if= "gameOver">{{result}}</div>
      <div v-if= "connected" id="player01hand"></div>
      <div v-if= "connected" id="player02hand"></div>
    </div>
</template>
<script>
import { deck } from "../deck/deck.js"
import {database} from "@/firebase"
var gameID = "placeholder";
var playerID = "placeholder";
const deckcodes = Object.keys(deck)
var opponentID;
// var result;

// async function gameEnd() {
//   // await database.collection(gameID).doc("players").update({standingplayers: ["player01", "player02"]});
//   // if (playerID == "player01") {
//   //   opponentID = "player02";
//   // } else if (playerID == "player02") {
//   //   opponentID = "player01";
//   // }
//   const playerData = await database.collection(gameID).doc(`${playerID}data`).get();
//   var playerHand = playerData.data()["hand"];
//   var playerHandValue = 0
//   playerHand.forEach(function(card) {
//     playerHandValue = playerHandValue + deck[card]["blackjack"];
//   })
//   const opponentData = await database.collection(gameID).doc(`${opponentID}data`).get();
//   var opponentHand = opponentData.data()["hand"];
//   var opponentHandValue = 0
//   opponentHand.forEach(function(card) {
//     opponentHandValue = opponentHandValue + deck[card]["blackjack"];
//   })

//   const players = await database.collection(gameID).doc("players").get();
//   var standingPlayers = players.data()["standingplayers"]

//   if (playerHandValue > 21 && standingPlayers.length !== 2) {
//     await database.collection(gameID).doc("players").update({standingplayers: ["player01", "player02"]});
//   }
//   // console.log(`winner breakdown. opp hand value is: ${opponentHandValue}. hand value is ${playerHandValue}`)
//   if (playerHandValue > 21) {
//     return `${opponentID} has won.`;
//   } else if (opponentHandValue > 21) {
//     return `${playerID} has won.`;
//   } else if (opponentHandValue > playerHandValue) {
//     return `${opponentID} has won.`;
//   } else if (playerHandValue > opponentHandValue) {
//     return `${playerID} has won.`;
//   } else if (opponentHandValue == playerHandValue) {
//     return "It's a tie."; 
//   }
// }
export default {
  data() {
    return {
      pending: false,  
      connected: false,
      active: true,
      standing: false,
      gameOver: false,
      deckSize: 52,
      handValue: 0,
      opponentHandSize: 0,
      eventLog: "",
      result: "",
      winner: "",
    };
  },
  methods: {
    gameEnd: async function() {
    // await database.collection(gameID).doc("players").update({standingplayers: ["player01", "player02"]});
    // if (playerID == "player01") {
    //   opponentID = "player02";
    // } else if (playerID == "player02") {
    //   opponentID = "player01";
    // }
    const playerData = await database.collection(gameID).doc(`${playerID}data`).get();
    var playerHand = playerData.data()["hand"];
    var playerHandValue = 0
    playerHand.forEach(function(card) {
      playerHandValue = playerHandValue + deck[card]["blackjack"];
    })
    if (playerHandValue > 21) {
      playerHandValue = 0;
      playerHand.forEach(function(card) {
        if (deck[card]["value"] == "ACE") {
          playerHandValue = playerHandValue + 1;
        } else {
          playerHandValue = playerHandValue + deck[card]["blackjack"];
        }
    })
    }
    const opponentData = await database.collection(gameID).doc(`${opponentID}data`).get();
    var opponentHand = opponentData.data()["hand"];
    var opponentHandValue = 0
    opponentHand.forEach(function(card) {
      opponentHandValue = opponentHandValue + deck[card]["blackjack"];
    })
    if (opponentHandValue > 21) {
      opponentHandValue = 0;
      opponentHand.forEach(function(card) {
        if (deck[card]["value"] == "ACE") {
          opponentHandValue = opponentHandValue + 1;
        } else {
          opponentHandValue = opponentHandValue + deck[card]["blackjack"];
        }
    })
    }

    const players = await database.collection(gameID).doc("players").get();
    var standingPlayers = players.data()["standingplayers"]

    if (playerHandValue > 21 && standingPlayers.length !== 2) {
      await database.collection(gameID).doc("players").update({standingplayers: ["player01", "player02"]});
    }
    // console.log(`winner breakdown. opp hand value is: ${opponentHandValue}. hand value is ${playerHandValue}`)
    if (playerHandValue > 21) {
      this.result = `${opponentID} has won.`;
    } else if (opponentHandValue > 21) {
      this.result =  `${playerID} has won.`;
    } else if (opponentHandValue > playerHandValue) {
      this.result =  `${opponentID} has won.`;
    } else if (playerHandValue > opponentHandValue) {
      this.result =  `${playerID} has won.`;
    } else if (opponentHandValue == playerHandValue) {
      this.result = "It's a tie."; 
    }
    },
    input: function() {
        gameID = `blackjack${this.gameID}`
    },
    connecttoGame: async function() {
      await database.collection(gameID).doc("players").update({standingplayers: []});
      await database.collection(gameID).doc("players").update({nonactiveplayer: "player02"});
      await database.collection(gameID).doc("events").update({events: []});
      // Temp for ease of reset testing
      var resetPlayers = await database.collection(gameID).doc("players").get();
      resetPlayers = resetPlayers.data()["availableslots"];
      if (resetPlayers == 0) {
        await database.collection(gameID).doc('players').update({availableslots: ["player01", "player02"]});
        await database.collection(gameID).doc('players').update({claimedslots: []});
      }
      // await database.collection(gameID).doc('players').update({availableslots: ["player01"]});
      // Temp ends
      for (let i = deckcodes.length - 1; i > -1; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [deckcodes[i], deckcodes[j]] = [deckcodes[j], deckcodes[i]];
      }
      const obj = {array: deckcodes}
      await database.collection(gameID).doc('deck').set(obj);
      await database.collection(gameID).doc('player01data').update({hand: []});
      await database.collection(gameID).doc('player02data').update({hand: []});
      const playerInfo = await database.collection(gameID).doc("players").get();
      var availableSlots = playerInfo.data()["availableslots"]
      var claimedSlots = playerInfo.data()["claimedslots"]
      if (availableSlots.length !== 0) {
        this.pending = true;
        playerID = availableSlots[0]
        if (playerID == "player01") {
          opponentID = "player02";
        } else if (playerID == "player02") {
          opponentID = "player01";
        }
        claimedSlots.push(playerID)
        availableSlots.splice(0,1);
        await database.collection(gameID).doc('players').update({availableslots: availableSlots});
        await database.collection(gameID).doc('players').update({claimedslots: claimedSlots});
        const clientdeck = database.collection(gameID).doc("deck");
        clientdeck.onSnapshot(clientdeckSnapshot => {
          const data = clientdeckSnapshot.data();
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
        const playerData = database.collection(gameID).doc(`${playerID}data`);
        playerData.onSnapshot(playerDataSnapshot => {
          const playerHand = playerDataSnapshot.data()["hand"];
          let vm = this
          if (playerHand.length !== 0) {
            vm.handValue = 0; 
            playerHand.forEach(function(card) {
              vm.handValue = vm.handValue + deck[card]["blackjack"];
            })
            if (vm.handValue > 21) {
              vm.handValue = 0;
              playerHand.forEach(function(card) {
              if (deck[card]["value"] == "ACE") {
                vm.handValue = vm.handValue + 1;
              } else {
                vm.handValue = vm.handValue + deck[card]["blackjack"];
              }})
            }
          }
          if (vm.handValue > 21) {
            this.standing = true;
            vm.gameEnd()
            // vm.winner = gameEnd()
            vm.gameOver = true;
          }
        })
        const players = database.collection(gameID).doc("players");
        players.onSnapshot(playersSnapshot => {
          let vm = this
          var standingPlayers = playersSnapshot.data()["standingplayers"]
          if (standingPlayers.length == 2) {
            vm.gameOver = true;
            // vm.winner = gameEnd();
            vm.gameEnd();
          }
          var claimedSlots = playersSnapshot.data()["claimedslots"]
          if (claimedSlots.length == 2) {
            this.connected = true;
            this.pending = false;
          }
          const nonactivePlayer = playersSnapshot.data()["nonactiveplayer"];
          if (nonactivePlayer == playerID) {
            // console.log(`standingPlayers is ${standingPlayers} and opponentID is ${opponentID}`)
            this.active = false
          } else {
            this.active = true
          }
        })

        })
      } else {
        alert("Game is full.");
      }
    },
    // Shuffle functionality is obsolete
    // shuffleDeck: async function() {
    //   for (let i = deckcodes.length - 1; i > -1; i--) {
    //     let j = Math.floor(Math.random() * (i + 1));
    //     [deckcodes[i], deckcodes[j]] = [deckcodes[j], deckcodes[i]];
    //   }
    //   const obj = {array: deckcodes}
    //   await database.collection(gameID).doc('deck').set(obj);
    //   await database.collection(gameID).doc('player01data').update({hand: []});
    //   await database.collection(gameID).doc('player02data').update({hand: []});
    //   document.getElementById(`${playerID}hand`).innerHTML = "";
    //   const eventsData = await database.collection(gameID).doc('events').get()
    //   var events = eventsData.data()["events"];
    //   events.push(`${playerID} shuffled the deck`)
    //   await database.collection(gameID).doc("events").update({events: events});
    //   },
    hit: async function() {
        var players = await database.collection(gameID).doc('players').get();
        var standingPlayers = players.data()["standingplayers"];
        if (standingPlayers.indexOf(opponentID) == -1) {
          console.log(`standingPlayers is ${standingPlayers} and opponentID is ${opponentID}`)
          await database.collection(gameID).doc("players").update({nonactiveplayer: playerID});
        }
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
        // if (this.gameOver == false) {
        document.getElementById(`${playerID}hand`).innerHTML = document.getElementById(`${playerID}hand`).innerHTML + `<img src=${image} />`;
        // }
      },
    stand: async function() {
        this.standing = true;
        await database.collection(gameID).doc("players").update({nonactiveplayer: playerID});
        var players = await database.collection(gameID).doc('players').get();
        var standingPlayers = players.data()["standingplayers"];
        standingPlayers.push(playerID)
        await database.collection(gameID).doc("players").update({standingplayers: standingPlayers});
        const eventsData = await database.collection(gameID).doc('events').get()
        var events = eventsData.data()["events"];
        events.push(`${playerID} stood`)
        await database.collection(gameID).doc("events").update({events: events});
        const playerData = await database.collection(gameID).doc(`${playerID}data`).get();
        var playerHand = playerData.data()["hand"];
        var standValue = 0;
        playerHand.forEach(function(card) {
          standValue = standValue + deck[card]["blackjack"];
        })
        console.log(`the stand value is ${standValue}`)
    },
    restart: async function() {
      this.gameOver = false;
      this.standing = false;
      this.handValue = 0;
      this.opponentHandSize = 0;
      this.eventLog = "";
      this.winner = "";
      for (let i = deckcodes.length - 1; i > -1; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [deckcodes[i], deckcodes[j]] = [deckcodes[j], deckcodes[i]];
      }
      const obj = {array: deckcodes}
      await database.collection(gameID).doc('deck').set(obj);
      await database.collection(gameID).doc('player01data').update({hand: []});
      await database.collection(gameID).doc('player02data').update({hand: []});
      await database.collection(gameID).doc("players").update({standingplayers: []});
      await database.collection(gameID).doc("players").update({nonactiveplayer: "player02"});
      await database.collection(gameID).doc("events").update({events: []});
      document.getElementById(`${playerID}hand`).innerHTML = "";
      document.getElementById(`${opponentID}hand`).innerHTML = "";

      }
    }
}
</script>
<style>
</style>