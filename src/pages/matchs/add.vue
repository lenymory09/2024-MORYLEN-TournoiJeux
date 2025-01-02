<script setup>
// Importation des composants
import {ref} from "vue"
import {useScoreStore} from "@/stores/scoreStore"
import router from "@/router";
import {storeToRefs} from "pinia";

// Importation du magasin de score
const scoreStore = useScoreStore()
const { jeuxVideos } = storeToRefs(scoreStore)
const { getNomsEquipes } = scoreStore

// initialisation des données pour l'ajout des matchs
const reponse = ref(null)
const match = ref({
  jeu: "",
  equipes: [
    {name: "", score: 0},
    {name: "", score: 0}
  ]
})

const rules = [
  value => !!value || 'Requis.',
]

/**
 * Fonction pour ajouter un match
 */
const addMatch = () => {
  // Petit log
  console.log(JSON.stringify(match.value))

  // Ajout du match
  reponse.value = scoreStore.addMatch(match.value)

  // Si l'ajout est un succès, redirection vers la page d'accueil
  if (reponse.value.success) {
    // Réinitialisation des données après succès
    reponse.value = null
    match.value = {
      jeu: "",
      equipes: [
        {name: "", score: 0},
        {name: "", score: 0}
      ]
    }

    // Redirection vers la page d'accueil
    router.push("/matchs")
  }
}
</script>

<template>
  <h1>Ajouter un match</h1>

  <v-form @submit.prevent="addMatch">
    <!-- Saisie du jeu -->
    <v-radio-group v-model="match.jeu">
      <v-radio v-for="jeu in jeuxVideos" :label="jeu.name" :value="jeu.id"/>
    </v-radio-group>

    <v-combobox
      v-model="match.equipes[0].name"
      :items="getNomsEquipes"
      label="Nom de l'équipe 1"
      :rules="rules"
    />

    <!-- Saisie du score --> <!-- todo changer en fonction des jeux choisis -->
    <v-text-field
      label="Score"
      v-model.number="match.equipes[0].score"
      type="number"
    />

    <v-combobox
      v-model="match.equipes[1].name"
      :items="getNomsEquipes"
      label="Nom de l'équipe 2"
      :rules="rules"
    />

    <!-- Saisie du score --> <!-- todo changer en fonction des jeux choisis -->
    <v-text-field
      label="Score"
      v-model.number="match.equipes[1].score"
      type="number"
    />

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
