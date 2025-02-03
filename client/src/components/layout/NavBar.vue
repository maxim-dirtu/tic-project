<template>
  <nav class="flex justify-between items-center p-4 bg-slate-700 text-white">
    <div class="flex items-center space-x-2">
      <router-link to="/" class="text-xl">
        <i class="fas fa-home"></i>
      </router-link>
      <span class="text-lg font-semibold">Grocery List Manager</span>
    </div>
    <div class="flex space-x-8">
      <template v-if="isLoggedIn">
        <router-link to="/listHistory" class="hover:text-gray-400">List History</router-link>
        <button @click="handleLogout" class="hover:text-gray-400">Log out</button>
      </template>
      <template v-else>
        <router-link to="/authentification" class="hover:text-gray-400">Authenticate</router-link>
      </template>
    </div>
  </nav>
</template>
<script setup>
import { useAuthStore } from '../../stores/authStore';
import {computed} from 'vue';

const authStore = useAuthStore();

// Reactive values from the store
const { logout } = authStore;

const isLoggedIn = computed(() => authStore.isLoggedIn);


const handleLogout = () => {
  logout();
};

</script>


<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css');




</style>
