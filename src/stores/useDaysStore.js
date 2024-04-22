import { defineStore } from "pinia";
// import { foodStore } from "../main.js";
import getDateString from "../functions/getDateString.js";
import { getFoodByName } from "../functions/FoodListFunctions.js";

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
      if (this.days.find((d) => d.day.getTime() == day.getTime())) {
        this.activeDay = day;
      } else this.activeDay = this.createDay(day).day;
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

      const foodValue = getFoodByName(mealObj.foodName);
      const foodObj = {
        id: Date.now(),
        data: foodValue,
        weight: mealObj.weight,
      };
      day.meals[mealObj.meal].food.push(foodObj);
    },

    editMeal(dayId, mealObj, EditingFoodId) {
      const day = this.days.find((d) => d.id == dayId);
      const foodValue = getFoodByName(mealObj.foodName);
      const foodObj = {
        id: EditingFoodId,
        data: foodValue,
        weight: mealObj.weight,
      };
      day.meals[mealObj.meal].food = day.meals[mealObj.meal].food.map((el) => {
        if (el.id === EditingFoodId) {
          return { ...foodObj };
        }
        return el;
      });
    },

    deleteMeal(dayId, mealIter, foodId) {
      const day = this.days.find((d) => d.id == dayId);
      day.meals = day.meals.map((meal, i) => {
        if (i == mealIter) {
          meal.food = meal.food.filter((food) => food.id != foodId);
        }
        return meal;
      });
    },

    sumOfPFCForEachDay(date1, date2) {
      const daysBetweenDates = this.getSortDaysBetweenDates(date1, date2);

      const sumOfPFCForEachDay = daysBetweenDates.map((day) => {
        const sumForDay = day.meals.reduce(
          (acc, meal) => {
            const sumForMeal = meal.food.reduce(
              (accMeal, food) => {
                const { proteins, carbs, fats } = food.data;
                return {
                  accProteins:
                    accMeal.accProteins +
                    (parseInt(proteins) * food.weight) / 100,
                  accCarbs:
                    accMeal.accCarbs + (parseInt(carbs) * food.weight) / 100,
                  accFats:
                    accMeal.accFats + (parseInt(fats) * food.weight) / 100,
                };
              },
              {
                accProteins: 0,
                accCarbs: 0,
                accFats: 0,
              }
            );
            return {
              accProteins: acc.accProteins + sumForMeal.accProteins,
              accCarbs: acc.accCarbs + sumForMeal.accCarbs,
              accFats: acc.accFats + sumForMeal.accFats,
            };
          },
          {
            accProteins: 0,
            accCarbs: 0,
            accFats: 0,
          }
        );
        return {
          day: getDateString(day.day),
          sum: {
            proteins: sumForDay.accProteins,
            carbs: sumForDay.accCarbs,
            fats: sumForDay.accFats,
          },
        };
      });
      return sumOfPFCForEachDay;
    },

    sumOfCaloriesForEachDay(date1, date2) {
      const daysBetweenDates = this.getSortDaysBetweenDates(date1, date2);
      const sumOfCaloriesForEachDay = daysBetweenDates.map((day) => {
        const sumForDay = day.meals.reduce((acc, meal) => {
          const sumForMeal = meal.food.reduce((accMeal, food) => {
            const { calories } = food.data;
            return accMeal + (parseInt(calories) * food.weight) / 100;
          }, 0);
          return acc + sumForMeal;
        }, 0);
        return {
          day: getDateString(day.day),
          calories: sumForDay,
        };
      });
      return {
        sumOfCaloriesForEachDay,
        sumOfCalories: sumOfCaloriesForEachDay.reduce(
          (a, el) => a + el.calories,
          0
        ),
      };
    },
  },
  getters: {
    getCurrentDay() {
      return this.days.find(
        (day) => day.day.getTime() === this.activeDay.getTime()
      );
    },
    getSortDays() {
      return this.days.sort((a, b) => a.day - b.day);
    },
    getSortDaysBetweenDates: (state) => {
      return (date1, date2) => {
        return state.days.filter(
          (d) => d.day >= new Date(date1) && d.day <= new Date(date2)
        );
      };
    },
  },
});
