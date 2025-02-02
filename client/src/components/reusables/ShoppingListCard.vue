<template>
    <div class="flex flex-col gap-3 p-4 pb-2 border border-emerald-800  rounded bg-cyan-900 hover:scale-105">
        <h4 class="text-lg font-bold text-neutral-100">{{ listItem.name }}</h4>
        <p class="text-sm text-neutral-300">Created on: {{ listItem.date_created }}</p>
        <p class="text-sm text-yellow-400">{{ getShoppingListStatus(listItem.status) }}</p>
        <button class="p-2 bg-blue-500 text-white rounded w-20 self-center mt-20  mb-2 hover:bg-blue-600">View</button>
    </div>
</template>

<script setup>
import getShoppingListStatus from '../../utils/shoppingListStatus';
import { ref } from 'vue';
const listItem = ref({
    name: 'Random Shopping List',
    date_created: '2021-09-01',
    status:1,
});


</script>
<style scoped>  
</style>
