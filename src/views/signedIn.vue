<template>
  <div class="container">
    <b>Wow, so much content!</b>
    <button @click="signOut()">Sign Out</button>
  </div>
</template>
<script>
export default {

  methods: {
    signOut: function() {
        this.$router.push({ name: 'auth' });
    },
    },
}
</script>