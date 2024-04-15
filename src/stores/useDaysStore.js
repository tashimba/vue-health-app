import { defineStore } from "pinia";
import { foodStore } from "../main.js";

export const useDaysStore = defineStore("days", {
  state: () => {
    return {
      days: [
        // {
        //   id: 1,
        //   day: new Date(
        //     "Tue Apr 09 2024 00:00:00 GMT+0300 (Москва, стандартное время)"
        //   ),
        //   meals: [
        //     {
        //       food: [
        //         {
        //           name: "Сыр Государевъ Экстра",
        //           calories: "328 кКал",
        //           proteins: "23,4 г",
        //           fats: "26,1 г",
        //           carbs: "0 г",
        //         },
        //         {
        //           name: "ущкере",
        //           calories: "328 кКал",
        //           proteins: "23,4 г",
        //           fats: "26,1 г",
        //           carbs: "0 г",
        //         },
        //       ],
        //     },
        //     {
        //       food: [
        //         {
        //           name: "Сыр 2",
        //           calories: "328 кКал",
        //           proteins: "23,4 г",
        //           fats: "26,1 г",
        //           carbs: "0 г",
        //         },
        //       ],
        //     },
        //   ],
        // },
      ],
      activeDay: undefined,
      // new Date(
      //   "Tue Apr 09 2024 00:00:00 GMT+0300 (Москва, стандартное время)"
      // ),
    };
  },

  actions: {
    setActiveDay(day) {
      this.activeDay = day;
    },

    openDay(day) {
      // this.days.map(el => el.day )
      this.createDay(day);
      this.activeDay = day;
    },

    createDay(day) {
      const dayObj = {
        id: Date.now(),
        day: day,
        meals: [1, 2, 3].map(() => ({ food: [] })),
      };
      this.days.push(dayObj);

      return dayObj;
    },

    addMealOnDate(mealObj) {
      let day = this.days.find(
        (d) => d.day.getTime() == this.activeDay.getTime()
      );
      if (!day) day = this.createDay(this.activeDay);

      const foodValue = foodStore.getFoodByName(mealObj.foodName);
      const foodObj = {
        id: Date.now(),
        data: foodValue,
        weight: mealObj.weight,
      };
      day.meals[mealObj.meal].food.push(foodObj);
    },

    deleteMeal(dayId, mealIter, foodId) {
      console.log(dayId, mealIter, foodId);

      const day = this.days.find((d) => d.id == dayId);
      day.meals = day.meals.filter((meal, i) => {
        if (i == mealIter) {
          meal.food = meal.food.filter((food) => food.id != foodId);
        }
        return meal;
      });
    },
  },
});
