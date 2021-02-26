<template>
  <div class="container">
    <input type = "text" v-on:input=" username= $event.target.value" placeholder="Username"/>
    <input type = "text" v-on:input=" password= $event.target.value" placeholder="Password"/>
    <button @click="signIn()">Sign In</button>
    <button @click="accountCreation()">Create Account</button>
  </div>
</template>
<script>
import { firebase } from "@firebase/app";
import "firebase/auth";
import "firebase/firestore";
export default {
      data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    signIn: function() {
        firebase.auth().signInWithEmailAndPassword(this.username, this.password)
        console.log("signed in")
        this.$router.push({ name: 'signedIn' });

    },
    accountCreation: function() {
      this.$router.push({ name: 'authCreate' });
    }
    },
}
</script>