<template>
  <div class="play">
      <CardGames :game="game1" :path="router1"/>
      <CardGames :game="game2" :path="router2"/> 
  </div>
</template>

<script>

import CardGames from '@/components/CardGames.vue'

export default {
  name: "Games",
  components: {
    CardGames
  },
  data(){
    return{
      game1: 'Poker',
      game2: 'Big Two',
      router1: 'PokerLobby',
      router2: 'BigTwoLobby',
      router1Path: '/PokerLobby',
      router2Path: '/BigTwoLobby'
    }
  }
}
</script>