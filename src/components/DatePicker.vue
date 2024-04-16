<template>
  <div style="width: 50%">
    <v-date-picker
      v-model="date"
      style="border: 1px solid rgba(0, 0, 0, 0.012)"
    ></v-date-picker>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { daysStore } from "../main.js";

const date = ref(daysStore.activeDay || new Date());
date.value.setHours(0, 0, 0, 0);
watch(date, (newValue) => {
  daysStore.openDay(newValue);
});

daysStore.openDay(date.value);
</script>

<style></style>
