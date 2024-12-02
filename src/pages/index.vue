<template>
  <h1>Classemement des équipes</h1>
    <v-list lines="two">
      <v-list-item
        class="mb-5"
        v-for="equipe in getEquipesSortedByScore"
        :key="equipe.id"
     >
        <v-list-item-title>{{ equipe.name }} - {{ scoreStore.getPoints(equipe.id) }}</v-list-item-title>
      </v-list-item>
    </v-list>
</template>

<script setup>
  import { useScoreStore } from "@/stores/scoreStore"
  import { computed } from "vue";

  const scoreStore = useScoreStore()
  const { getEquipesSortedByScore } = scoreStore
  const equipes = computed(() => getEquipesSortedByScore)
</script>

<style>
</style>
