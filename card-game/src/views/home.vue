<template>
  <div class="container">
    <button v-on:click="play = !play">Play</button>
    <button>About</button>
    <button>Credits</button>
    <button>Donate</button>
    <button @click="auth()">Log In | Sign Up</button>
    <p>The Coolest Game Card</p>
        <transition name="fade">
            <div class="player" v-if="play">
                <button>Create Game</button>
                <button @click="playGame()">Join Game</button>
            </div>
        </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
        play: false
    }
  },
  methods: {
    playGame: function() {
      this.$router.push({ name: 'blackjack' });
        },
    auth: function() {
      this.$router.push({ name: 'auth' });
        },
    }
}
</script>
<style>
    .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
    }
</style>