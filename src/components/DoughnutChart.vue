<template>
  <div style="height: 500px">
    <Doughnut :data="chartData" :options="chartOptions" />
  </div>
</template>
<script setup>
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "vue-chartjs";

ChartJS.register(ArcElement, Tooltip, Legend);

const chartData = {
  labels: ["Белки", "Жиры", "Углеводы"],
  datasets: [
    {
      label: "кКалории",
      backgroundColor: ["#41B883", "#E46651", "#00D8FF"],
      data: [10, 10, 10],
    },
  ],
};
const chartOptions = {
  responsive: true,
};
</script>
<style></style>
