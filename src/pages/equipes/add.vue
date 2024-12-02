<script setup>
  // Importattion des fonctions et variables nécessaires
import { ref } from "vue"
  import { useScoreStore } from "@/stores/scoreStore"
  import router from "@/router";
  const scoreStore = useScoreStore()

  const response = ref(null)

  const equipe = ref({ name: "" })
  function addEquipe() {
    response.value = scoreStore.addEquipe(equipe.value)

    if (response.value.success) {
      // Réinitialisation des données après succès
      response.value = null
      equipe.value = { name: "" }
      router.push("/")
    }
  }
</script>

<template>
  <h1>Ajouter une équipe</h1>
  <v-form @submit.prevent="addEquipe">
    <v-text-field :rules="rules" label="Nom de l'équipe" v-model.trim="equipe.name" />
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
