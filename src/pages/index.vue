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
      <td class="text-center"><v-btn icon class="bg-red" @click="confirmerChoix(equipe.id)"><v-icon>mdi-delete</v-icon></v-btn></td>
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
          @click="deleteEquipe(idEquipeChoisi)"
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

const scoreStore = useScoreStore()

/**
 * Supprime une équipe
 * @param id de l'équipe à supprimer
 * @returns {Promise<void>}
 */
const deleteEquipe = async (id) => {
  console.log("suppression de l'équipe avec l'id : ", id)
  await scoreStore.deleteEquipe(id)
  dialog.value = false
}

const dialog = ref(false)
const idEquipeChoisi = ref(null)

/**
 * Confirme le choix pour supprimer l'équipe
 * @param id de l'équipe à supprimer
 */
const confirmerChoix = (id) => {
  console.log("équipe choisie : ", id)
  idEquipeChoisi.value = id
  dialog.value = true
}


</script>

<style>
table {
  margin-bottom: 30px;
}

th, td {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}
</style>
