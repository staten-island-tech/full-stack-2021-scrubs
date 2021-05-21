<template>
  <div>
    <Room :game="game" />
  </div>
</template>

<script>
import Room from "@/components/Room";
export default {
  components: {
    Room
  },
  data() {
    return {
      game: "BlackJackGame"
    };
  }
};
</script>

<style lang="scss" scoped></style>