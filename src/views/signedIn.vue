<template>
  <div class="container">
    <b>Wow, so much content!</b>
    <button @click="signOut()">Sign Out</button>
    <!-- <button @click="accountCreation()">Create Account</button> -->
  </div>
</template>
<script>
export default {

  methods: {
    signOut: function() {
        this.$router.push({ name: 'auth' });
        console.log("signed out")

    },
    },
}
</script>