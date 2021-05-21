<template>
  <div class="container">
    <input type = "text" v-on:input=" gameID= $event.target.value" placeholder="Game ID" ref="gameID"/>
    <button @click="input()">Input</button>
    <!-- <b>Wow, so much content!</b> -->
    <!-- <h1>Welcome {{user}}</h1> -->
    <button @click="signOut()">Sign Out</button>
  </div>
</template>
<script>
import {auth} from "@/firebase"
import {user} from "./auth.vue"
// console.log(user)
export default {
  data() {
    return {  
      user: user,
    };
  },
  methods: {
    input: function() {
      console.log(this.gameID)
    },
    signOut: function() {
        auth.signOut()
        this.$router.push({ name: 'auth' });
        console.log("signed out")
    },
    },
}
</script>