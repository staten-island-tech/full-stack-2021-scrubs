<template>
  <section class="container">
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Grand+Hotel&display=swap"
    />
    <link
      href="https://fonts.googleapis.com/css2?family=Roboto&display=swap"
      rel="stylesheet"
    />
    <nav class="container-buttons">
      <button class="container-buttons-button">About</button>
      <button class="container-buttons-button">Credits</button>
      <button class="container-buttons-button">Donate</button>
      <button
        v-if="loginStatus"
        class="container-buttons-button"
        @click="logout()"
      >
        Log Out
      </button>
      <button v-else class="container-buttons-button" @click="login()">
        Log In | Sign Up
      </button>
    </nav>
    <h1 class="container-title">It's Not An Addiction Casino</h1>
    <nav class="play-game">
      <button class="play-button" @click="playGame()">Play</button>
    </nav>
  </section>
</template>

<script>
import { auth } from "@/firebase";

export default {
  data() {
    return {
      play: false,
      roomCode: "",
      loginStatus: true,
    };
  },
  methods: {
    playGame: function () {
      if (this.loginStatus === true) {
        this.$router.push({ name: "BlackJackLobby" });
      } else {
        this.$router.push({ name: "auth" });
      }
    },
    login: function () {
      this.$router.push({ name: "auth" });
    },
    logout: function () {
      auth
        .signOut()
        .then(() => {
          console.log("signed out");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.loginStatus = true;
        console.log(this.loginStatus);
      } else {
        this.loginStatus = false;
        console.log(this.loginStatus);
      }
    });
  },
};
</script>
<style lang="scss">
html {
  font-size: 62.5%;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  margin: 0;
}

@mixin laptop {
  @media (min-width: 900px) {
    @content;
  }
}

.container {
  height: 100vh;
  background-image: radial-gradient(
    50% 50% at 50% 50%,
    rgba(#ac0000, 0.87) 0%,
    rgba(#690000, 0.87) 100%
  );
}

.container-buttons {
  display: flex;
  justify-content: space-evenly;
  margin-left: 1.5rem;
  margin-right: 1.5rem;
}

.container-buttons-button {
  margin-top: 10px;
  font-size: 3rem;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  color: #ffd600;
  background: rgba(35, 17, 35, 0.42);
  border: 1px solid #231123;
  box-shadow: 0px 4px 17px rgba(152, 73, 0, 0.25);
  border-radius: 5px;
}

.container-title {
  background: rgba(35, 17, 35, 0.42);
  font-size: 7.2rem;
  font-family: Grand Hotel;
  font-style: normal;
  font-weight: normal;
  position: absolute;
  left: 32.5%;
  width: 35%;
  border-radius: 2.5rem;

  color: #ffd600;
  text-shadow: 0.5rem 0.5rem 0.5rem #231123;
  @include laptop {
    width: 45%;
    left: 30%;
  }
}

.play-game {
  position: absolute;
  top: 45%;
  left: 47.5%;
}

.play-button {
  margin-top: 10px;
  font-size: 6rem;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  color: #ffd600;
  background: rgba(35, 17, 35, 0.42);
  border: 1px solid #231123;
  box-shadow: 0px 4px 17px rgba(152, 73, 0, 0.25);
  border-radius: 1.5rem;
}
</style>