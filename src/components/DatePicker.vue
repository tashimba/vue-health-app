<template>
  <div style="width: 50%">
    <v-date-picker
      v-model="date"
      style="border: 1px solid rgba(0, 0, 0, 0.12)"
    ></v-date-picker>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { daysStore } from "../main.js";

const date = ref(new Date());

watch(date, (newValue) => {
  daysStore.openDay(newValue);
});
</script>

<style></style>
