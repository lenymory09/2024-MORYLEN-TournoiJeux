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
    >
        <td>
          <router-link :to="`/matchs/${match.id}`" class="text-decoration-none">
            {{ jeuxVideos.find(jeu => jeu.id === match.jeu).name }}
          </router-link>
        </td>
        <td>
          <router-link :to="`/matchs/${match.id}`" class="text-decoration-none">
            {{ match.equipes[0].name }}
          </router-link>
        </td>
        <td>
          <router-link :to="`/matchs/${match.id}`" class="text-decoration-none">
            {{ match.equipes[0].score }}
          </router-link>
        </td>
        <td>
          <router-link :to="`/matchs/${match.id}`" class="text-decoration-none">
            {{ match.equipes[1].score }}
          </router-link>
          </td>
      <td>
        <router-link :to="`/matchs/${match.id}`" class="text-decoration-none">
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
  width: 100%

td, th
  border: 1px solid #dddddd
  text-align: left
  padding: 8px
</style>
