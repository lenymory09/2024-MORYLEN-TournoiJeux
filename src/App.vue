<template>
  <v-app>
    <app-header />
    <v-main width="1000px" class="mr-auto ml-auto">
      <router-view />
    </v-main>
  <app-footer />
  </v-app>
</template>

<script setup>
  import { onMounted } from "vue"
  import AppFooter from "@/components/AppFooter.vue"
  import AppHeader from "@/components/AppHeader.vue"
  onMounted(async () => {
  })
</script>

<style lang="sass">
h1
  margin-top: 30px
  margin-bottom: 30px
  font-size: 3rem
</style>

