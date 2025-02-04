<script setup>
import images from '/public/images.json'
</script>

<template>
  <h1 class="d-inline">Galerie</h1>
  <v-btn href="/images.zip" icon="mdi-download" download class="ml-10 bg-blue mb-5"/>
  <v-img class="w-100 mx-auto my-3" v-for="image in images" :key="image.id" :src="`/images/${image.name}`" alt="Photo du tournoi de jeux vidéo"/>
</template>
