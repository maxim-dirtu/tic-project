<template>
  <div class="flex flex-col gap-4 mt-6">
    <div class="flex flex-col">
      <h1 class="px-4 text-3xl font-semibold text-neutral-50">Shared Shopping Lists</h1>
    </div>

    <!-- Shared lists -->
    <div class="flex flex-row flex-wrap gap-5 p-2">
      <div v-for="list in sharedLists" :key="list.id">
        <ShoppingListCard :listItem="list" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import ShoppingListCard from "./reusables/ShoppingListCard.vue";

const sharedLists = ref([]); // To store the shared shopping lists

// Function to fetch shared lists for the current user
const fetchSharedLists = async () => {
  try {
    const userEmail = JSON.parse(localStorage.getItem("user")).email; // Get the current user's email
    const response = await fetch(`http://localhost:5000/api/lists/user/${userEmail}/shared`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch shared shopping lists");
    }

    const lists = await response.json();
    sharedLists.value = lists; // Assign fetched data to sharedLists ref
    console.log("Fetched shared shopping lists:", lists);
  } catch (error) {
    console.error("Error fetching shared shopping lists:", error);
    alert("Failed to load shared shopping lists. Please try again.");
  }
};

// Fetch shared lists when the component is mounted
onMounted(() => {
  fetchSharedLists();
});
</script>

<style scoped></style>
 