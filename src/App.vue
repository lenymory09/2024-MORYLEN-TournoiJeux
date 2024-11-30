<template>
  <v-app>
    <app-header />
    <v-main class="mr-auto ml-auto">
      <router-view />
    </v-main>
  <app-footer />
  </v-app>
</template>

<script setup>
  import AppFooter from "@/components/AppFooter.vue"
  import AppHeader from "@/components/AppHeader.vue"

</script>

<style>

</style>
