<template>
  <div class="marginDrawer paddingContent">
    <FormPersonData v-if="!personStore.filled"></FormPersonData>
    <div v-if="personStore.filled">
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
            :key="componentKey"
            v-if="dateInputs.date1 && dateInputs.date2"
            :dates="dateInputs"
          ></BarChartCcal>
        </v-col>
        <v-col>
          <BarChartPFC
            v-if="dateInputs.date1 && dateInputs.date2"
            :dates="dateInputs"
            :key="componentKey"
          ></BarChartPFC>
        </v-col>
      </v-row>
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
  date1: "",
  date2: "",
});
watch(dateInputs, () => {
  componentKey.value++;
});
</script>
<style></style>
