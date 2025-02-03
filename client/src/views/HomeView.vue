<template>
  <div class=" h-full w-full p-4 min-h-screen  bg-slate-900">
    <MyShoppingLists />
    <MySharedLists />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import MyShoppingLists from "../components/MyShoppingLists.vue";
import MySharedLists from "../components/MySharedLists.vue";
</script>

<style>
.bg-repeat {
  background-repeat: repeat;
}
</style>
