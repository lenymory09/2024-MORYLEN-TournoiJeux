<template>
  <h1 class="d-inline mr-3">Classemement des équipes</h1>
  <v-btn class="bg-cyan te mb-3" icon to="/equipes/add"><b>+</b></v-btn>

  <!-- Classement des équipes -->
  <v-list lines="two">
    <v-list-item
      class="mb-5"
      v-for="equipe in equipes"
      :key="equipe.id"
    >
      <v-list-item-title>{{ equipe.name }} - {{ scoreStore.getPoints(equipe.id) }} points.</v-list-item-title>
    </v-list-item>
  </v-list>
</template>

<script setup>
import {useScoreStore} from "@/stores/scoreStore"
import {computed} from "vue"

const scoreStore = useScoreStore()
const { getEquipesSortedByScore } = scoreStore
const equipes = computed(() => getEquipesSortedByScore)
</script>

<style>
</style>
