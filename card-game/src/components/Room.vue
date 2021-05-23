  
<template>
  <div>
    <button id="leave">
      <router-link to="Games">Leave</router-link>
    </button>
    <div class="game-interface">
      <div>Code: {{ code }}</div>
      <p v-for="(player, index) in playerNames" :key="index">
        {{ player.name }}
      </p>
      <button
        v-if="!disableStart && playersInLobby > 1 && master === true"
        @click="start"
      >
        Start
      </button>
      <p v-if="playersInLobby <= 1">Waiting for more people to join...</p>
      <p v-if="!master">Waiting for host to start...</p>
      <p v-if="disableStart">Waiting for game to load...</p>
    </div>
  </div>
</template>

<script>
import { database } from "../firebase.js";
import { deck } from "@/deck/deck";
export default {
  data() {
    return {
      master: false,
      code: "",
      disableStart: false,
      name: "",
      playersInLobby: 0,
      playerNames: []
    };
  },
  props: {
    game: String
  },
  async mounted() {
    this.code = this.$route.params.data.code;
    this.name = this.$route.params.data.name;
    this.master = this.$route.params.data.master;
    console.log("connected");
    let db = await database.collection("games").doc(`blackjack${this.code}`);
    db.update(
      {
        players: ""
      },
      {
        merge: true
      }
    );
    db.get().then(async snapshot => {
      let players = snapshot.data().gamePlayers;
      players.push({
        cardScore: 0,
        hand: [],
        name: this.name,
        canHit: false,
        blackJack: false,
        busted: false,
        turnOrder: null,
        played: false,
        stand: false,
        result: "",
        victor: ""
      });
      if (players.length > 3) {
        players.splice(0, 2);
      }
      db.update({
        deck: deck,
        gameStarted: false,
        gamePlayers: players
      });
    });
    db.onSnapshot(async snapshot => {
      let gameLobby = await snapshot.data().lobby;
      this.playersInLobby = await gameLobby.lobbyPlayers.length;
      for (let i = 0; i < gameLobby.lobbyPlayers.length; i++) {
        if (i === 0) {
          this.playerNames = [];
        }
        this.playerNames.push(gameLobby.lobbyPlayers[i]);
      }
      if (snapshot.data().gameStarted) {
        let data = {
          name: this.name,
          master: this.master,
          code: this.code
        };
        this.$router.push({ name: this.game, params: { data } });
      }
    });
  },
  methods: {
    async start() {
      let game = await database
        .collection("games")
        .doc(`blackjack${this.code}`);
      game.update(
        {
          gameStarted: true,
          lobby: {
            lobbyPlayers: []
          },
          finished: false
        },
        {
          merge: true
        }
      );
    }
  }
};
</script>

<style lang="scss" scoped></style>