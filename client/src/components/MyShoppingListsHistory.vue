<template>
  <div class="flex flex-col gap-4 mt-6">
    <div class="flex flex-col">
      <h1 class="px-4 text-3xl font-semibold text-neutral-50">My Shopping Lists History</h1>

    </div>


    <!-- Actual list -->
    <div class="flex flex-row gap-5 p-2 flex-wrap">
      <div v-for="list in shoppingLists" :key="list.id">
        <ShoppingListCard :listItem="list" @list-deleted="handleListDeleted" @list-completed="handleListCompleted"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import ShoppingListCard from "./reusables/ShoppingListCard.vue";

const shoppingLists = ref([]);
const newListName = ref(""); // Stores the new list name



const handleListDeleted = (listId) => {
  fetchShoppingLists(); // Fetch updated list from the server
};

const handleListCompleted = (listId) => {
  fetchShoppingLists();
};



const fetchShoppingLists = async () => {
  try {
    const userId = JSON.parse(localStorage.getItem("user")).uid; // Current user ID
    const response = await fetch(`http://localhost:5000/api/lists/user/${userId}/finished`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch shopping lists");
    }

    const lists = await response.json();
    shoppingLists.value = lists; // Assign fetched data to shoppingLists ref
    console.log("Fetched shopping lists:", lists);
  } catch (error) {
    console.error("Error fetching shopping lists:", error);
    alert("Failed to load shopping lists. Please try again.");
  }
};

// Fetch shopping lists when the component is mounted
onMounted(() => {
  fetchShoppingLists();
  console.log(shoppingLists);
});
</script>

<style scoped></style>