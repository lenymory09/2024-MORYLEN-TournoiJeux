<script setup>
// Importation des fonctions et variables nécessaires
import { storeToRefs } from "pinia"
import { useScoreStore } from "@/stores/scoreStore"
const scoreStore = useScoreStore()
const { matchs, jeuxVideos } = storeToRefs(scoreStore)
</script>

<template>
  <h1 class="d-inline mr-3">Matchs</h1> <v-btn class="bg-cyan te mb-3" icon to="/matchs/add"><b>+</b></v-btn>
  <v-list lines="two">
    <v-list-item
      class="mb-5"
      v-for="match in matchs"
      :key="match.id"
    >
      <v-list-item-title>{{ jeuxVideos.find(jeu => jeu.id === match.jeu).name }} - {{ match.equipes[0].name }} - {{ match.equipes[1].name }}</v-list-item-title>
    </v-list-item>
  </v-list>
</template>

<style scoped lang="sass">

</style>
