<template>
  <div class="container">
    <router-link class="auth-back" id="games" to="/">Back</router-link>
    <input
      class="email"
      aria-label="email"
      type="text"
      v-on:input="emailCreate = $event.target.value"
      placeholder="Email"
      ref="emailCreate"
    />
    <input
      class="username"
      aria-label="username"
      type="text"
      v-on:input="usernameCreate = $event.target.value"
      placeholder="Username"
      ref="usernameCreate"
    />
    <input
      class="password"
      aria-label="password"
      type="text"
      v-on:input="passwordCreate = $event.target.value"
      placeholder="Password"
      ref="passwordCreate"
    />
    <button class="create" @click="createAccount()">Create Account</button>
  </div>
</template>
<script>
import { auth } from "@/firebase";

export default {
  data() {
    return {
      emailCreate: "",
      passwordCreate: "",
      usernameCreate: "",
    };
  },
  methods: {
    createAccount: function () {
      console.log(this.emailCreate);
      console.log(this.passwordCreate);
      //creates account with email and pass
      auth
        .createUserWithEmailAndPassword(this.emailCreate, this.passwordCreate)
        .then((userCredential) => {
          return (
            userCredential.user.updateProfile({
              displayName: this.usernameCreate,
            }),
            console.log(userCredential),
            auth.signOut(),
            this.$router.push({ name: "auth" })
          );
        })
        .catch((error) => {
          var errorMessage = error.message;
          alert(errorMessage);
          this.$refs["emailCreate"].value = "";
          this.$refs["passwordCreate"].value = "";
        });
      //display name
    },
  },
};
</script>
<style lang="scss">
.container {
  text-align: center;
}
.email {
  color: #ffd600;
  background: rgba(35, 17, 35, 0.42);
  border: 1px solid #231123;
  box-shadow: 0px 4px 17px rgba(152, 73, 0, 0.25);
  border-radius: 5px;
  font-size: 2rem;
}
.username {
  margin-top: 15%;
  margin-right: 5px;
  margin-bottom: 10px;
  border-radius: 5px;
  background-color: rgba(35, 17, 35, 0.42);
  color: #ffd600;
  font-size: 2rem;
  margin-left: 5px;
  border: 1px solid #231123;
}

.password {
  background-color: rgba(35, 17, 35, 0.42);
  color: #ffd600;
  border-radius: 5px;
  margin-left: 5px;
  font-size: 2rem;
  border: 1px solid #231123;
}
.create {
  color: #ffd600;
  background: rgba(35, 17, 35, 0.42);
  border: 1px solid #231123;
  box-shadow: 0px 4px 17px rgba(152, 73, 0, 0.25);
  border-radius: 5px;
  margin-left: 5px;
  font-size: 2rem;
}
.auth-back {
  position: absolute;
  top: 40%;
  font-size: 2rem;
  color: #ffd600;
  background: rgba(35, 17, 35, 0.42);
  border: 1px solid #231123;
  box-shadow: 0px 4px 17px rgba(152, 73, 0, 0.25);
  border-radius: 5px;
  text-decoration: none;
  width: 5rem;
  left: 50%;
}
</style>