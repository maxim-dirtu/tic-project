<template>
  <Navbar />
  <div class="bg-slate-900 ">
  <RouterView />
  </div>
</template>

<script setup>
import Navbar from "./components/layout/NavBar.vue";
</script>

<style scoped></style>
