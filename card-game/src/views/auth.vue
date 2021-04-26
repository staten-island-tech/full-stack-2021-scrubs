<template>
  <section class="container">
    <div class="container-inputs">
      <input
        class="username"
        type="text"
        v-on:input="username = $event.target.value"
        placeholder="Username"
        ref="username"
      />
      <input
        class="password"
        type="text"
        v-on:input="password = $event.target.value"
        placeholder="Password"
        ref="password"
      />
    </div>
    <button class="signin" @click="signIn()">Sign In</button>
    <button class="create" @click="accountCreation()">Create Account</button>
  </section>
</template>
<script>
import { auth } from "@/firebase";
var user = "placeholder";
export default {
  // user: user,
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    signIn: function () {
      auth
        .signInWithEmailAndPassword(this.username, this.password)
        .then((userCredential) => {
          console.log(userCredential);
          user = userCredential.user;
          console.log(user);
          this.$router.push({ name: "signedIn" });
        })
        .catch((error) => {
          var errorMessage = error.message;
          alert(errorMessage);
          this.$refs["username"].value = "";
          this.$refs["password"].value = "";
        });
    },
    accountCreation: function () {
      this.$router.push({ name: "authCreate" });
    },
  },
};
export { user };
</script>
<style lang="scss">
.container {
  text-align: center;
}

.username {
  margin-top: 15%;
  margin-right: 5px;
  margin-bottom: 10px;
  border-radius: 5px;
  background-color: rgba(35, 17, 35, 0.42);
  color: #ffd600;
  font-size: 2rem;
}

.password {
  background-color: rgba(35, 17, 35, 0.42);
  color: #ffd600;
  border-radius: 5px;
  margin-left: 5px;
  font-size: 2rem;
}

.signin {
  color: #ffd600;
  background: rgba(35, 17, 35, 0.42);
  border: 1px solid #231123;
  box-shadow: 0px 4px 17px rgba(152, 73, 0, 0.25);
  border-radius: 5px;
  margin-right: 5px;
}

.create {
  color: #ffd600;
  background: rgba(35, 17, 35, 0.42);
  border: 1px solid #231123;
  box-shadow: 0px 4px 17px rgba(152, 73, 0, 0.25);
  border-radius: 5px;
  margin-left: 5px;
}
</style>