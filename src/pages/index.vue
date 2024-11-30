<template>
  <h1>Classemement des équipes</h1>
  <ol>
    <li v-for="equipe in get" :key="equipe.id">
      {{ equipe.name }} : {{ equipe.score }} points.
    </li>
  </ol>
</template>

<script setup>
  import { useScoreStore } from "@/stores/scoreStore"
  const scoreStore = useScoreStore()
  const { getEquipesSortedByScore : get } = scoreStore
</script>
