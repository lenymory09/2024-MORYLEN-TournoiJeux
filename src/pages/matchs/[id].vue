<script setup>
import {useRoute, useRouter} from 'vue-router'
import {useScoreStore} from '@/stores/scoreStore'
import {onMounted} from "vue";
import {storeToRefs} from "pinia";

// Récupération de la route active pour accéder aux paramètres
const route = useRoute()
const router = useRouter()
const scoreStore = useScoreStore()
const {selectMatchById} = scoreStore
const {selectedMatch} = storeToRefs(scoreStore)

// Le nom de ce fichier pokemon/[id].vue créer une route dynamique avec un paramètre `id`
// route.params.id permet de récupérer la valeur de l'ID dans l'URL
// Par exemple, pour l'URL `/pokemon/25-pika`, route.params.id vaudra `25-pika`
const idMatch = route.params.id
console.log(route.params.id)
// Vérification et récupération du Pokémon avec l'ID fourni
// Si le Pokémon n'existe pas, redirection vers une page 404

// création d'un nouveau match
const nouveauMatch = ref(null)

onMounted(() => {
  const matchExists = selectMatchById(idMatch)

  if (!matchExists) {
    console.log("L'équipe n'a pas été trouvé")
    router.push('/404') // Redirection en cas d'ID invalide
  }

  // fait une copie du match sélectionné pour éviter de modifier directement le store
  nouveauMatch.value = JSON.parse(JSON.stringify(scoreStore.selectedMatch))
})

const modifierScore = () => {
  // Petit log 🤓 (pour être sûr que je ne fasse pas de la merde)
  console.log(JSON.stringify(nouveauMatch.value))

  // Cherche l'index du match dans le store.
  let indexMatch = scoreStore.matchs.findIndex(match => match.id === nouveauMatch.value.id)
  if (indexMatch !== -1) {
    scoreStore.matchs[indexMatch] = nouveauMatch.value
    router.push("/matchs")
  } else {
    console.log("Match non trouvé")
  }
}
</script>

<template>
  <h1>Match</h1>

  <!-- Premier score et formulaire de changement -->
  <h2 class="d-inline">{{ selectedMatch.equipes.at(0).name }} -
    {{ selectedMatch.equipes.at(0).score }}</h2>
  <v-text-field
    label="Score"
    v-model.number="nouveauMatch.equipes.at(0).score"
    type="number"/>

  <!-- Deuxième score et formulaire de changement -->
  <h2 class="d-inline">{{ selectedMatch.equipes.at(1).name }} -
    {{ selectedMatch.equipes.at(1).score }}</h2>
  <v-text-field
    label="Score"
    v-model.number="nouveauMatch.equipes.at(1).score"
    type="number"
  />

  <!-- bouton de submit du formulaire -->
  <v-btn @click="modifierScore">Changer les scores</v-btn>
</template>

<style scoped lang="sass">

</style>
