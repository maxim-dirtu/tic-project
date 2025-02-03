<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div class="bg-white rounded-lg p-6 w-[300px]">
      <h2 class="text-xl font-bold mb-4">Invite User</h2>

      <!-- Email Input -->
      <div class="mb-4">
        <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
        <input type="email" id="email" v-model="email" placeholder="Enter user's email" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
      </div>

      <!-- Buttons -->
      <div class="flex justify-end gap-4">
        <button class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600" @click="$emit('close')">Cancel</button>
        <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" @click="inviteUser">Invite</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits } from "vue";
import axios from "axios";

const props = defineProps({
  listId: {
    type: String,
    required: true,
  },
});

const email = ref("");
const emit = defineEmits(["close"]);

const inviteUser = async () => {
  if (!email.value) {
    alert("Please enter an email address.");
    return;
  }

  try {
    const response = await axios.put(`http://localhost:5000/api/lists/${props.listId}/addUser`, { email: email.value });

    if (response.status === 200) {
      alert("User invited successfully!");
      emit("close");
    } else {
      throw new Error("Failed to invite user.");
    }
  } catch (error) {
    console.error("Error inviting user:", error);
    alert("Failed to invite user. Please try again.");
  }
};
</script>

<style scoped></style>
