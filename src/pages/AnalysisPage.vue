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

    <v-row>
      <v-col>
        <BarChartCcal
          v-if="dateInputs.date1 && dateInputs.date2"
          :dates="dateInputs"
        ></BarChartCcal>
      </v-col>
      <v-col>
        <BarChartPFC
          v-if="dateInputs.date1 && dateInputs.date2"
          :dates="dateInputs"
        ></BarChartPFC>
      </v-col>
    </v-row>
  </div>
</template>
<script setup>
import BarChartCcal from "../components/BarChartCcal.vue";
import BarChartPFC from "../components/BarChartPFC.vue";
import { ref, reactive } from "vue";

const dateInputs = reactive({
  date1: "",
  date2: "",
});
</script>
<style></style>
