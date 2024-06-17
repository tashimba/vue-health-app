import { defineStore } from "pinia";
import getDateString from "../functions/getDateString.js";
import { getFoodByName } from "../functions/FoodListFunctions.js";

export const useDaysStore = defineStore("days", {
  state: () => {
    return {
      days: [],
      activeDay: undefined,
    };
  },

  actions: {
    openDay(day) {
      if (this.days.find((d) => d.day.getTime() === day.getTime())) {
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
        (d) => d.day.getTime() === this.activeDay.getTime()
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
      const day = this.days.find((d) => d.id === dayId);
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
      const day = this.days.find((d) => d.id === dayId);
      day.meals = day.meals.map((meal, i) => {
        if (i === mealIter) {
          meal.food = meal.food.filter((food) => food.id != foodId);
        }
        return meal;
      });
    },
    sumOfCaloriesForEachDay(startDate, endDate) {
        const daysBetweenDates = this.getSortDaysBetweenDates(startDate, endDate);
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
        return sumOfCaloriesForEachDay;     
    },
    sumOfPFCForEachDay(startDate, endDate) {
      const daysBetweenDates = this.getSortDaysBetweenDates(startDate, endDate);
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
      return (startDate, endDate) => {
        return state.days.filter(
          (d) => d.day >= new Date(startDate) && d.day <= new Date(endDate)
        );
      };
    },
   
  },
});
