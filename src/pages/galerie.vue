<script setup>
  const images = [
    { id: 1, name: "", title: "" },
  ]
</script>

<template>
  <h1>Galerie</h1>
  <v-img class="w-75 mx-auto" v-for="image in images" :key="image.id" :src="`/${image.name}`" :alt="image.title" />
</template>
