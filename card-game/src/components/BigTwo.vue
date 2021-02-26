<template>
    <div>
        <h1>SIMULATING AS IF THE GAME CREATION PART HAS FINISHED</h1>
        <button @click="getDeck" v-if="play">{{deckButton}}</button>
        <button @click="drawCards" v-if="dealt">{{dealButton}}</button>
        <div class="game">
            <h1>Player 1 Hand</h1>
            <ul v-for="num in player1Hand" :key="num.code">
                <p>{{num.value}}</p>
                <p>{{num.suit}}</p>
                <img :src="num.image" :alt="num.code">
            </ul>
            <br>
            <h1>Player 2 Hand</h1>
            <ul v-for="num in player2Hand" :key="num.code">
                <p>{{num.value}}</p>
                <p>{{num.suit}}</p>
                <img :src="num.image" :alt="num.code">
            </ul>
            <br>
            <h1>Player 3 Hand</h1>
            <ul v-for="num in player3Hand" :key="num.code">
                <p>{{num.value}}</p>
                <p>{{num.suit}}</p>
                <img :src="num.image" :alt="num.code">
            </ul>
            <br>
            <h1>Player 4 Hand</h1>
            <ul v-for="num in player4Hand" :key="num.code">
                <p>{{num.value}}</p>
                <p>{{num.suit}}</p>
                <img :src="num.image" :alt="num.code">
            </ul>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: "BigTwo",
        data() {
            return {
                play: true,
                dealt: false,
                deck: '',
                deckID: '',
                player1Hand: [],
                player2Hand: [],
                player3Hand: [],
                player4Hand: [],
                deckButton: 'Play',
                dealButton: 'Deal'
            }
        },
        methods: {
            shuffleDeck(){
                axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1').then(
                    response => this.deck = response
                )
            },
            getDeck(){
                this.deckID = this.deck.data.deck_id
                this.shuffleDeck();
                this.dealt = !this.dealt;
                this.play = !this.play;
                this.deckButton = 'Play again?'
            },
            drawCards(){
                axios.get(`https://deckofcardsapi.com/api/deck/${this.deckID}/draw/?count=13`).then(
                    response => this.player1Hand = (response.data.cards)
                );
                axios.get(`https://deckofcardsapi.com/api/deck/${this.deckID}/draw/?count=13`).then(
                    response => this.player2Hand = (response.data.cards)
                );
                axios.get(`https://deckofcardsapi.com/api/deck/${this.deckID}/draw/?count=13`).then(
                    response => this.player3Hand = (response.data.cards)
                );
                axios.get(`https://deckofcardsapi.com/api/deck/${this.deckID}/draw/?count=13`).then(
                    response => this.player4Hand = (response.data.cards)
                );
                this.dealt = !this.dealt;
                this.play = !this.play;
            }
        },
        mounted(){
            this.shuffleDeck()
        }
    }
</script>

<style lang="scss" scoped>
.game{
    text-align: center;
    width: 100%;
    justify-content: space-evenly;
}
img{
    width: 10%;
}
</style>
