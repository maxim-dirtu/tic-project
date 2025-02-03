<template>
  <div class="flex flex-col gap-4 mt-6">
    <div class="flex flex-col">
      <h1 class="px-4 text-3xl font-semibold text-neutral-50">My Shopping Lists</h1>
      <button
        @click="openModal"
        class="border border-gray-500 bg-green-500 rounded-lg text-white w-40 h-8 mt-4 ml-4"
      >
        Create new list
      </button>
    </div>

    <!-- Modal -->
    <div v-if="isModalOpen" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div class="bg-white rounded-lg p-6 w-96">
        <h2 class="text-xl font-bold mb-4">Create New List</h2>
        <input
          v-model="newListName"
          type="text"
          placeholder="Enter list name"
          class="w-full p-2 border border-gray-300 rounded-lg mb-4"
        />
        <div class="flex justify-end gap-2">
          <button
            @click="closeModal"
            class="p-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            @click="createList"
            class="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Create
          </button>
        </div>
      </div>
    </div>

    <!-- Actual list -->
    <div class="flex flex-row gap-5 p-2">
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
const isModalOpen = ref(false); // Controls modal visibility
const newListName = ref(""); // Stores the new list name

const openModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
  newListName.value = ""; // Reset input field
};

const handleListDeleted = (listId) => {
  fetchShoppingLists(); // Fetch updated list from the server
};

const handleListCompleted = (listId) => {
  fetchShoppingLists();
};


const createList = async () => {
  if (newListName.value.trim()) {
    try {
      // Prepare the data object
       const listData = {
        name: newListName.value.trim(),
        id_user: JSON.parse(localStorage.getItem("user")).uid,
        date_created: new Date().toISOString(),
        invited_users: [],
        status: false,
      };
      console.log(listData);

      // Make the API call to create the list
      const response = await fetch("http://localhost:5000/api/lists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(listData),
      });

      if (!response.ok) {
        throw new Error("Failed to create the list");
      }

      const newList = await response.json();

      // Add the new list to the shoppingLists array
      shoppingLists.value.push(newList);

      // Close the modal
      closeModal();
    } catch (error) {
      console.error("Error creating list:", error);
      alert("Failed to create the list. Please try again.");
    }
  }
};

const fetchShoppingLists = async () => {
  try {
    const userId = JSON.parse(localStorage.getItem("user")).uid; // Current user ID
    const response = await fetch(`http://localhost:5000/api/lists/user/${userId}`, {
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