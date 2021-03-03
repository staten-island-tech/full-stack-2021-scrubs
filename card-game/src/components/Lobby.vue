<template>
    <div>
        <router-link id="games" to="/Games">Back</router-link> 
        <table style="width: 100%">
            <tr>
                <th>Lobby Name</th>
                <th>Players</th>
                <th>Spectators</th>
                <th>Started</th>
                <th></th>
            </tr>
                <tr class="joinable">
                    <td>{{ lobbyName }}</td>
                    <td>{{ players }}</td>
                    <td>{{ spectators }}</td>
                    <td>{{ started }}</td>
                    <td><router-link id="games" :to="gameType">{{ join }}</router-link></td>
                </tr>
        </table>
    </div>
</template>

<script>
    export default {
        name: "Lobby",
        data() {
            return {
                lobbyName: 'Lobby1',
                players:'3/4',
                spectators:'0/8',
                started: true,
                join: 'Join',
            }
        }, 
        props: {
            gameType: String
        },
    }
</script>

<style lang="scss" scoped>
table, th, td {
  border: 1px solid black;
  border-collapse: collapse;
}
th, td {
  padding: 15px;
}
th {
  text-align: left;
}
</style>