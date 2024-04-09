import { defineStore } from "pinia";
import { foodStore } from "../main.js";

export const useDaysStore = defineStore("days", {
  state: () => {
    return {
      days: [
        {
          id: 1,
          day: new Date(
            "Tue Apr 09 2024 00:00:00 GMT+0300 (Москва, стандартное время)"
          ),
          meals: [
            {
              food: [
                {
                  name: "Сыр Государевъ Экстра",
                  calories: "328 кКал",
                  proteins: "23,4 г",
                  fats: "26,1 г",
                  carbs: "0 г",
                },
                {
                  name: "ущкере",
                  calories: "328 кКал",
                  proteins: "23,4 г",
                  fats: "26,1 г",
                  carbs: "0 г",
                },
              ],
            },
            {
              food: [
                {
                  name: "Сыр 2",
                  calories: "328 кКал",
                  proteins: "23,4 г",
                  fats: "26,1 г",
                  carbs: "0 г",
                },
              ],
            },
            // {
            //   food: [
            //     {
            //       name: "Сыр 3",
            //       calories: "328 кКал",
            //       proteins: "23,4 г",
            //       fats: "26,1 г",
            //       carbs: "0 г",
            //     },
            //   ],
            // },
          ],
        },
      ],
      activeDay: new Date(
        "Tue Apr 09 2024 00:00:00 GMT+0300 (Москва, стандартное время)"
      ),
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
            day.meals.push();
          }
        })
      ) {
        return;
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
