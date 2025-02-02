<template>
  <div class="h-screen w-full p-4 ">
    <MyShoppingLists />
  </div>
  <div></div>
</template>

<script setup>
import { ref, computed } from "vue";
import MyShoppingLists from "../components/MyShoppingLists.vue";
</script>
