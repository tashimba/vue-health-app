<template>
  <div class="marginDrawer paddingContent">
    <v-row justify="center">
      <v-col v-for="k in 2" :key="k" cols="3">
        <v-sheet class="pa-2 ma-2">
          <v-text-field
            type="date"
            :label="k == 1 ? 'Начало периода' : 'Конец периода'"
            v-model="dateInputs[`date${k}`]"
          ></v-text-field>
        </v-sheet>
      </v-col>
    </v-row>

    <BarChart
      v-if="dateInputs.date1 && dateInputs.date2"
      :dates="dateInputs"
    ></BarChart>
    <!-- <DoughnutChart></DoughnutChart> -->
  </div>
</template>
<script setup>
import BarChart from "../components/BarChart.vue";
import { ref, reactive } from "vue";
import DoughnutChart from "../components/DoughnutChart.vue";

const dateInputs = reactive({
  date1: "",
  date2: "",
});
</script>
<style></style>
