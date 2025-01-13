<template>
  <v-app>
    <app-header/>
    <v-main width="1000px" class="mx-auto">
      <router-view/>
    </v-main>
  </v-app>
</template>

<script setup>
import AppHeader from "@/components/AppHeader.vue"
</script>

<style lang="sass">
h1
  margin-top: 30px
  margin-bottom: 30px
  font-size: 3rem

table
  font-family: arial, sans-serif
  border-collapse: collapse
  width: 100%
  margin-bottom: 100px

td, th
  border: 1px solid #dddddd
  text-align: left
  padding: 8px
</style>

