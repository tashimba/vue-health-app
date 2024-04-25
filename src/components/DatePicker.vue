<template>
  <div class="flex-center">
    <v-date-picker
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
watch(date, (newValue) => {
  daysStore.openDay(newValue);
});
</script>

<style></style>
