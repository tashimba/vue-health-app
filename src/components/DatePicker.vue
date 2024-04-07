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
const date = ref(new Date());
console.log(date.value);
watch(date, (newValue) => {});
</script>

<style></style>
