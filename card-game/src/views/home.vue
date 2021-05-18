<template>
  <div class="container">
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Grand+Hotel&display=swap"
    />
    <div class="container-buttons">
      <button class="container-buttons-button" @click="playGame()">Play</button>
      <button class="container-buttons-button">About</button>
      <button class="container-buttons-button">Credits</button>
      <button class="container-buttons-button">Donate</button>
      <button class="container-buttons-button" @click="login()">
        Log In | Sign Up
      </button>
    </div>
    <p class="container-title">It's Not An Addiction Casino</p>
  </div>
</template>

<script>
import { auth} from "@/firebase"

export default {
  data() {
    return {
      play: false,
      roomCode: "",
      loginStatus: true,
    };
  },
  methods: {
    playGame: function () {
      this.$router.push({ name: "blackjacklobby" });
    },
  },
  created() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.loginStatus = true;
        console.log(this.loginStatus);
      } else {
        this.loginStatus = false;
        console.log(this.loginStatus);
      }
    });
  }
}

</script>
<style lang="scss">
html {
  font-size: 62.5%;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.container {
  height: 99vh;
  background: radial-gradient(
    50% 50% at 50% 50%,
    rgba(172, 0, 0, 1) 0%,
    rgba(105, 0, 0, 1) 100%
  );
}

.container-buttons {
  display: flex;
  justify-content: space-evenly;
}

.container-buttons-button {
  font-size: 3rem;
  color: #ffd600;
  background: rgba(35, 17, 35, 0.42);
  border: 1px solid #231123;
  box-shadow: 0px 4px 17px rgba(152, 73, 0, 0.25);
  border-radius: 5px;
}

.container-title {
  text-align: center;
  font-size: 7.2rem;
  font-family: Grand Hotel;
  font-style: normal;
  font-weight: normal;

  color: #ffd600;
}

.player {
  text-align: center;
}

.player-button {
  font-size: 3rem;
  color: #ffd600;
  background: rgba(35, 17, 35, 0.42);
  border: 1px solid #231123;
  box-shadow: 0px 4px 17px rgba(152, 73, 0, 0.25);
  border-radius: 5px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>