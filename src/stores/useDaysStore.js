import { defineStore } from "pinia";
import { foodStore } from "../main.js";

export const useDaysStore = defineStore("days", {
  state: () => {
    return {
      days: [{}],
      activeDay: null,
    };
  },

  actions: {
    openDay(day) {
      this.activeDay = day;
    },
    addMealOnDate(mealObj) {
      if (
        this.days.find((day) => {
          if (day === mealObj.day) {
          }
        })
      ) {
        day.meals.push();
      }
      const food = foodStore.getFoodByName(mealObj.foodName);
      const dayId = Date.now();

      this.days.push({
        day: mealObj.day,
        meal: mealObj.meal,
        food: food,
        id: dayId,
      });
    },
  },
});

const days = [
  {
    day: "2022-01-01",
    meals: [
      {
        meal: "breakfast",
        food: {
          name: "Сыр Государевъ Экстра",
          calories: "328 кКал",
          proteins: "23,4 г",
          fats: "26,1 г",
          carbs: "0 г",
        },
      },
      {
        meal: "lanch",
        food: {
          name: "Сыр Государевъ Экстра",
          calories: "328 кКал",
          proteins: "23,4 г",
          fats: "26,1 г",
          carbs: "0 г",
        },
      },
      {
        meal: "dinner",
        food: {
          name: "Сыр Государевъ Экстра",
          calories: "328 кКал",
          proteins: "23,4 г",
          fats: "26,1 г",
          carbs: "0 г",
        },
      },
    ],
    id: Date.now(),
  },
];
