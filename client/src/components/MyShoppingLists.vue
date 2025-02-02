<template>
  <div class="flex flex-col gap-4">
    <h1 class="px-4 text-3xl font-semibold text-neutral-50">My Shopping Lists</h1>

    <!-- actual list -->
    <div class="flex flex-row gap-5 p-2 ">
        <ShoppingListCard />
        <ShoppingListCard />
      <div v-for="list in shoppingLists" :key="list.id">
        <ShoppingListCard :list="list" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import ShoppingListCard from "./reusables/ShoppingListCard.vue";

const shoppingLists = ref([]);
</script>

<style scoped></style>
