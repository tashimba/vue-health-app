<template>
  <Bar 
    id="my-chart-id" 
    :options="chartOptions" 
    :data="chartData" />
</template>
<script setup>
import { Bar } from "vue-chartjs";
import { daysStore } from "../main";
import {personStore} from "../main.js";
import { computed, ref, watch } from "vue";

const barProps = defineProps({
  dates: {
    type: Object,
    required: true,
  },
});

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const sumOfPFCForEachDay = ref(daysStore.sumOfPFCForEachDay(barProps.dates.startDate, barProps.dates.endDate))

const chartData = computed(() => ({
  labels: sumOfPFCForEachDay.value.map((el) => el.day),
  datasets: [
    {
      label: "Белки",
      backgroundColor: "rgba(50, 150, 255, 0.5)",
      data: sumOfPFCForEachDay.value.map((el) => el.sum.proteins),
    },
    {
      label: "Жиры",
      backgroundColor: "rgba(50, 150, 255, 0.5)",
      data: sumOfPFCForEachDay.value.map((el) => el.sum.fats),
    },
    {
      label: "Углеводы",
      backgroundColor: "rgba(50, 150, 255, 0.5)",
      data: sumOfPFCForEachDay.value.map((el) => el.sum.carbs),
    },
  ],
}));

const chartOptions = {
  responsive: true,
};

watch(() => personStore.getDates, () => {
  sumOfPFCForEachDay.value = daysStore.sumOfPFCForEachDay(personStore.startDate, personStore.endDate);
})

</script>
<style></style>
