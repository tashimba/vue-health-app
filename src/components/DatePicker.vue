<template>
  <div class="flex-center">
    <v-date-picker
      style="padding: 20px"
      width="400px"
      header="Планируемый день"
      v-model="date"
      elevation="12"
    ></v-date-picker>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { daysStore } from "../main.js";

const date = ref(daysStore.activeDay || null);
// date.value.setHours(0, 0, 0, 0);
watch(date, (newValue) => {
  daysStore.openDay(newValue);
});

// daysStore.openDay(date.value);
</script>

<style></style>
