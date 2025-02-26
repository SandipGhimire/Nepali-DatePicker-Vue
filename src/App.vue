<template>
  <div>
    <h3>Nepali Date Picker</h3>
    <NepaliDatePicker v-model="selectedDate" placeholder="Select a date" />
    <p v-if="selectedDate">Selected date: {{ selectedDate }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import NepaliDatePicker from './NepaliDatePicker/NepaliDatePicker.vue';

const selectedDate = ref('');
</script>