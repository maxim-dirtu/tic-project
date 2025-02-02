import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useAuthStore = defineStore("auth", () => {
  // State
  const user = ref(JSON.parse(localStorage.getItem("user")) || null);

  // Getters
  const isLoggedIn = computed(() => !!user.value);

  // Actions
  const setUser = (newUser) => {
    user.value = newUser; // Update reactive state
    if (newUser) {
      localStorage.setItem("user", JSON.stringify(newUser)); // Persist user to localStorage
    } else {
      localStorage.removeItem("user"); // Remove user from localStorage
    }
  };

  const logout = () => {
    setUser(null); // Clear the user state
    console.log(isLoggedIn.value);
  };

  return {
    user,
    isLoggedIn,
    setUser,
    logout,
  };
});
