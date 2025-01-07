<script setup>
// Importation des fonctions et variables nécessaires
import {storeToRefs} from "pinia"
import {useScoreStore} from "@/stores/scoreStore"

const scoreStore = useScoreStore()
const {matchs, jeuxVideos} = storeToRefs(scoreStore)
</script>

<template>
  <h1 class="d-inline mr-3">Matchs</h1>
  <!-- bouton pour ajouter un match -->
  <v-btn class="bg-cyan te mb-3" icon to="/matchs/add"><b>+</b></v-btn>
  <table>
    <tr>
      <th>Jeu</th>
      <th>Equipe n°1</th>
      <th>Score n°1</th>
      <th>Score n°2</th>
      <th>Equipe n°2</th>
    </tr>
    <tr
      v-for="match in matchs"
      :key="match.id"
      class="text-decoration-none"
    >
      <td>
        <router-link :to="`/matchs/${match.id}`" class="tableau-match_cellule">
          {{ jeuxVideos.find(jeu => jeu.id === match.jeu).name }}
        </router-link>
      </td>
      <td>
        <router-link :to="`/matchs/${match.id}`" class="tableau-match_cellule">
          {{ match.equipes[0].name }}
        </router-link>
      </td>
      <td class="text-center">
        <router-link :to="`/matchs/${match.id}`" class="tableau-match_cellule">
          {{ match.equipes[0].score }}
        </router-link>
      </td>
      <td class="text-center">
        <router-link :to="`/matchs/${match.id}`" class="tableau-match_cellule">
          {{ match.equipes[1].score }}
        </router-link>
      </td>
      <td>
        <router-link :to="`/matchs/${match.id}`" class="tableau-match_cellule">
          {{ match.equipes[1].name }}
        </router-link>
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

td
  padding: 0

.tableau-match_cellule
  width: 100%
  height: 100%
  padding: 8px
  color: white
  text-decoration: none
  display: inline-block
  font-size: 16px

tr:hover:not(tr:first-child)
  border: 2px white solid
</style>
