<template>
  <div style="height: 500px">
    <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
  </div>
</template>
<script setup>
import { Bar } from "vue-chartjs";
import { daysStore } from "../main";

import { defineProps } from "vue";

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

const sumOfPFCForEachDay = daysStore.sumOfPFCForEachDay(
  barProps.dates.date1,
  barProps.dates.date2
);

console.log(sumOfPFCForEachDay);

const chartData = {
  labels: sumOfPFCForEachDay.map((el) => el.day),
  datasets: [
    {
      label: "Белки",
      backgroundColor: "rgba(50, 150, 255, 0.5)",
      data: sumOfPFCForEachDay.map((el) => el.sum.proteins),
    },
    {
      label: "Жиры",
      backgroundColor: "rgba(50, 150, 255, 0.5)",
      data: sumOfPFCForEachDay.map((el) => el.sum.fats),
    },
    {
      label: "Углеводы",
      backgroundColor: "rgba(50, 150, 255, 0.5)",
      data: sumOfPFCForEachDay.map((el) => el.sum.carbs),
    },
  ],
};
const chartOptions = {
  responsive: true,
};
</script>
<style></style>
