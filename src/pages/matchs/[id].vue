<script setup>
import {useRoute, useRouter} from 'vue-router'
import {useScoreStore} from '@/stores/scoreStore'
import {onMounted} from "vue";

// Récupération de la route active pour accéder aux paramètres
const route = useRoute()
const router = useRouter()
const scoreStore = useScoreStore()
const {selectMatchById} = scoreStore

const nouveauMatch = ref({
  name: "",
  equipes: [
    {name: "", score: 0},
    {name: "", score: 0},
  ],
})
nouveauMatch.value = scoreStore.selectedMatch

// Le nom de ce fichier pokemon/[id].vue créer une route dynamique avec un paramètre `id`
// route.params.id permet de récupérer la valeur de l'ID dans l'URL
// Par exemple, pour l'URL `/pokemon/25-pika`, route.params.id vaudra `25-pika`
const idMatch = route.params.id
console.log(route.params.id)
// Vérification et récupération du Pokémon avec l'ID fourni
const matchExists = selectMatchById(parseInt(idMatch))
// Si le Pokémon n'existe pas, redirection vers une page 404
if (!matchExists) {
  console.log("L'équipe n'a pas été trouvé")
  router.push('/404') // Redirection en cas d'ID invalide
}

onMounted(() => {})

function modifierScore() {
  console.log(JSON.stringify(nouveauMatch.value))
  if (!nouveauMatch.value || !nouveauMatch.value.equipes) {
    console.log("Données invalides, mise à jour annulée")
    return
  }

  let indexMatch = scoreStore.matchs.findIndex(match => match.id === nouveauMatch.value.id)
  if (indexMatch === -1) {
    console.log("Match non trouvé")
    return
  }

  scoreStore.matchs[indexMatch] = nouveauMatch.value
  router.push("/matchs")
}

</script>

<template>
    <h1>Match</h1>

    <!-- Premier score et formulaire de changement -->
    <h2 class="d-inline">{{ scoreStore.selectedMatch.equipes[0].name }} -
      {{ scoreStore.selectedMatch.equipes[0].score }}</h2>
    <v-text-field label="Score" v-model.number="nouveauMatch.equipes[0].score" />

    <h2 class="d-inline">{{ scoreStore.selectedMatch.equipes[1].name }} -
      {{ scoreStore.selectedMatch.equipes[1].score }}</h2>
    <v-text-field label="Score" v-model.number="nouveauMatch.equipes[1].score" />

    <v-btn @click="modifierScore">submit</v-btn>
</template>

<style scoped lang="sass">

</style>
