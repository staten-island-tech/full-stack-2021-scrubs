<template>
    <div>
        <button id="leave">
            <router-link :to="lobby">Leave</router-link>
        </button>
        <div v-if="!gameStarts" class="game-interface">
            <hr>
            {{lobbyName}}
            <hr>
            <p v-for="player in players" :key="player">
                {{player}}
            </p>
            <button @click="deal">Start</button>
        </div>
        <div v-if="gameStarts">
            <button @click="deal">Try Again</button>
            <div v-for="(hand, index) in playerHand" :key="index" class="hand">
                Player {{index+1}} Hand
                <div v-for="cards in playerHand[index].hand" :key="cards.code">
                    {{cards.value}}
                    {{cards.suit}}
                    <hr>
                    <img :src="cards.image" alt="cards.code">
                </div>
            </div>
        </div>
        <div v-if="alert">
            API Call Failed, This is due to the failed HTTP Request. Hit start again to fetch the api again.
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Game',
    props: {
        lobby: String,
        draw: Number,
    },
    data() {
        return {
            deckID: '',
            lobbyName: 'Lobby1',
            players:['Player1', 'Player2', 'Player3', 'Player4'],
            playerHand: [
                {
                    player: 1,
                    hand: []
                },
                {
                    player: 2,
                    hand: []
                },
                {
                    player: 3,
                    hand: []
                },
                {
                    player: 4,
                    hand: []
                },
                {
                    player: 5,
                    hand: []
                },
                {
                    player: 6,
                    hand: []
                },
                {
                    player: 7,
                    hand: []
                },
                {
                    player: 8,
                    hand: []
                },
                {
                    player: 9,
                    hand: []
                },
                {
                    player: 10,
                    hand: []
                },
                {
                    player: 11,
                    hand: []
                },
                {
                    player: 12,
                    hand: []
                },
                {
                    player: 13,
                    hand: []
                },
            ],
            check: true,
            deck: '',
            gameStarted: false,
            rotation: false,
            spectate: true,
            finished: false,
            alert: false,
        }
    },
    computed: {
        gameStarts: function(){
            return this.gameStarted;
        }
    },
    methods: {
        deal() {
            let vm = this
            vm.apiCall('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1').then(
                deck => {
                    vm.playerHand.forEach(async function(card){
                        let result = await vm.apiCall(`https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=4`).catch(
                            (error) => vm.catchError(error.__proto__.name)
                        )
                        card.hand = result.cards
                        console.log(card.hand)
                    }
                    )
                }
            )
        },
        apiCall(url){
            let vm = this
            if (vm.check){
                return axios.get(url).then(response => {
                    vm.gameStarted = true
                    console.log(response.data)
                    return response.data
                })
            }
        },
        catchError(theError){
            let vm = this
            if (theError == 'Error'){
                vm.check = false
                vm.gameStarted = false
                console.log(vm.check)
                console.log(vm.gameStarted)
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.game-interface{
    font-size: 20px;
}

#leave{
    display: block;
    text-align: left;
}

.hand{
    justify-content: space-evenly;
    font-size: 7px;
    width: 100%;
    display: flex
}

img{
    width: 50%;
}
</style>