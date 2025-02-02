<template>
  <div>
    <p>Count: {{ count }}</p>
    <p>Double Count: {{ doubleCount }}</p>
    <button @click="increment">Increment</button>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useCounterStore } from '../stores/counter';

const counterStore = useCounterStore();

const count = computed(() => counterStore.count);
const doubleCount = computed(() => counterStore.doubleCount);

function increment() {
  counterStore.increment();
}
</script>
