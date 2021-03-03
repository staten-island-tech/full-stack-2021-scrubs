<template>
  <div class="container">
    <b>Wow, so much content!</b>
    <h1>Welcome {{user}}</h1>
    <button @click="signOut()">Sign Out</button>
  </div>
</template>
<script>
import {auth} from "@/firebase"
import {user} from "../views/auth.vue"
console.log(user)
export default {
  data() {
    return {
      user: user,
    };
  },
  methods: {
    signOut: function() {
        auth.signOut()
        this.$router.push({ name: 'auth' });
        console.log("signed out")
    },
    },
}
</script>