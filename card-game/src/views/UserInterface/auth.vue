<template>
  <div class="container">
    <input type = "text" v-on:input=" username= $event.target.value" placeholder="Email" ref="username"/>
    <input type = "text" v-on:input=" password= $event.target.value" placeholder="Password" ref="password"/>
    <button @click="signIn()">Sign In</button>
    <button @click="accountCreation()">Create Account</button>
  </div>
</template>
<script>
import {auth} from "@/firebase"
var user = "placeholder"
export default {
  // user: user,
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    signIn: function() {
        auth.signInWithEmailAndPassword(this.username, this.password).then((userCredential) => {
          console.log(userCredential)
          user = userCredential.user;
          console.log(user)
          this.$router.push({ name: 'signedIn' });
        }).catch((error) => {
          var errorMessage = error.message;
          alert(errorMessage);
          this.$refs["username"].value = "";
          this.$refs["password"].value = "";
        });
    },
    accountCreation: function() {
      this.$router.push({ name: 'authCreate' });
    }
    },
}
export { user };
</script>