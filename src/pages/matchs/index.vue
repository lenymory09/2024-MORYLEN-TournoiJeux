<script setup>
// Importation des fonctions et variables nécessaires
import {storeToRefs} from "pinia"
import {useScoreStore} from "@/stores/scoreStore"

const scoreStore = useScoreStore()
const {matchs, jeuxVideos} = storeToRefs(scoreStore)
</script>

<template>
  <h1 class="mr-3">Matchs</h1>
  <table>
    <tr>
      <th>Jeu</th>
      <th>Equipe N°1</th>
      <th>Score N°1</th>
      <th>Score N°2</th>
      <th>Equipe N°2</th>
    </tr>
    <tr
      v-for="match in matchs"
      :key="match.id"
      class="text-decoration-none"
    >
      <td>
        {{ jeuxVideos.find(jeu => jeu.id === match.jeu).name }}
      </td>
      <td>
        {{ match.equipes[0].name }}
      </td>
      <td class="text-center">
        {{ match.equipes[0].score }}
      </td>
      <td class="text-center">
          {{ match.equipes[1].score }}
      </td>
      <td class="tableau-match_cellule">
        {{ match.equipes[1].name }}
      </td>
    </tr>

  </table>
</template>

<style scoped lang="sass">
h1
  margin-top: 30px
  margin-bottom: 30px
  font-size: 3rem

table
  font-family: arial, sans-serif
  border-collapse: collapse

th, td
  border: 1px solid #dddddd
  text-align: left
</style>
