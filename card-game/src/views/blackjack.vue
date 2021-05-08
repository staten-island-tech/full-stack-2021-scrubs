<template>
  <div class="container">
      <input type = "text" v-if= "!connected && !pending" v-on:input=" gameID = $event.target.value" placeholder="Game ID" ref="gameID"/>
      <button v-if= "!connected && !pending" @click="input()">Input</button>
      <button v-if= "!connected && !pending" v-on:click="connecttoGame">Connect to Game</button>
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
// platonicDeck is a static deck objects that contains various references for cards

import {platonicDeck} from "../deck/deck.js"
const deckCodes = Object.keys(platonicDeck)
// database is the Firestore database we will be interfacing with
import {database} from "@/firebase"
var gameID;
var playerID;
var opponentID;

export default {
  data() {
    return {
        pending: false,
        deckSize: 52,
        opponentHandSize: 0,
        handValue: 0,
        eventLog: "",
        standing: false,
        connected: false,
        active: true,
        gameOver: false,
        result: "",
    };
  },
  methods: {
    // This function takes user input to establish gameID which will specify which document to interact with in the database
    input: function() {
        gameID = `blackjack${this.gameID}`;
    },
    // This function handles all setup for when user first connects to a game
    connecttoGame: async function() {
        // Temp for ease of reset while testing
        var resetPlayers = await database.collection(gameID).doc("players").get();
        resetPlayers = resetPlayers.data()["availableslots"];
        if (resetPlayers == 0) {
            await database.collection(gameID).doc('players').update({availableslots: ["player01", "player02"]});
            await database.collection(gameID).doc('players').update({claimedslots: []});
            await database.collection(gameID).doc('player01data').update({hand: []});
            await database.collection(gameID).doc('player02data').update({hand: []});
            await database.collection(gameID).doc("players").update({standingplayers: []});
            await database.collection(gameID).doc("players").update({activeplayer: "player01"});
            await database.collection(gameID).doc("events").update({events: []});
        }
        // Temp for ease of reset while testing ends here
        // Simulates deck being shuffled and pushes shuffled deck object to database
        for (let i = deckCodes.length - 1; i > -1; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [deckCodes[i], deckCodes[j]] = [deckCodes[j], deckCodes[i]];
        }
        const obj = {array: deckCodes};
        await database.collection(gameID).doc('deck').set(obj);
        // Actual connectivity process. Uses availableSlots and claimedSlots field in database to establish connecting users as discrete entities
        const playersDocument = await database.collection(gameID).doc("players").get();
        var availableSlots = playersDocument.data()["availableslots"]
        var claimedSlots = playersDocument.data()["claimedslots"]
        if (availableSlots.length !== 0) {
            // Establishes that while a player has connected the game is not yet ready to start
            this.pending = true;
            // Establishes playerID and opponentID which will be used throughout process to make a distinction between connected players
            playerID = availableSlots[0]
            if (playerID == "player01") {
                opponentID = "player02";
            } else if (playerID == "player02") {
                opponentID = "player01";
            }
            // Updates availableSlots and claimedSlots field in database to reflect the fact that a player connected
            claimedSlots.push(playerID)
            availableSlots.splice(0,1);
            await database.collection(gameID).doc('players').update({availableslots: availableSlots});
            await database.collection(gameID).doc('players').update({claimedslots: claimedSlots});
            // Establishes live snapshot to deck object
            const liveDeck = database.collection(gameID).doc("deck");
            liveDeck.onSnapshot(liveDeckSnapshot => {
                const data = liveDeckSnapshot.data();
                this.deckSize = data["array"].length;
            })
            // Establishes live snapshot to opponents data and specifically hand
            const opponentData = database.collection(gameID).doc(`${opponentID}data`);
            opponentData.onSnapshot(opponentDataSnapshot => {
                const data = opponentDataSnapshot.data();
                console.log(`gameID is ${gameID}`)
                console.log(`opponentID is ${opponentID}`)
                console.log(`dats is: ${data}`)
                this.opponentHandSize = data["hand"].length;
            })
            // Establishes live snapshot to event feed
            const events = database.collection(gameID).doc("events");
            events.onSnapshot(eventsSnapshot => {
                const data = eventsSnapshot.data();
                this.eventLog = data["events"]
            })
            // Establishes live snapshot to player data and specifically hand
            const playerData = database.collection(gameID).doc(`${playerID}data`);
            playerData.onSnapshot(playerDataSnapshot => {
                const playerHand = playerDataSnapshot.data()["hand"];
                let vm = this
                if (playerHand.length !== 0) {
                    // Displays image for latest card added to your hand
                    const image = platonicDeck[playerHand[playerHand.length-1]]["image"]; 
                    document.getElementById(`${playerID}hand`).innerHTML = document.getElementById(`${playerID}hand`).innerHTML + `<img src=${image} />`;
                    vm.handValue = 0; 
                    playerHand.forEach(function(card) {
                        vm.handValue = vm.handValue + platonicDeck[card]["blackjack"];
                    })
                    // In the case that card value exceeds 21 this flips the value of aces to 1 instead of 11
                    if (vm.handValue > 21) {
                        vm.handValue = 0;
                        playerHand.forEach(function(card) {
                            if (platonicDeck[card]["value"] == "ACE") {
                                vm.handValue = vm.handValue + 1;
                            } else {
                                vm.handValue = vm.handValue + platonicDeck[card]["blackjack"];
                    }})
                    }
                    // If after this transmutation card value continues to exceed 21 the player busts and the game ends
                    if (vm.handValue > 21) {
                        this.standing = true;
                        vm.gameEnd()
                        vm.gameOver = true;
                    }
                }
            })
            // Establishes live snapshot to players document
            const playersDocument = database.collection(gameID).doc("players");
            playersDocument.onSnapshot(playersDocumentSnapshot => {
                let vm = this
                // If both players are standing end the game
                var standingPlayers = playersDocumentSnapshot.data()["standingplayers"]
                if (standingPlayers.length == 2) {
                    vm.gameOver = true;
                    vm.gameEnd();
                }
                // If both players are connected start the game
                var claimedSlots = playersDocumentSnapshot.data()["claimedslots"]
                if (claimedSlots.length == 2) {
                    this.connected = true;
                    this.pending = false;
                }
                // Determine whether you should be the active player locally by interfacing with database
                const activePlayer = playersDocumentSnapshot.data()["activeplayer"];
                if (activePlayer == playerID) {
                    this.active = true
                } else {
                    this.active = false
                }
            })
        } else if (availableSlots.length == 0) {
            alert("Game is full.");
        }

    },
    // This function establishes the logic for a player taking the hit action
    hit: async function() {
        // Passes status as active to other player after taking an action
        var playersDocument = await database.collection(gameID).doc('players').get();
        var standingPlayers = playersDocument.data()["standingplayers"];
        if (standingPlayers.indexOf(opponentID) == -1) {
            await database.collection(gameID).doc("players").update({activeplayer: opponentID});
        }
        // Updates event feed to reflect the fact that a player took a hit
        const eventsData = await database.collection(gameID).doc('events').get()
        var events = eventsData.data()["events"];
        events.push(`${playerID} hit`)
        await database.collection(gameID).doc("events").update({events: events});
        // Updates deck object and player hand in database to reflect the fact that a player took a hit
        const databaseDeck = await database.collection(gameID).doc("deck").get();
        const data = databaseDeck.data();
        const draw = data["array"].slice(0,1)
        data["array"].splice(0,1);
        const obj = {array: data["array"]}
        await database.collection(gameID).doc('deck').set(obj);
        const playerData = await database.collection(gameID).doc(`${playerID}data`).get();
        var playerHand = playerData.data()["hand"];
        playerHand.push(draw[0])
        await database.collection(gameID).doc(`${playerID}data`).update({hand: playerHand});
    },
    // This function establishes the logic for a player taking the stand action
    stand: async function() {
        this.standing = true;
        // Passes status as active to other player after taking an action
        await database.collection(gameID).doc("players").update({activeplayer: opponentID});
        // Updates database to reflect the fact that a player is now standing
        var players = await database.collection(gameID).doc('players').get();
        var standingPlayers = players.data()["standingplayers"];
        standingPlayers.push(playerID)
        await database.collection(gameID).doc("players").update({standingplayers: standingPlayers});
        // Updates event feed to reflect the fact that a player took the stand action
        const eventsData = await database.collection(gameID).doc('events').get()
        var events = eventsData.data()["events"];
        events.push(`${playerID} stood`)
        await database.collection(gameID).doc("events").update({events: events});
    },
    // This function establishes what should occur when the game ends in whatever possible fashion
    gameEnd: async function() {
        // Fetch your hand from the database and compute its numerical value
        const playerData = await database.collection(gameID).doc(`${playerID}data`).get();
        var playerHand = playerData.data()["hand"];
        var playerHandValue = 0
        playerHand.forEach(function(card) {
            playerHandValue = playerHandValue + platonicDeck[card]["blackjack"];
        })
        if (playerHandValue > 21) {
            playerHandValue = 0;
            playerHand.forEach(function(card) {
                if (platonicDeck[card]["value"] == "ACE") {
                    playerHandValue = playerHandValue + 1;
                } else {
                    playerHandValue = playerHandValue + platonicDeck[card]["blackjack"];
                }        
            })
        }
        // Fetch your opponents hand from the database and compute its numerical value
        const opponentData = await database.collection(gameID).doc(`${opponentID}data`).get();
        var opponentHand = opponentData.data()["hand"];
        var opponentHandValue = 0
        opponentHand.forEach(function(card) {
            opponentHandValue = opponentHandValue + platonicDeck[card]["blackjack"];
        })
        if (opponentHandValue > 21) {
            opponentHandValue = 0;
            opponentHand.forEach(function(card) {
                if (platonicDeck[card]["value"] == "ACE") {
                    opponentHandValue = opponentHandValue + 1;
                } else {
                    opponentHandValue = opponentHandValue + platonicDeck[card]["blackjack"];
                }
            })
        }
        // Normalize data between two players by ensuring that both are labeled as standing if only one is
        const playersDocument = await database.collection(gameID).doc("players").get();
        var standingPlayers = playersDocument.data()["standingplayers"]
        if (playerHandValue > 21 && standingPlayers.length !== 2) {
            await database.collection(gameID).doc("players").update({standingplayers: ["player01", "player02"]});
        }
        // Compare relative numerical values of hands to determine game result
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
    // This function establishes a procedure for resetting the game after a round has been completed
    restart: async function() {
        // Reset all relevant parameters to their initial value 
        this.gameOver = false;
        this.standing = false;
        this.handValue = 0;
        this.opponentHandSize = 0;
        this.eventLog = "";
        this.winner = "";
        for (let i = deckCodes.length - 1; i > -1; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [deckCodes[i], deckCodes[j]] = [deckCodes[j], deckCodes[i]];
        }
        const obj = {array: deckCodes}
        await database.collection(gameID).doc('deck').set(obj);
        await database.collection(gameID).doc('player01data').update({hand: []});
        await database.collection(gameID).doc('player02data').update({hand: []});
        await database.collection(gameID).doc("players").update({standingplayers: []});
        await database.collection(gameID).doc("players").update({nonactiveplayer: "player02"});
        await database.collection(gameID).doc("events").update({events: []});
        document.getElementById(`${playerID}hand`).innerHTML = "";
        document.getElementById(`${opponentID}hand`).innerHTML = "";
    },
    },
}
</script>
<style>
</style>