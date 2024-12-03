<script setup>
// Importattion des fonctions et variables nécessaires
import {ref, useTemplateRef} from "vue"
import { useScoreStore } from "@/stores/scoreStore"
import router from "@/router";
import { storeToRefs } from "pinia";

const scoreStore = useScoreStore()

const { equipes, jeuxVideos } = storeToRefs(scoreStore)
const { getNomsEquipes } = scoreStore

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

    <v-combobox
      v-model="match.equipes[0].name"
      :items="getNomsEquipes"
      label="Nom de l'équipe 1"
    />

    <!-- Saisie du score --> <!-- todo changer en fonction des jeux choisis -->
    <v-text-field :rules="rules" label="Score" v-model.number="match.equipes[0].score" />

    <v-combobox
      v-model="match.equipes[1].name"
      :items="getNomsEquipes"
      label="Nom de l'équipe 2"
    />

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
  .input-equipe-1,
  .input-equipe-2
    padding: 5px
    background-color: #333
</style>
