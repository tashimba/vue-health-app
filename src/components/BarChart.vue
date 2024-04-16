<template>
  <div style="height: 500px">
    <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
  </div>
</template>
<script setup>
import { Bar } from "vue-chartjs";
import { daysStore } from "../main";

import { defineProps, computed } from "vue";
import { storeToRefs } from "pinia";

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

function getDateString(date) {
  const day = date.getDate();
  const month = date.toLocaleString("ru-RU", { month: "long" });
  return `${day} ${month}`;
}

// const days = daysStore.getSortDays.map((el) => getDateString(el.day));

// const { getSortDaysBetweenDates } = storeToRefs(daysStore);

const daysBetweenDates = daysStore.getSortDaysBetweenDates(
  barProps.dates.date1,
  barProps.dates.date2
);

const sumOfCaloriesForEachDay = daysBetweenDates.map((day) => {
  const sumForDay = day.meals.reduce(
    (accCalories, accProteins, accCarbs, accFats, meal) => {
      const sumForMeal = meal.food.reduce(
        (accCaloriesMeal, accProteinsMeal, accCarbsMeal, accFatsMeal, food) => {
          return {
            accCaloriesMeal: accCaloriesMeal + parseInt(food.data.calories),
            accProteinsMeal: accProteinsMeal + parseInt(food.data.proteins),
            accCarbsMeal: accCarbsMeal + parseInt(food.data.carbs),
            accFatsMeal: accFatsMeal + parseInt(food.data.fats),
          };
        },
        0
      );
      return {
        accCalories: accCalories + sumForMeal.accCaloriesMeal,
        accProteins: accProteins + sumForMeal.accProteinsMeal,
        accCarbs: accCarbs + sumForMeal.accCarbsMeal,
        accFats: accFats + sumForMeal.accFatsMeal,
      };
    },
    0
  );
  return {
    day: getDateString(day.day),
    sum: {
      calories: sumForDay.accCalories,
      proteins: sumForDay.accProteins,
      carbs: sumForDay.accCarbs,
      fats: sumForDay.accFats,
    },
  };
});
console.log(sumOfCaloriesForEachDay);
// console.log(mealsOfFoodBetweenDates);
// el.meals.map((meal) => meal.food.map((foodEl) => foodEl.data.calories)))

const chartData = {
  labels: sumOfCaloriesForEachDay.map((el) => el.day),
  datasets: [
    {
      label: "кКалории",
      backgroundColor: "rgba(50, 150, 255, 0.5)",
      data: sumOfCaloriesForEachDay.map((el) => el.sum.calories),
    },
    {
      label: "кКалории",
      backgroundColor: "rgba(50, 150, 255, 0.5)",
      data: sumOfCaloriesForEachDay.map((el) => el.sum.proteins),
    },
  ],
};
const chartOptions = {
  responsive: true,
};
</script>
<style></style>
