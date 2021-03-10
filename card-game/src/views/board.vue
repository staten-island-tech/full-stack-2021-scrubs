<template>
    <div class="container">
        <input type = "text" v-on:input=" gameID = $event.target.value" placeholder="Game ID" ref="gameID"/>
        <button @click="input()">Input</button>
        <button v-on:click="connecttoDB">Connect to Database</button>
        <div class="game-board-container">
            <div id="1" class="game-square" v-on:click="squareClick($event)"></div>
            <div id="2" class="game-square" v-on:click="squareClick($event)"></div>
            <div id="3" class="game-square" v-on:click="squareClick($event)"></div>
            <div id="4" class="game-square" v-on:click="squareClick($event)"></div>
            <div id="5" class="game-square" v-on:click="squareClick($event)"></div>
            <div id="6" class="game-square" v-on:click="squareClick($event)"></div>
            <div id="7" class="game-square" v-on:click="squareClick($event)"></div>
            <div id="8" class="game-square" v-on:click="squareClick($event)"></div>
            <div id="9" class="game-square" v-on:click="squareClick($event)"></div>
        </div>
    </div>
</template>
<script>
import {database} from "@/firebase"
var player = "X";
var boardID = "placeholder";


async function connect() {
    const board = database.collection("boards").doc(boardID);
    const observer = board.onSnapshot(boardSnapshot => {
        const data = boardSnapshot.data();
        console.log(typeof observer);
        // Cells are being shuffled and need to be ordered by last digits
        const cells = Object.keys(data).map(function(key) {
            return data[key];
        })
        cells.forEach(function (cell, index) {
            document.getElementById(`${index + 1}`).innerText = cell;
        });
    })
}
async function updatedb(square) {
  const target = {};
  target[`cell0${square.id}`] = player;
  await database.collection("boards").doc(boardID).update(target);
}
function newPlayer(currentPlayer) {
  if (currentPlayer === "X") {
    player = "O";
  } else if (currentPlayer === "O") {
    player = "X";
  }
}
export default {
  data() {
    return {  
        gameID: "",
    };
  },
  methods: {
      input: function() {
        boardID = `board${this.gameID}`
        console.log(boardID)
      },
      squareClick: function(event) {
        const square = event.target;
        if (square.innextText === undefined || square.innextText === "") {
            square.innerText = player;
            updatedb(square);
            newPlayer(player);
        }
      },
      connecttoDB: async function() {
        connect();
      }
    },
}
</script>
<style>
    .game-board-container {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: grid;
    grid-template-columns: repeat(3, auto);
    }

    .game-square {
    text-align: center;
    width: 15vw;
    height: 15vw;
    box-shadow: 0 0 0 1px #000000;
    border: 1px solid #000000;
    font-size: 5vw;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid black;
    }
</style>