<template>
  <div class="marginDrawer paddingContent">
    <FormPersonData v-if="!personStore.filled"></FormPersonData>
    <div v-if="personStore.filled">
      <v-row justify="center" align="center">
        <v-col cols="4">
          <v-text-field
            v-for="k in 2"
            :key="k"
            type="date"
            :label="k == 1 ? 'Начало периода' : 'Конец периода'"
            v-model="dateInputs[`date${k}`]"
            :error-messages="dateInputsErrors[`date${k}`]"
          ></v-text-field>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="6">
          <v-card elevation="4">
            <v-card-title>Ваши данные</v-card-title>
            <v-card-text style="white-space: pre"
              >{{
                personStore.getPersonData +
                `\n` +
                `Рекомендованный дневной уровень:` +
                personStore.getNeededCalories()
              }}
              ккал</v-card-text
            >
          </v-card>
        </v-col>
      </v-row>

      <v-card
        v-if="personStore.date1 && personStore.date2"
        elevation="2"
        style="margin-top: 20px; padding: 10px"
      >
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
      </v-card>
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

const dateInputsErrors = reactive({
  date1: "",
  date2: "",
});

const checkInputs = () => {
  if (dateInputs.date1 < dateInputs.date2) {
    return true;
  } else {
    dateInputsErrors.date1 = "Начало периода не может быть больше конца";
    dateInputsErrors.date2 = "Конец периода не может быть меньше начала";
  }
  return false;
};

watch(dateInputs, () => {
  if (dateInputs.date1 && dateInputs.date2) {
    if (checkInputs()) {
      personStore.setDateInputs(dateInputs);
      componentKey.value++;
    } else {
      personStore.setDateInputs({ date1: "", date2: "" });
    }
  }
});
</script>
<style></style>
