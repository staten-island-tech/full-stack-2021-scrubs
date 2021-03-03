<template>
    <div>
        <Game :lobby="lobby" :draw="draw"/>
    </div>
</template>

<script>
import Game from '@/components/Game.vue'

    export default {
        components: {
            Game,
        },
        data() {
            return {
                lobby: '/PokerLobby',
                draw: 2
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>