<template>
  <div style="height: 500px">
    <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
  </div>
</template>
<script setup>
import { Bar } from "vue-chartjs";
import { daysStore } from "../main";
import { personStore } from "../main";

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
  Filler,
  PointElement,
  LineElement,
  LineController,
} from "chart.js";

import annotationPlugin from "chartjs-plugin-annotation";
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  Filler,
  PointElement,
  LineElement,
  LineController
);

ChartJS.register(annotationPlugin);

const caloriesLineValue = personStore.getNeededCalories();

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
  plugins: {
    autocolors: false,
    annotation: {
      annotations: {
        line1: {
          type: "line",
          yMin: caloriesLineValue,
          yMax: caloriesLineValue,
          borderColor: "rgb(255, 99, 132)",
          borderWidth: 2,
          label: {
            display: true,
            content: "Рекоменуемый уровень",
            position: "end",
          },
        },
      },
    },
  },
};
</script>
<style></style>
