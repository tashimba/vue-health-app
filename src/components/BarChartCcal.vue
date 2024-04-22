<template>
  <div style="height: 500px">
    <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
  </div>
</template>
<script setup>
import { Bar } from "vue-chartjs";
import { daysStore } from "../main";

// import { defineProps } from "vue";

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

const sumOfCaloriesForEachDay = daysStore.sumOfCaloriesForEachDay(
  barProps.dates.date1,
  barProps.dates.date2
);

const chartData = {
  labels: sumOfCaloriesForEachDay.map((el) => el.day),
  datasets: [
    {
      label: "кКалории",
      backgroundColor: "rgba(50, 150, 255, 0.5)",
      data: sumOfCaloriesForEachDay.map((el) => el.calories),
    },
  ],
};
const chartOptions = {
  responsive: true,
};
</script>
<style></style>
