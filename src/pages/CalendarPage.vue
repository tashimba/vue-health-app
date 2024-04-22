<template>
  <div style="display: flex" class="marginDrawer paddingContent">
    <DatePicker></DatePicker>
    <DayRation v-if="daysStore.activeDay"></DayRation>
  </div>
</template>

<script setup>
import DatePicker from "../components/DatePicker.vue";
import DayRation from "../components/DayRation.vue";
import { daysStore } from "../main.js";
</script>

<style></style>
