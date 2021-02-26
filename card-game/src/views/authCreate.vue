<template>
  <div class="container">
    <input type = "text" v-on:input=" usernameCreate= $event.target.value" placeholder="Username"/>
    <input type = "text" v-on:input=" passwordCreate= $event.target.value" placeholder="Password"/>
    <button @click="createAccount()">Create Account</button>

  </div>
</template>
<script>
import { firebase } from "@firebase/app";
import "firebase/auth";
import "firebase/firestore";
require('dotenv').config();

var firebaseConfig = {
  apiKey: "PLACEHOLDER",
  authDomain: "PLACEHOLDER",
  projectId: "PLACEHOLDER",
  storageBucket: "PLACEHOLDER",
  messagingSenderId: "PLACEHOLDER",
  appId: "PLACEHOLDER",
};
firebase.initializeApp(firebaseConfig);


export default {
          data() {
    return {
      usernameCreate: "",
      passwordCreate: "",
    };
  },
  methods: {
    createAccount: function() {
        console.log(this.usernameCreate)
        console.log(this.passwordCreate)
        firebase.auth().createUserWithEmailAndPassword(this.usernameCreate, this.passwordCreate)
        this.$router.push({ name: 'auth' });

    }
    },
}
</script>