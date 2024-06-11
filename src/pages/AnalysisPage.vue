<template>
  <div class="margin-drawer padding-content">
    <FormPersonData v-if="!personStore.isFilled"></FormPersonData>
    <div v-if="personStore.isFilled">
      <v-row justify="center" align="center">
        <v-col cols="4">
          <v-text-field
            v-for="k in 2"
            :key="k"
            type="date"
            :label="k === 1 ? 'Начало периода' : 'Конец периода'"
            v-model="dateInputs[Object.keys(dateInputs)[k - 1]]"
            :error-messages="
              dateInputsErrors[Object.keys(dateInputsErrors)[k - 1]]
            "
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
        v-if="personStore.startDate && personStore.endDate"
        elevation="2"
        style="margin-top: 20px; padding: 10px"
      >
        <v-row>
          <v-col>
            <BarChartCcal :dates="dateInputs"></BarChartCcal>
          </v-col>
          <v-col>
            <BarChartPFC :dates="dateInputs"></BarChartPFC>
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

const dateInputs = reactive({
  startDate: personStore.startDate || "",
  endDate: personStore.endDate || "",
});

const dateInputsErrors = reactive({
  startDate: "",
  endDate: "",
});

const checkInputs = () => {
  if (dateInputs.startDate < dateInputs.endDate) {
    return true;
  } else {
    dateInputsErrors.startDate = "Начало периода не может быть больше конца";
    dateInputsErrors.endDate = "Конец периода не может быть меньше начала";
  }
  return false;
};

watch(dateInputs, () => {
  dateInputsErrors.startDate = "";
  dateInputsErrors.endDate = "";
  if (dateInputs.startDate && dateInputs.endDate) {
    if (checkInputs()) {
      personStore.setDateInputs(dateInputs);
    } else {
      personStore.setDateInputs({ startDate: "", endDate: "" });
    }
  }
});
</script>
<style></style>
