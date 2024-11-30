<template>
  <h1>Classemement des équipes</h1>
  <ol>
    <li v-for="equipe in getEquipesSortedByScore" :key="equipe.id">
      {{ equipe.name }} : {{ scoreStore.getPoints(equipe.id) }} points.
    </li>
  </ol>
</template>

<script setup>
  import { useScoreStore } from "@/stores/scoreStore"
  import { computed } from "vue";

  const scoreStore = useScoreStore()
  const { getEquipesSortedByScore } = scoreStore
</script>
