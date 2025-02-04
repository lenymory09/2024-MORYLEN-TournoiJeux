<template>
  <h1>Tournoi de jeux vidéo</h1>
  <h2 class="mb-5">Classement des équipes</h2>
  <!-- Classement des équipes -->
  <table>
    <tr>
      <th class="text-center">#</th>
      <th>Nom de l'équipe</th>
      <th>Nombres de points</th>
    </tr>
    <tr
      v-for="(equipe, index) in scoreStore.getEquipesSortedByScore"
      :key="equipe.id"
    >
      <td class="text-center">{{ index + 1 }}</td>
      <td>{{ equipe.name }}</td>
      <td>{{ equipe.nbPoints }} points</td>
    </tr>
  </table>
</template>

<script setup>
import { useScoreStore } from "@/stores/scoreStore"
const scoreStore = useScoreStore()
</script>

<style>
th, td {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}
</style>
