<script setup>
// Importattion des fonctions et variables nécessaires
import { ref } from "vue"
import { useScoreStore } from "@/stores/scoreStore"
import router from "@/router";
import { storeToRefs } from "pinia";

const scoreStore = useScoreStore()

const { equipes, jeuxVideos } = storeToRefs(scoreStore)

const reponse = ref(null)

const match = ref({
  jeu: "",
  equipes: [
    { name: "", score: 0},
    { name: "", score: 0}
  ]
})

const rules = [
  value => !!value || 'Requis.',
]

function addMatch() {
  const inputEquipe1 = document.querySelector("#input-equipe-1")
  const inputEquipe2 = document.querySelector("#input-equipe-2")

  match.value.equipes[0].name = inputEquipe1.value
  match.value.equipes[1].name = inputEquipe2.value

  console.log(JSON.stringify(match.value))

  reponse.value = scoreStore.addMatch(match.value)

  if (reponse.value.success) {
    // Réinitialisation des données après succès
    reponse.value = null
    match.value = {
      jeu: "",
      equipes: [
        { name: "", score: 0},
        { name: "", score: 0}
      ]}

    // Redirection vers la page d'accueil
    router.push("/")
  }
}
</script>

<template>
  <h1>Ajouter un match</h1>

  <v-form @submit.prevent="addMatch">
    <!-- Saisie du jeu -->
    <v-radio-group v-model="match.jeu">
      <v-radio v-for="jeu in jeuxVideos" :label="jeu.name" :value="jeu.id" />
    </v-radio-group>


    <!-- TODO création d'une input de séléction d'équipes -->
    <select id="input-equipe-1">
      <option v-for="equipe in equipes" :value="equipe.name">{{ equipe.name }}</option>
    </select>

    <!-- Saisie du score --> <!-- todo changer en fonction des jeux choisis -->
    <v-text-field :rules="rules" label="Score" v-model.number="match.equipes[0].score" />

    <select id="input-equipe-2">
      <option v-for="equipe in equipes" :value="equipe.name">{{ equipe.name }}</option>
    </select>

    <!-- Saisie du score --> <!-- todo changer en fonction des jeux choisis -->
    <v-text-field :rules="rules" label="Score" v-model.number="match.equipes[1].score" />

    <v-alert
      v-if="reponse"
      border="top"
      type="warning"
      variant="outlined"
      prominent
    >
      {{ reponse.message }}
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
