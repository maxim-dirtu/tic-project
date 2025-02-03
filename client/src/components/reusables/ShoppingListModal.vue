<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 h-auto">
    <div class="flex flex-col bg-white rounded-lg p-6 w-[400px] min-h-[500px]">
      <h2 class="text-xl font-bold mb-4">{{ listItem?.name }}</h2>

      <div>
        <!-- Invite person button -->
        <button class="flex px-1 py-1 bg-yellow-500 text-white rounded w-32 self-center mb-2 hover:bg-yellow-600 ml-auto justify-center" @click="showInviteUserModal = true">Invite Person</button>
        <!-- add item button -->
        <button class="flex px-2 py-1 bg-blue-500 text-white rounded w-32 self-center mb-4 hover:bg-blue-600 ml-auto justify-center" @click="showAddItemModal = true">Add item</button>
      </div>

      <ul>
        <li v-for="item in listItem?.items" :key="item?.id" class="mt-2">
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input type="checkbox" :id="`checkbox-${item.id}`" v-model="item.status" @change="updateItemStatus(item)" class="w-4 h-4 text-blue-600 rounded-lg focus:ring-blue-600 ring-offset-gray-700 focus:ring-offset-gray-700 bg-gray-600 border-gray-500" />
              <label :for="`checkbox-${item.id}`" class="ms-2">
                <p>{{ item.name }}</p>
              </label>
            </div>
            <button @click="deleteItem(item.id)" class="p-[6px] bg-red-500 text-white rounded hover:bg-red-600">
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="15" height="15" viewBox="0 0 50 50">
                <path
                  fill="white"
                  d="M 42 5 L 32 5 L 32 3 C 32 1.347656 30.652344 0 29 0 L 21 0 C 19.347656 0 18 1.347656 18 3 L 18 5 L 8 5 C 7.449219 5 7 5.449219 7 6 C 7 6.550781 7.449219 7 8 7 L 9.085938 7 L 12.695313 47.515625 C 12.820313 48.90625 14.003906 50 15.390625 50 L 34.605469 50 C 35.992188 50 37.175781 48.90625 37.300781 47.515625 L 40.914063 7 L 42 7 C 42.554688 7 43 6.550781 43 6 C 43 5.449219 42.554688 5 42 5 Z M 20 44 C 20 44.554688 19.550781 45 19 45 C 18.449219 45 18 44.554688 18 44 L 18 11 C 18 10.449219 18.449219 10 19 10 C 19.550781 10 20 10.449219 20 11 Z M 20 3 C 20 2.449219 20.449219 2 21 2 L 29 2 C 29.550781 2 30 2.449219 30 3 L 30 5 L 20 5 Z M 26 44 C 26 44.554688 25.550781 45 25 45 C 24.449219 45 24 44.554688 24 44 L 24 11 C 24 10.449219 24.449219 10 25 10 C 25.550781 10 26 10.449219 26 11 Z M 32 44 C 32 44.554688 31.554688 45 31 45 C 30.445313 45 30 44.554688 30 44 L 30 11 C 30 10.449219 30.445313 10 31 10 C 31.554688 10 32 10.449219 32 11 Z"
                ></path>
              </svg>
            </button>
          </div>
          <span class="ml-2" v-if="item.description">
            <small>{{ item.description }}</small>
          </span>
        </li>
      </ul>
      <div class="flex flex-row justify-center gap-6 mt-auto">
        <!-- button delete -->
        <button class="p-2 bg-red-500 text-white rounded w-20 mt-6 hover:bg-red-600 flex self-center justify-center" @click="deleteList">Delete</button>
        <!-- button close -->
        <button class="p-2 bg-gray-500 text-white rounded w-20 mt-6 hover:bg-gray-600 flex self-center justify-center" @click="$emit('close')">Close</button>
        <!-- button complete -->
        <button v-if="listItem?.status != true" class="p-2 bg-green-500 text-white rounded w-20 mt-6 hover:bg-green-600 flex self-center justify-center" @click="completeList">Complete</button>
      </div>
    </div>
    <AddItemModal v-if="showAddItemModal" :listId="props.listId" @close="showAddItemModal = false" @item-added="fetchItems" />
    <!-- Invite User Modal -->
    <InviteUserModal v-if="showInviteUserModal" :listId="props.listId" @close="showInviteUserModal = false" />
  </div>
