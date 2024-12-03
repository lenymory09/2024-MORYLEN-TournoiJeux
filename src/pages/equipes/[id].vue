<script setup>
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useScoreStore } from '@/stores/scoreStore'
import {onMounted} from "vue";

// Récupération de la route active pour accéder aux paramètres
const route = useRoute()
const router = useRouter()
const scoreStore = useScoreStore()
const { selectEquipeById } = scoreStore
const { selectedEquipe } = storeToRefs(scoreStore)

onMounted(() => {
  // Le nom de ce fichier pokemon/[id].vue créer une route dynamique avec un paramètre `id`
  // route.params.id permet de récupérer la valeur de l'ID dans l'URL
  // Par exemple, pour l'URL `/pokemon/25-pika`, route.params.id vaudra `25-pika`
  const idEquipe = route.params.id
  console.log(route.params.id)
  // Vérification et récupération du Pokémon avec l'ID fourni
  const equipeExists = selectEquipeById(parseInt(idEquipe))
  // Si le Pokémon n'existe pas, redirection vers une page 404
  if (!equipeExists) {
    console.log("L'équipe n'a pas été trouvé")
    router.push('/404') // Redirection en cas d'ID invalide
  }
})
</script>

<template>
  <h2>{{ selectedEquipe.name }}</h2>
</template>

<style scoped lang="sass">

</style>
