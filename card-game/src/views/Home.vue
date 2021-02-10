<template>
  <div class="home">
    <h2 v-if="isLoggedIn">Welcome Back!</h2>
    <button v-if="isLoggedIn" @click="logout">Logout</button>
    <template v-else>
    <h2 v-if="hasAccount">Login or SignUp</h2>
    <button @click="login" v-if="hasAccount">Login</button>
    <button @click="signup" v-if="hasAccount">Sign Up</button>
    </template>
    <template v-if="creatingAccount">
    <form id="signup-form" @submit.prevent="processForm">
    <input v-model="email" placeholder="E-mail">
    <input v-model="password" placeholder="Password">
    </form>
    </template>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  data() {
    return {
      isLoggedIn: false,
      hasAccount: true,
      creatingAccount: false,

      email: "",
      password: "",
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
    processForm: function() {
      console.log({ name: this.name, email: this.email });
    },
  }
};
</script>
