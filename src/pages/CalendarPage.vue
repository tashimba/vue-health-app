<template>
  <div class="margin-drawer padding-content">
    <v-container>
      <v-row>
        <v-col>
          <DatePicker></DatePicker>
        </v-col>
        <v-col v-if="daysStore.activeDay">
          <DayRation></DayRation>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import DatePicker from "../components/DatePicker.vue";
import DayRation from "../components/DayRation.vue";
import { daysStore } from "../main.js";
</script>

<style></style>
