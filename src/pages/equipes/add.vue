<template>
  <h1>Ajouter une équipe</h1>
  <v-form @submit.prevent="ajouterEquipe">
    <v-text-field label="Nom de l'équipe" v-model.trim="equipe.name"/>
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

</style>

<script setup>
// Importattion des fonctions et variables nécessaires
import {ref} from "vue"
import router from "@/router";

import { useScoreStore } from "@/stores/scoreStore"
const scoreStore = useScoreStore()
const { addEquipe : add } = scoreStore

const response = ref(null)

const equipe = ref({name: ""})

const ajouterEquipe = async () => {
  response.value = await add(equipe.value)
  console.log(JSON.stringify(response.value))

  if (response.value && response.value.success) {
    response.value = null
    equipe.value = { name: "" }
    router.push("/")
  } else {
    console.log("Erreur lors de l'ajout de l'équipe")
  }
}
</script>
