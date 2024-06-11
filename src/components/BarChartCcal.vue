<template>
  <Bar 
    id="my-chart-id" 
    :options="chartOptions" 
    :data="chartData" />
</template>
<script setup>
import { Bar } from "vue-chartjs";
import { daysStore } from "../main";
import { personStore } from "../main";
import { computed } from "vue";

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

const sumOfCaloriesForEachDay = computed(() =>
  daysStore.sumOfCaloriesForEachDay(personStore.startDate, personStore.endDate)
);

const chartData = computed(() => ({
  labels: sumOfCaloriesForEachDay.value.map((el) => el.day),
  datasets: [
    {
      label: "кКалории",
      backgroundColor: "rgba(50, 150, 255, 0.5)",
      data: sumOfCaloriesForEachDay.value.map((el) => el.calories),
    },
  ],
}));

const chartOptions = {
  responsive: true,
  plugins: {
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
            position: "start",
            font: {
              size: 10,
            },
          },
        },
      },
    },
  },
};
</script>
<style></style>
