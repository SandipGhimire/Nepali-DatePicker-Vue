<template>
  <div>
    <h3>Nepali Date Picker</h3>
    <NepaliDatePicker
      v-model="selectedDate"
      placeholder="Select a date"
      minDate="2082-01-24"
      maxDate="2082-02-26"
    />
    <p v-if="selectedDate">Selected date: {{ selectedDate }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import NepaliDatePicker from "./NepaliDatePicker/NepaliDatePicker.vue";

const selectedDate = ref("");
</script>
