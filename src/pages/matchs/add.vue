<script setup>
// Importattion des fonctions et variables nécessaires
import { ref } from "vue"
import { useScoreStore } from "@/stores/scoreStore"
import router from "@/router";
import { storeToRefs } from "pinia";

const scoreStore = useScoreStore()

const { equipes, jeuxVideos } = storeToRefs(scoreStore)

const response = ref(null)

const match = ref({
  name: "",
  equipes: [
    { id: 0, score: 0},
    { id: 0, score: 0}
  ]
})

const rules = [
  value => !!value || 'Requis.',
]

function addMatch() {
  const inputEquipe1 = document.querySelector("#input-equipe-1")
  const inputEquipe2 = document.querySelector("#input-equipe-2")

  match.value.equipes[0].id = inputEquipe1.value
  match.value.equipes[1].id = inputEquipe2.value

  response.value = scoreStore.addMatch(match.value)

  if (response.value.success) {
    // Réinitialisation des données après succès
    response.value = null
    match.value = {
      name: "",
      equipes: [
        { id: 0, score: 0},
        { id: 0, score: 0}
      ]
    }
    router.push("/")
  }
}
</script>

<template>
  <h1>Ajouter un match</h1>

  <v-form @submit.prevent="addMatch">
    <!-- Saisie du jeu -->
    <select v-model="match.jeu">
      <option v-for="jeu in jeuxVideos" :value="jeu.id">{{ jeu.name }}</option>
    </select>

    <!-- TODO création d'une input de séléction d'équipes -->
    <select id="input-equipe-1">
      <option v-for="equipe in equipes" :value="equipe.id">{{ equipe.name }}</option>
    </select>



    <select id="input-equipe-2">
      <option v-for="equipe in equipes" :value="equipe.id">{{ equipe.name }}</option>
    </select>

    <v-alert
      v-if="response"
      border="top"
      type="warning"
      variant="outlined"
      prominent
    >
      {{ response.message }}
    </v-alert>
    <v-btn type="submit">Ajouter</v-btn>
  </v-form>
</template>


<style scoped lang="sass">
  #input-equipe-1,
  #input-equipe-2
    padding: 5px
    background-color: #333
</style>
