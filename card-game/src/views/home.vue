<template>
  <div class="container">
    <button @click="playGame()">Play</button>
    <button>About</button>
    <button>Credits</button>
    <button>Donate</button>
    <button @click="auth()">Log In | Sign Up</button>
    <p>The Coolest Game Card</p>
  </div>
</template>

<script>
export default {
  data() {

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