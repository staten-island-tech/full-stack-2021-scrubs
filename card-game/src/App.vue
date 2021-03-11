<template>
  <div id="app">
    <div id="nav">
      <router-link id="home" to="/">Home</router-link>
      <router-link id="about" to="/About">About</router-link>
      <router-link id="games" to="/Games">Games</router-link>
      <router-link id="credits" to="/Credits">Credits</router-link>
      <router-link id="donate" to="/Donate">Donate</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
body {
  font-size: 62.5%;
}
#app {
  text-align: center;
  color: #2c3e50;
}

#nav {
  font-family: "Noto Sans KR", sans-serif;
  font-size: 1.5rem;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  border-style: solid;
}

#nav * {
  border-style: solid;
  border-radius: 2rem;
  margin: auto;
  padding: 40px;
  background-image: linear-gradient(to right, #ee9ca7, #ffdde1);
  transition: 0.5s;
}

#nav *:hover {
  order: 0;
  flex-grow: 0.25;
}
</style>
