<template>
  <div class="flex flex-col gap-3 p-4 pb-2 border border-emerald-800 rounded bg-cyan-900 hover-effect">
    <h4 class="text-lg font-bold text-neutral-100">{{ listItem?.name }}</h4>
    <p class="text-sm text-neutral-300">Created on: {{ formatDate(listItem?.date_created) }}</p>
    <p class="text-sm text-yellow-400">{{ getShoppingListStatus(listItem?.status) }}</p>
    <button class="p-2 bg-blue-500 text-white rounded w-20 self-center mt-20 mb-2 hover:bg-blue-600" @click="openModal">View</button>
    <ShoppingListModal v-if="showModal" :listItem="listItem" @close="closeModal" :listId="listItem.id" @list-deleted="handleListDeleted" @list-completed="handleListCompleted" />
  </div>
</template>

<script setup>
import getShoppingListStatus from "../../utils/shoppingListStatus";
import ShoppingListModal from "./ShoppingListModal.vue";
import { ref, defineEmits } from "vue";

// Reactive state for the modal
const showModal = ref(false);
const emit = defineEmits(["list-deleted", "list-completed"]);

defineProps({
  listItem: {
    type: Object,
    required: true,
  },
});

// Functions to handle modal state
const openModal = () => {
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

// Helper function to format Firestore Timestamps
const formatDate = (timestamp) => {
  if (!timestamp) return "Unknown Date";
  if (timestamp._seconds) {
    return new Date(timestamp._seconds * 1000).toLocaleDateString("ro-RO") + ", " + new Date(timestamp._seconds * 1000).toLocaleTimeString("ro-RO", { hour: "2-digit", minute: "2-digit" });
  }
  return new Date(timestamp).toLocaleDateString();
};

// Forward event to MyShoppingLists.vue
const handleListDeleted = (listId) => {
  emit("list-deleted", listId);
};

const handleListCompleted = (listId) => {
  emit("list-completed", listId);
};

</script>

<style scoped>
.hover-effect {
  transition: box-shadow 0.3s ease-in-out;
}

.hover-effect:hover {
  box-shadow: 0 4px 20px rgba(255, 255, 255, 0.4), /* Add white glow */ 0 4px 20px rgba(255, 0, 0, 0.3), /* Red glow */ 0 4px 20px rgba(0, 255, 0, 0.3), /* Green glow */ 0 4px 20px rgba(0, 0, 255, 0.3); /* Blue glow */
}
</style>
