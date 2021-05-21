<template>
  <div class="container">
    <input type = "text" v-on:input=" emailCreate= $event.target.value" placeholder="Email" ref = "emailCreate"/>
    <input type = "text" v-on:input=" usernameCreate= $event.target.value" placeholder="Username" ref = "usernameCreate"/>
    <input type = "text" v-on:input=" passwordCreate= $event.target.value" placeholder="Password" ref = "passwordCreate"/>
    <button @click="createAccount()">Create Account</button>
  </div>
</template>
<script>
import {auth} from "@/firebase"

export default {
          data() {
    return {
      emailCreate: "",
      passwordCreate: "",
      usernameCreate: "",
    };
  },
  methods: {
    createAccount: function() {
        console.log(this.emailCreate)
        console.log(this.passwordCreate)
        //creates account with email and pass
        auth.createUserWithEmailAndPassword(this.emailCreate, this.passwordCreate).then((userCredential) => {
          return userCredential.user.updateProfile({
          displayName: this.usernameCreate
          }),
          console.log(userCredential),
          auth.signOut(),
          this.$router.push({ name: 'auth' });
        }).catch((error) => {
          var errorMessage = error.message;
          alert(errorMessage);
          this.$refs["emailCreate"].value = "";
          this.$refs["passwordCreate"].value = "";
        });
        //display name
      }
   },
}
</script>