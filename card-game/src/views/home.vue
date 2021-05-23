<template>
  <section class="container">
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Grand+Hotel&display=swap"
    />
    <link
      href="https://fonts.googleapis.com/css2?family=Roboto&display=swap"
      rel="stylesheet"
    />
    <div class="container-buttons">
      <button class="container-buttons-button" v-on:click="play = !play">
        Play
      </button>
      <button class="container-buttons-button">About</button>
      <button class="container-buttons-button">Credits</button>
      <button class="container-buttons-button">Donate</button>
      <button class="container-buttons-button" @click="auth()">
        Log In | Sign Up
      </button>
    </div>
    <p class="container-title">It's Not An Addiction Casino</p>
    <transition name="fade">
      <div class="player" v-if="play">
        <button class="player-button">Create Game</button>
        <button class="player-button" @click="playGame()">Join Game</button>
      </div>
    </transition>
  </section>
</template>

<script>
export default {
  data() {
    return {
      play: false,
    };
  },
  methods: {
    playGame: function () {
      this.$router.push({ name: "blackjack" });
    },
    auth: function () {
      this.$router.push({ name: "auth" });
    },
  },
};
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
  background-image: radial-gradient(
      50% 50% at 50% 50%,
      rgba(#ac0000, 0.87) 0%,
      rgba(#690000, 0.87) 100%
    ),
    url(../assets/vegasbkgd.jpg);
}

.container-buttons {
  display: flex;
  justify-content: space-evenly;
  margin-left: 1.5rem;
  margin-right: 1.5rem;
}

.container-buttons-button {
  margin-top: 10px;
  font-size: 3rem;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
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