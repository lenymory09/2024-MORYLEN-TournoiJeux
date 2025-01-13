<script setup>
const items = [
  { path: '/', title: 'Classement' },
  { path: '/matchs', title: 'Matchs' },
  { path: '/galerie', title: 'Galerie'}
]
</script>

<template>
  <v-app-bar app>
    <v-toolbar-title>
      <v-toolbar-items>
        <v-btn class="pt-2 pb-2" v-for="item in items" :key="item.title" :to="item.path">{{ item.title }}</v-btn>
      </v-toolbar-items>
    </v-toolbar-title>
  </v-app-bar>
</template>
