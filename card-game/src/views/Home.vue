<template>
  <div class="home">
    <template v-if="accountStatus === 'loggedin'">
      <h2>Welcome!</h2>
      <button @click="logout">Logout</button>
    </template>
    <template v-if="accountStatus === 'loggingin'">
        <form id="login-form" @submit.prevent="loginForm">
        <input v-model="email" placeholder="E-mail">
        <input v-model="password" placeholder="Password">
        <button type="submit">Complete Log-In</button>
        </form>
    </template>
    <template v-if="accountStatus === 'loggedout'">
      <h2>Login or SignUp</h2>
      <button @click="loginButton">Login</button>
      <button @click="signupButton">Sign Up</button>
    </template>
    <template v-if="accountStatus === 'registering'">
       <form id="signup-form" @submit.prevent="signupForm">
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
    //switch to login form
    loginButton: function() {
      this.accountStatus = "loggingin";
    },
    //logs user in
    loginForm: function() {
      auth.signInWithEmailAndPassword(this.email, this.password).then(cred => {
        console.log(cred);
        this.email = "";
        this.password = "";
      });
    },
    //logs user out
    logout: function() {
      auth.signOut().then(() => {
        this.accountStatus = "loggedout";
      });
    },
    //switches to signup form
    signupButton: function() {
      this.accountStatus = "registering";
    },
    //signs user up
    signupForm: function() {
      auth.createUserWithEmailAndPassword(this.email, this.password).then(cred => {
        console.log(cred);
        this.email = "";
        this.password = "";
      });
    },
  },
  created: function () {
    auth.onAuthStateChanged(user => {
    if (user) {
      console.log("user logged in");
      this.accountStatus = "loggedin";
    }
    else {
      console.log("user not signed in");
    }
    });
  }
};
</script>
