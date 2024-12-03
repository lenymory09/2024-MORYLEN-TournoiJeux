<script setup>
import { storeToRefs } from "pinia";
import { useScoreStore } from "@/stores/scoreStore";
const scoreStore = useScoreStore()
const { jeuxVideos } = storeToRefs(scoreStore)
</script>

<template>
  <h1>Jeux</h1>
  <v-list lines="two">
    <v-list-item
      class="mb-5"
      v-for="jeu in jeuxVideos"
      :key="jeu.id"
    >
      <v-list-item-title>{{ jeu.name }}</v-list-item-title>
    </v-list-item>
  </v-list>
</template>

<style scoped lang="sass">

</style>
