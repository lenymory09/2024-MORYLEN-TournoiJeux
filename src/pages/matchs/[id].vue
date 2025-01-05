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
const idMatch = route.params.id;
// Vérification et récupération du Pokémon avec l'ID fourni
// Si le Pokémon n'existe pas, redirection vers une page 404

const matchExists = selectMatchById(idMatch)

// création d'un nouveau match
const nouveauScore = ref({
  score1: 0,
  score2: 0
})

const response = ref(null)

const dialog = ref(false)

onMounted(() => {
  console.log("ID du match: ", idMatch)

  if (!matchExists) {
    console.log("Le match n'a pas été trouvé")
    router.push('/404') // Redirection en cas d'ID invalide
  } else {
    console.log("match trouvé")
  }
})

const modifierScore = async () => {
  // Petit log 🤓 (pour être sûr que je ne fasse pas de la merde)
  console.log(JSON.stringify(nouveauScore.value))

  // Modifier le score du match
  response.value = await scoreStore.modifierScore(nouveauScore.value, idMatch)

  // Cherche l'index du match dans le store.
  // let indexMatch = scoreStore.matchs.findIndex(match => match.id === idMatch)

  if (response.value.success) {
    router.push("/matchs")
    console.log("Score modifié avec succès")
  } else {
    console.log(response.value.message)
  }
}

const deleteMatch = async (id) => {
  response.value = await scoreStore.deleteMatch(id)
  if (response.value.success) {
    router.push("/matchs")
    console.log("Match supprimé avec succès")
  } else {
    console.log("Erreur : ", response.value.message)
  }
}
</script>

<template>
  <h1>Match</h1>

  <!-- Premier score et formulaire de changement -->
  <h2 class="d-inline">
    {{ selectedMatch.equipes[0].name }} -
    {{ selectedMatch.equipes[0].score }}
  </h2>
  <v-text-field
    label="Score"
    v-model.number="nouveauScore.score1"
    type="number"
  />

  <!-- Deuxième score et formulaire de changement -->
  <h2 class="d-inline">
    {{ selectedMatch.equipes[1].name }} -
    {{ selectedMatch.equipes[1].score }}
  </h2>
  <v-text-field
    label="Score"
    v-model.number="nouveauScore.score2"
    type="number"
  />

  <v-alert
    v-if="response"
    border="top"
    type="warning"
    variant="outlined"
    prominent
  >
    {{ response.message }}
  </v-alert>

  <!-- bouton de submit du formulaire -->
  <v-btn @click="modifierScore">Changer les scores</v-btn>
  <v-btn class="ml-2 bg-red" @click="dialog = true">Supprimer le match</v-btn>

  <v-dialog
    v-model="dialog"
    width="auto"
  >
    <v-card
      max-width="400"
      prepend-icon="mdi-update"
      text="Êtes vous sûr de vouloir supprimer le match ?"
      title="Confirmation"
    >
      <template v-slot:actions>
        <v-btn
          class="bg-green"
          @click="deleteMatch(idMatch)"
        >
          Oui
        </v-btn>

        <v-btn
          class="bg-red"
          @click="dialog = false"
        >Non</v-btn>
      </template>
    </v-card>
  </v-dialog>
</template>

<style scoped lang="sass">

</style>
