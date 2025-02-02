<template>
  <div class="w-fill flex flex-col justify-center items-center mt-24">
    <h2 class="m-4">Create Account</h2>
    <div class="flex flex-col items-center space-y-4 p-4 bg-gray-100 w-[400px] border border-gray-00 rounded">
      <form class="flex flex-col w-full space-y-4" @submit.prevent="handleRegister">
        <label class="flex flex-row justify-between items-baseline">
          <span class="text-lg">Email</span>
          <input type="email" class="p-2 border border-gray-300 rounded" v-model="email" />
        </label>
        <label class="flex flex-row justify-between items-baseline">
          <span class="text-lg">Password</span>
          <input type="password" class="p-2 border border-gray-300 rounded" v-model="password" />
        </label>
        <label class="flex flex-row justify-between items-baseline">
          <span class="text-lg">Confirm Password</span>
          <input type="password" class="p-2 border border-gray-300 rounded" v-model="confirmPassword" />
        </label>
        <button type="submit" class="p-2 bg-blue-500 text-white rounded w-40 self-center">Register</button>
      </form>
      <a class="text-blue-500" href="#" @click.prevent="$emit('switchForm', 'login')">Log in, if you already have an account</a>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "../../stores/authStore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const confirmPassword = ref("");

const router = useRouter();
const authStore = useAuthStore();

const handleRegister = () => {
  if (password.value.length < 6) {
    alert("Password must be at least 6 characters");
    return;
  }
  if (password.value !== confirmPassword.value) {
    alert("Passwords do not match");
    return;
  }
  const auth = getAuth();

  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      const user = userCredential.user;
      const userData = {
        email: user.email,
        uid: user.uid,
      };
      
      authStore.setUser(userData); // Update the store

      console.log("User registered successfully", userData);
      router.push("/");
    })
    .catch((error) => {
      console.error(error);
    });
};
</script>
