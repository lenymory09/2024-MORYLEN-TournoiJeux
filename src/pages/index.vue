<template>
  <h1>Classemement des équipes</h1>
    <v-list lines="two">
      <v-list-item
        class="mb-5"
        v-for="equipe in getEquipesSortedByScore"
        :key="equipe.id"
        :title="equipe.name + ' - ' + scoreStore.getPoints(equipe.id)"
     />
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
.element-list {
  font-size: 3rem;
}
</style>
