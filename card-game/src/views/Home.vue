<template>
  <div class="home">
    <template v-if="accountStatus === 'loggedin'">
      <h2>Welcome!</h2>
      <button @click="logout">Logout</button>
    </template>
    <template v-if="accountStatus === 'loggingin'">
        <form id="login-form" @submit.prevent="processForm">
        <input v-model="email" placeholder="E-mail">
        <input v-model="password" placeholder="Password">
        <button type="submit">Complete Log-In</button>
        </form>
    </template>
    <template v-if="accountStatus === 'loggedout'">
      <h2>Login or SignUp</h2>
      <button @click="login">Login</button>
      <button @click="signupButton">Sign Up</button>
    </template>
    <template v-if="accountStatus === 'registering'">
      <form id="signup-form" @submit.prevent="processForm">
        <input v-model="email" placeholder="E-mail">
        <input v-model="password" placeholder="Password">
        <button type="submit">Complete Sign-Up</button>
      </form>
    </template>
  </div>
</template>

<script>
// @ is an alias to /src

import { auth } from '@/firebase';

export default {
  name: "Home",
  data() {
    return {
      accountStatus: "loggedout",
      email: "",
      password: "",
    };
  },
  methods: {
    login: function() {
      this.accountStatus = "loggingin";
    },
    logout: function() {
      auth.signOut().then(() => {
        this.accountStatus = "loggedout";
      });
    },
    signupButton: function() {
      this.accountStatus = "registering";
    },
    processForm: function() {
      auth.createUserWithEmailAndPassword(this.email, this.password).then(cred => {
        console.log(cred);
        this.accountStatus = "loggedin";
      });
    },
  }
};
</script>
