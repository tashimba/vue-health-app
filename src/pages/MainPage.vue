<template>
  <div style="display: flex; padding: 20px" class="marginDrawer">
    <DatePicker></DatePicker>
    <DayRation v-if="daysStore.activeDay"></DayRation>
  </div>
</template>

<script setup>
import DatePicker from "../components/DatePicker.vue";
import DayRation from "../components/DayRation.vue";
import { daysStore } from "../main.js";
</script>

<style>
.marginDrawer {
  margin-left: 260px;
}
</style>
