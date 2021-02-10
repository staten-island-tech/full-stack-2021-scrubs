<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <h2 v-if="isLoggedIn">Welcome Back!</h2>
    <button v-if="isLoggedIn" @click="logout">Logout</button>
    <template v-else>
    <h2 v-if="hasAccount">Login or SignUp</h2>
    <button @click="login" v-if="hasAccount">Login</button>
    <button @click="signup" v-if="hasAccount">Sign Up</button>
    </template>
    <template v-if="creatingAccount">
    <input placeholder="E-mail">
    <input placeholder="Password">
    </template>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld
  },
  data() {
    return {
      isLoggedIn: false,
      hasAccount: true,
      creatingAccount: false,
    };
  },
  methods: {
    login: function() {
      this.isLoggedIn = true;
    },
    logout: function() {
      this.isLoggedIn = false;
    },
    signup: function() {
      this.hasAccount = false;
      this.creatingAccount = true;
    },
  }
};
</script>
