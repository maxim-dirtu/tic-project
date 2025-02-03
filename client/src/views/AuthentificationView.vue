<template>
    <div class="h-screen w-full p-4 ">
          <div v-if="currentForm === 'login'">
            <LoginForm @switchForm="switchForm" />
        </div>
        <div v-else>
            <RegisterForm @switchForm="switchForm" />
        </div>
    </div>


</template>

<script setup>
import { ref } from 'vue';
import LoginForm from '../components/auth/LoginForm.vue';
import RegisterForm from '../components/auth/RegisterForm.vue';

const currentForm = ref('login');

const switchForm = (form) => {
    currentForm.value = form;
};
</script>