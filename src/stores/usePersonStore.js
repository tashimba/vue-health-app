import { defineStore } from "pinia";

export const usePersonStore = defineStore("person", {
  state: () => {
    return {
      filled: false,
      gender: 0,
      age: 0,
      weight: 0,
      height: 0,
      activity: 0,
    };
  },
  actions: {
    setData({ age, weight, height, activity, gender }) {
      console.log(age, weight, height, activity, gender);
      this.age = age;
      this.weight = weight;
      this.height = height;
      if (activity === "Минимальная") {
        this.activity = 1.2;
      } else if (activity === "Слабая") {
        this.activity = 1.375;
      } else if (activity === "Умеренная") {
        this.activity = 1.55;
      } else if (activity === "Тяжелая") {
        this.activity = 1.725;
      } else if (activity === "Экстремальная") {
        this.activity = 1.9;
      }

      if (gender === "Мужчина") {
        this.gender = 5;
      } else {
        this.gender = -161;
      }

      this.filled = true;
    },

    getNeededCalories() {
      console.log(
        this.gender,
        this.age,
        this.weight,
        this.height,
        this.activity
      );
      return Math.round(
        (this.weight * 10 + this.height * 6.25 - this.age * 5 + this.gender) *
          this.activity
      );
    },
  },
});
