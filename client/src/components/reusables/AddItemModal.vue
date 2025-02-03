<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-60 h-auto">
    <div class="flex flex-col bg-white rounded-lg p-6 w-[300px] min-h-[300px]">
      <h2 class="text-xl font-bold mb-4">Add New Item</h2>
      <form @submit.prevent="handleAddItem" class="flex flex-col space-y-4">
        <label class="flex flex-col">
          <span class="text-lg">Item Name</span>
          <input type="text" v-model="itemName" class="p-2 border border-gray-300 rounded" required />
        </label>
        <label class="flex flex-col">
          <span class="text-lg">Description</span>
          <textarea v-model="itemDescription" class="p-2 border border-gray-300 rounded"></textarea>
        </label>
        <div class="flex justify-end space-x-4">
          <button type="button" @click="$emit('close')" class="p-2 bg-gray-500 text-white rounded hover:bg-gray-600">Cancel</button>
          <button type="submit" class="p-2 bg-blue-500 text-white rounded hover:bg-blue-600">Add Item</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const props = defineProps({
  listId: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['item-added', 'close']);

const itemName = ref('');
const itemDescription = ref('');

const handleAddItem = async () => {
  try {
    const response = await axios.post(`http://localhost:5000/api/list/${props.listId}/items`, {
      name: itemName.value,
      description: itemDescription.value,
    });

    if (response.status === 201) {
      emit('item-added', response.data);
      emit('close');
    } else {
      throw new Error('Failed to add item');
    }
  } catch (error) {
    console.error('Error adding item:', error);
    alert('Failed to add item. Please try again.');
  }
};
</script>

<style scoped></style>