<template>
  <div>
    <router-link id="games" to="/Games">Back</router-link>
    <div>{{ gameType }}</div>
    <div class="player" v-if="play">
      <button class="player-button" @click="createRoom">Create Game</button>
      <br />
      <p>or</p>
      <form>
        <input
          type="text"
          placeholder="Put in the 4 digit code"
          v-model="joinCode"
        />
        <input type="submit" value="Join Game" @click.prevent="joinGame" />
      </form>
    </div>
  </div>
</template>

<script>
import { database } from "@/firebase";
import { deck } from "@/deck/deck";

export default {
  name: "Lobby",
  data() {
    return {
      play: true,
      roomCode: "",
      loginStatus: true,
      joinCode: ""
    };
  },
  props: {
    game: String,
    gameType: String
  },
  methods: {
    generateID: function() {
      const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      for (let i = 1; i < 5; i++) {
        let lastLetter = letters[Math.floor(Math.random() * letters.length)];
        this.roomCode += lastLetter;
      }
      console.log(this.roomCode);
      this.$emit("code", this.roomCode);
    },
    createRoom: async function() {
      if (this.loginStatus === true) {
        this.roomCode = "";
        this.generateID();
        let newGame = database
          .collection("games")
          .doc("blackjack" + this.roomCode)
          .set({
            deck: deck,
            events: [],
            gamePlayers: [],
            lobbyPlayers: []
          });
        let data = {
          code: this.roomCode
        };
        this.$router.push({ name: this.gameType, params: { data } });
        database
          .collection("games")
          .get()
          .then(snapshot => {
            console.log(snapshot);
            console.log(newGame);
          });
        this.$emit("created", true);
      } else {
        alert("Login to create game");
      }
    },
    async joinGame() {
      console.log(this.joinCode);
      if (this.joinCode.length == 4) {
        console.log("Checking if it exists");
        let codeExists = await database
          .collection("games")
          .doc(`blackjack${this.joinCode}`)
          .get()
          .then(snapshot => {
            return snapshot.exists;
          });
        console.log(codeExists);
        if (codeExists === true) {
          let data = {
            code: this.joinCode
          };
          this.$router.push({ name: this.gameType, params: { data } });
        } else {
          alert("Code does not exist, please input another one");
        }
      } else {
        alert("The Code is 4 Letters");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
table,
th,
td {
  border: 1px solid black;
  border-collapse: collapse;
}
th,
td {
  padding: 15px;
}
th {
  text-align: left;
}
</style>
