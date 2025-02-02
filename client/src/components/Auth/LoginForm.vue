<template>
  <div class="w-fill flex flex-col justify-center items-center mt-24">
    <h2 class="m-4">Log Into Account</h2>
    <div class="flex flex-col items-center space-y-4 p-4 bg-gray-100 w-[350px] border border-gray-00 rounded">
      <form class="flex flex-col w-full space-y-4" @submit.prevent="handleLogin">
        <label class="flex flex-row justify-between items-baseline">
          <span class="text-lg">Email</span>
          <input type="email" class="p-2 border border-gray-300 rounded" v-model="email" />
        </label>
        <label class="flex flex-row justify-between items-baseline">
          <span class="text-lg">Password</span>
          <input type="password" class="p-2 border border-gray-300 rounded" v-model="password" />
        </label>
        <p v-if="errMsg" class="text-red-500">{{ errMsg }}</p>
        <button type="submit" class="p-2 bg-blue-500 text-white rounded w-40 self-center">Login</button>
      </form>
      <a class="text-blue-500" href="#" @click.prevent="$emit('switchForm', 'register')">Create account, if you don't have one</a>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "../../stores/authStore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const router = useRouter();
const errMsg = ref("");

const handleLogin = () => {
  if (password.value.length < 6) {
    alert("Password must be at least 6 characters");
    return;
  }

  const auth = getAuth();
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      const user = userCredential.user;
      const userData = {
        email: user.email,
        uid: user.uid,
      };
      const authStore = useAuthStore();
      authStore.setUser(userData); // Update the store

      console.log("User logged in successfully", userData);
      router.push("/");
    })
    .catch((error) => {
      console.error(error);
      switch (error.code) {
        case "auth/invalid-email":
          errMsg.value = "Invalid email";
          break;
        case "auth/user-not-found":
          errMsg.value = "No account with these credentials found";
          break;
        case "auth/wrong-password":
          errMsg.value = "Wrong password";
          break;
        case "auth/invalid-credential":
          errMsg.value = "Email or password is wrong";
          break;
        default:
          errMsg.value = "An error occurred";
      }
    });
};
</script>
