<template>
  <h1 class="d-inline mr-3">Classemement des équipes</h1>
  <v-btn class="bg-cyan te mb-3" icon to="/equipes/add"><b>+</b></v-btn>

  <!-- Classement des équipes -->
  <table>
    <tr>
      <th>#</th>
      <th>Nom de l'équipe</th>
      <th>Nombres de points</th>
    </tr>
    <tr
      v-for="(equipe, index) in equipes"
      :key="equipe.id"
      @dblclick="deleteEquipe(equipe.id)"
    >
      <td>{{ index + 1 }}</td>
      <td>{{ equipe.name }}</td>
      <td>{{ equipe.nbPoints }} points</td>
    </tr>
  </table>
</template>

<script setup>
import {useScoreStore} from "@/stores/scoreStore"
import {computed} from "vue"
import {storeToRefs} from "pinia"

const scoreStore = useScoreStore()
const {getEquipesSortedByScore} = scoreStore
const equipes = computed(() => {
  return getEquipesSortedByScore
})

const deleteEquipe = async (id) => {
  await scoreStore.deleteEquipe(id)
}
</script>

<style>

</style>
