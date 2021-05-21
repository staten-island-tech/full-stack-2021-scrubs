<template>
  <div>
    <router-link id="games" to="/Games">Back</router-link>
    <div>{{ gameType }}</div>
    <br />
    <div class="player" v-if="play">
      <form>
        Please enter a name:
        <input
          type="text"
          placeholder="Put In Your Name"
          v-model="playerStatus.name"
        />
      </form>
      <br />
      <button class="player-button" @click="createRoom">Create Game</button>
      <br />
      <p>or</p>
      <form>
        <br />
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
export default {
  name: "Lobby",
  data() {
    return {
      playerStatus: {
        master: "",
        name: ""
      },
      play: true,
      roomCode: "",
      // loginStatus: true,
      joinCode: ""
    };
  },
  props: {
    game: String,
    gameType: String,
    gameRoom: String
  },
  methods: {
    generateID() {
      const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      for (let i = 1; i < 5; i++) {
        let lastLetter = letters[Math.floor(Math.random() * letters.length)];
        this.roomCode += lastLetter;
      }
      console.log(this.roomCode);
    },
    async createRoom() {
      if (this.playerStatus.name.length > 0) {
        this.generateID();
        let newGame = database
          .collection("games")
          .doc("blackjack" + this.roomCode);
        this.playerStatus.master = true;
        newGame.set(
          {
            gamePlayers: [],
            lobby: {
              slots: 1,
              lobbyPlayers: [this.playerStatus]
            }
          },
          {
            merge: true
          }
        );
        let data = {
          code: this.roomCode,
          name: this.playerStatus.name,
          master: this.playerStatus.master
        };
        this.$router.push({ name: this.gameRoom, params: { data } });
      } else {
        alert("Enter A Name!");
      }
    },
    async joinGame() {
      if (this.joinCode.length == 4) {
        let codeExists = await database
          .collection("games")
          .doc(`blackjack${this.joinCode}`)
          .get()
          .then(snapshot => {
            return snapshot.exists;
          });
        if (codeExists === true) {
          let lobby = database
            .collection("games")
            .doc(`blackjack${this.joinCode}`);
          let slot = await lobby.get().then(snapshot => {
            return snapshot.data().lobby.slots;
          });
          if (slot !== 0) {
            let playerData;
            await lobby.get().then(doc => {
              for (let i = 0; i < doc.data().lobby.lobbyPlayers.length; i++) {
                playerData = doc.data().lobby.lobbyPlayers;
              }
            });
            this.playerStatus.master = false;
            playerData.push({
              master: this.playerStatus.master,
              name: this.playerStatus.name
            });
            await lobby.set(
              {
                lobby: {
                  lobbyPlayers: playerData,
                  slots: slot - 1
                }
              },
              {
                merge: true
              }
            );
            let data = {
              code: this.joinCode,
              name: this.playerStatus.name,
              master: this.playerStatus.master
            };
            this.$router.push({ name: this.gameRoom, params: { data } });
          } else {
            alert(`Room is full!`);
          }
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