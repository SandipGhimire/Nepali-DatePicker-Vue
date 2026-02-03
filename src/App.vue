<style>
.custom-datepicker {
  border: 2px solid #1284e7 !important;
  border-radius: 6px !important;
  padding: 2px !important;
}
</style>

<template>
  <div style="padding: 24px; max-width: 400px;">
    <h2>Default Nepali Date Picker</h2>
    <NepaliDatePicker v-model="date1" @onSelect="console.log($event)" :updateOnInputChange="true" :miniEnglishDate="true" :autoFormat="true"/>

    <h2>With minDate</h2>
    <NepaliDatePicker v-model="date2" :minDate="minDate" />

    <h2>With maxDate</h2>
    <NepaliDatePicker v-model="date3" :maxDate="maxDate" />

    <h2>With minDate and maxDate</h2>
    <NepaliDatePicker v-model="date4" :minDate="minDate" :maxDate="maxDate" />

    <h2>Without Year Select</h2>
    <NepaliDatePicker v-model="date5" :yearSelect="false" />

    <h2>Without Month Select</h2>
    <NepaliDatePicker v-model="date6" :monthSelect="false" />

    <h2>Without Year and Month Select</h2>
    <NepaliDatePicker v-model="date7" :yearSelect="false" :monthSelect="false" />

    <h2>Custom Placeholder</h2>
    <NepaliDatePicker v-model="date8" placeholder="Select Nepali Date..." />

    <h2>Custom Class</h2>
    <NepaliDatePicker v-model="date9" inputClass="custom-datepicker" />

    <h2>Listen to onSelect</h2>
    <NepaliDatePicker v-model="date10" @onSelect="onSelect" />

    <div style="margin-top: 24px;">
      <h3>Selected Values:</h3>
      <ul>
        <li>Default: {{ date1 }}</li>
        <li>minDate: {{ date2 }}</li>
        <li>maxDate: {{ date3 }}</li>
        <li>minDate &amp; maxDate: {{ date4 }}</li>
        <li>No Year Select: {{ date5 }}</li>
        <li>No Month Select: {{ date6 }}</li>
        <li>No Year &amp; Month Select: {{ date7 }}</li>
        <li>Custom Placeholder: {{ date8 }}</li>
        <li>Custom Class: {{ date9 }}</li>
        <li>onSelect: {{ date10 }}</li>
        <li>Last onSelect event: {{ lastOnSelect }}</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import NepaliDatePicker from "./NepaliDatePicker/NepaliDatePicker.vue";
import { NepaliDate } from "nepali-date-library";

const date1 = ref("");
const date2 = ref("");
const date3 = ref("");
const date4 = ref("");
const date5 = ref("");
const date6 = ref("");
const date7 = ref("");
const date8 = ref("");
const date9 = ref("");
const date10 = ref("");
const lastOnSelect = ref("");

const minDate = new NepaliDate().addDays(-3).format("YYYY-MM-DD");
const maxDate = new NepaliDate().addDays(3).format("YYYY-MM-DD");

function onSelect(val: string) {
  lastOnSelect.value = val;
}
</script>