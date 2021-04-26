<template>
  <section class="container">
    <div class="container-inputs">
      <input
        class="username"
        type="text"
        v-on:input="usernameCreate = $event.target.value"
        placeholder="Username"
        ref="usernameCreate"
      />
      <input
        class="password"
        type="text"
        v-on:input="passwordCreate = $event.target.value"
        placeholder="Password"
        ref="passwordCreate"
      />
    </div>
    <button class="create" @click="createAccount()">Create Account</button>
  </section>
</template>
<script>
import { auth } from "@/firebase";

export default {
  data() {
    return {
      usernameCreate: "",
      passwordCreate: "",
    };
  },
  methods: {
    createAccount: function () {
      console.log(this.usernameCreate);
      console.log(this.passwordCreate);
      auth
        .createUserWithEmailAndPassword(
          this.usernameCreate,
          this.passwordCreate
        )
        .then((userCredential) => {
          console.log(userCredential);
          auth.signOut();
          this.$router.push({ name: "auth" });
        })
        .catch((error) => {
          var errorMessage = error.message;
          alert(errorMessage);
          this.$refs["usernameCreate"].value = "";
          this.$refs["passwordCreate"].value = "";
        });
    },
  },
};
</script>
<style lang="scss">
</style>