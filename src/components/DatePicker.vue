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
  const parseDay =
    newValue.getDate() <= 9 ? "0" + newValue.getDate() : newValue.getDate();
  const month = newValue.getMonth() + 1;
  const parseMonth = month < 9 ? "0" + month : month;

  const parseDate = parseDay + "." + parseMonth + "." + newValue.getFullYear();
  daysStore.openDay(parseDate);
});
</script>

<style></style>
