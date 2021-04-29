<template>
  <div class="container">
    <input type = "text" v-on:input=" usernameCreate= $event.target.value" placeholder="Username" ref = "usernameCreate"/>
    <input type = "text" v-on:input=" passwordCreate= $event.target.value" placeholder="Password" ref = "passwordCreate"/>
    <button @click="createAccount()">Create Account</button>
  </div>
</template>
<script>
import {auth, database} from "@/firebase"

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
        auth.createUserWithEmailAndPassword(this.usernameCreate, this.passwordCreate).then((userCredential) => {
          database.collection("users").doc(userCredential.user.uid).set({
            currentGame: "none"
          }).then;
          console.log(userCredential)
          auth.signOut()
          this.$router.push({ name: 'auth' });
        }).catch((error) => {
          var errorMessage = error.message;
          alert(errorMessage);
          this.$refs["usernameCreate"].value = "";
          this.$refs["passwordCreate"].value = "";
        });
    }
    },
}
</script>