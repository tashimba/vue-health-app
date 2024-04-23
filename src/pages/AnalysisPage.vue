<template>
  <div class="marginDrawer paddingContent">
    <FormPersonData v-if="!personStore.filled"></FormPersonData>
    <div v-if="personStore.filled">
      <v-row justify="center" align="center">
        <v-col v-for="k in 2" :key="k" cols="3">
          <!-- <v-sheet class="pa-2 ma-2"> -->
          <v-text-field
            type="date"
            :label="k == 1 ? 'Начало периода' : 'Конец периода'"
            v-model="dateInputs[`date${k}`]"
          ></v-text-field>
          <!-- </v-sheet> -->
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="4">
          <v-card elevation="4">
            <v-card-title>Ваши данные</v-card-title>
            <v-card-text style="white-space: pre">{{
              personStore.getPersonData
            }}</v-card-text>
            <div></div>
          </v-card>
        </v-col>
      </v-row>

      <div v-if="dateInputs.date1 && dateInputs.date2" style="margin-top: 20px">
        <v-row>
          <v-col>
            <BarChartCcal
              :key="componentKey"
              :dates="dateInputs"
            ></BarChartCcal>
          </v-col>
          <v-col>
            <BarChartPFC :dates="dateInputs" :key="componentKey"></BarChartPFC>
          </v-col>
        </v-row>
        <v-card elevation="4">
          <v-card-title
            >Рекомендованный дневной уровень:
            {{ personStore.getNeededCalories() }} ккал</v-card-title
          >
        </v-card>
      </div>
    </div>
  </div>
</template>
<script setup>
import BarChartCcal from "../components/BarChartCcal.vue";
import BarChartPFC from "../components/BarChartPFC.vue";
import FormPersonData from "../components/FormPersonData.vue";
import { ref, reactive, watch } from "vue";
import { personStore } from "../main.js";

const componentKey = ref(0);

const dateInputs = reactive({
  date1: personStore.date1 || "",
  date2: personStore.date2 || "",
});
watch(dateInputs, () => {
  personStore.setDateInputs(dateInputs);
  componentKey.value++;
});
</script>
<style></style>