</template>

<script setup>
import { ref, onMounted, watch, defineEmits } from "vue";
import axios from "axios";
import AddItemModal from "./AddItemModal.vue";
import InviteUserModal from "./InviteUserModal.vue";

const props = defineProps({
  listItem: {
    type: Object,
    required: true,
  },
  listId: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["list-deleted", "list-completed"]);

const listItem = ref(null);
const showAddItemModal = ref(false);
const showInviteUserModal = ref(false);

// Fetch the list data when the modal is opened
const fetchList = async () => {
  try {
    const response = await fetch(`http://localhost:5000/api/lists/${props.listId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch the list");
    }

    const data = await response.json();
    console.log(data);
    listItem.value = data; // Assign fetched data to listItem
  } catch (error) {
    console.error("Error fetching list:", error);
    alert("Failed to load the list. Please try again.");
  }
};
//Fetch the items list for the list using list_id
// route is http://localhost:5000/api/list/:listId/items
const fetchItems = async () => {
  try {
    const response = await fetch(`http://localhost:5000/api/list/${props.listId}/items`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch the list items");
    }

    const data = await response.json();
    console.log(data);
    listItem.value.items = data; // Assign fetched data to listItem
  } catch (error) {
    console.error("Error fetching list items:", error);
  }
};

// Fetch the list when the component is mounted or when listId changes
onMounted(() => {
  if (props.listId) {
    fetchList();
    fetchItems();
  }
});

watch(
  () => props.listId,
  (newId) => {
    if (newId) {
      fetchList();
      fetchItems();
    }
  }
);

const updateItemStatus = async (item) => {
  try {
    console.log(`Updating status for item: ${item.id}`);

    // Make the API call to update the item's status
    const response = await axios.put(`http://localhost:5000/api/items/${item.id}`, {
      status: item.status, // Send the updated status
    });

    if (response.status === 200) {
      console.log("Item status updated successfully");
    } else {
      throw new Error("Failed to update item status");
    }
  } catch (error) {
    console.error("Error updating item status:", error);
    alert("Failed to update item status. Please try again.");
  }
};

const deleteItem = async (itemId) => {
  try {
    console.log("Deleting item with ID:", itemId);
    const response = await axios.delete(`http://localhost:5000/api/items/${itemId}`);
    if (response.status === 200) {
    } else {
      throw new Error("Failed to delete the item");
    }
  } catch (error) {
    console.error("Error deleting item:", error);
    alert("Failed to delete the item. Please try again.");
  }

  fetchItems();
};

const deleteList = async () => {
  try {
    console.log("Deleting list with ID:", props.listId);
    const response = await axios.delete(`http://localhost:5000/api/lists/${props.listId}`);
    if (response.status === 200) {
      alert("List deleted successfully");
      // Emit an event to notify parent component to close the modal and refresh the list
      emit("list-deleted", props.listId); // Emit event with list ID
    } else {
      throw new Error("Failed to delete the list");
    }
  } catch (error) {
    console.error("Error deleting list:", error);
    alert("Failed to delete the list. Please try again.");
  }
};

const completeList = async () => {
  try {
    // Change the status of the list to true
    const updatedList = {
      ...listItem.value,
      status: true,
    };

    // Send the updated list with a PUT request
    const response = await axios.put(`http://localhost:5000/api/lists/${props.listId}`, updatedList);

    if (response.status === 200) {
      // Update the local listItem with the updated status
      listItem.value.status = true;

      emit("list-completed", props.listId); // Emit event with list ID
    } else {
      throw new Error("Failed to complete the list");
    }
  } catch (error) {
    console.error("Error completing list:", error);
    alert("Failed to complete the list. Please try again.");
  }
};
</script>

<style scoped></style>
