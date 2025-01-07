<template>
  <h1 class="d-inline mr-3">Classemement des équipes</h1>
  <v-btn class="bg-cyan te mb-3" icon to="/equipes/add"><b>+</b></v-btn>

  <!-- Classement des équipes -->
  <table>
    <tr>
      <th>#</th>
      <th>Nom de l'équipe</th>
      <th>Nombres de points</th>
      <th></th>
    </tr>
    <tr
      v-for="(equipe, index) in scoreStore.getEquipesSortedByScore"
      :key="equipe.id"
    >
      <td class="text-center">{{ index + 1 }}</td>
      <td>{{ equipe.name }}</td>
      <td>{{ equipe.nbPoints }} points</td>
      <td class="text-center"><v-btn icon="mdi-delete" class="bg-red" @click="confirmerChoix(equipe.id)" /></td>
    </tr>
  </table>
  <v-dialog
    v-model="dialog"
    width="auto"
  >
    <v-card
      max-width="400"
      prepend-icon="mdi-update"
      text="Êtes vous sûr de vouloir supprimer l'équipe ? (Cette action supprime aussi les matchs que l'équipe a joué)"
      title="Confirmation"
    >
      <template v-slot:actions>
        <v-btn
          class="bg-green"
          @click="deleteEquipe(equipeChoisi)"
        >
          Oui
        </v-btn>

        <v-btn
          class="bg-red"
          @click="dialog = false"
        >
          Non
        </v-btn>
      </template>
    </v-card>
  </v-dialog>
</template>

<script setup>
import {useScoreStore} from "@/stores/scoreStore"
import {computed} from "vue"
import router from "@/router";

const scoreStore = useScoreStore()
const {getEquipesSortedByScore} = scoreStore

const deleteEquipe = (id) => {
  scoreStore.deleteEquipe(id)
  dialog.value = false
}

const dialog = ref(false)
const equipeChoisi = ref(null)

const confirmerChoix = (id) => {
  equipeChoisi.value = id
  dialog.value = true
}
</script>

<style>

</style>
