<template>
  <div>
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Grand+Hotel&display=swap"
    />
    <link
      href="https://fonts.googleapis.com/css2?family=Roboto&display=swap"
      rel="stylesheet"
    />
    <button id="leave">
      <router-link to="Games">Leave</router-link>
    </button>
    <div class="game-interface">
      <div class="room-code">Code: {{ code }}</div>
      <p class="player" v-for="(player, index) in playerNames" :key="index">
        {{ player.name }}
      </p>
      <button
        class="start-btn"
        v-if="!disableStart && playersInLobby > 1 && master === true"
        @click="start"
      >
        Start
      </button>
      <p class="joining" v-if="playersInLobby <= 1">
        Waiting for more people to join...
      </p>
      <p class="joining" v-if="!master">Waiting for host to start...</p>
      <p class="joining" v-if="disableStart">Waiting for game to load...</p>
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
      playerNames: [],
    };
  },
  props: {
    game: String,
  },
  async mounted() {
    this.code = this.$route.params.data.code;
    this.name = this.$route.params.data.name;
    this.master = this.$route.params.data.master;
    let db = await database.collection("games").doc(`blackjack${this.code}`);
    db.update(
      {
        players: "",
      },
      {
        merge: true,
      }
    );
    db.get().then(async (snapshot) => {
      let players = snapshot.data().gamePlayers;
      if (players.length > 1) {
        players = [];
      }
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
        victor: "",
      });
      db.update({
        deck: deck,
        gameStarted: false,
        gamePlayers: players,
      });
    });
    db.onSnapshot(async (snapshot) => {
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
          code: this.code,
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
            lobbyPlayers: [],
          },
          finished: false,
        },
        {
          merge: true,
        }
      );
    },
  },
};
</script>

<style lang="scss">
#leave {
  color: #ffd600;
  background: rgba(35, 17, 35, 0.42);
  border: 1px solid #231123;
  box-shadow: 0px 4px 17px rgba(152, 73, 0, 0.25);
  border-radius: 5px;
  text-decoration: none;
  font-size: 1.5rem;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
}

#leave:visited {
  color: #ffd600;
}

.joining {
  font-size: 2rem;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
}

.player {
  font-size: 2rem;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
}

.room-code {
  font-size: 2rem;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
}

.start-btn {
  color: #ffd600;
  background: rgba(35, 17, 35, 0.42);
  border: 1px solid #231123;
  box-shadow: 0px 4px 17px rgba(152, 73, 0, 0.25);
  border-radius: 5px;
  text-decoration: none;
  font-size: 1.5rem;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
}
</style>