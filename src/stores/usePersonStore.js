import { defineStore } from "pinia";

export const usePersonStore = defineStore("person", {
  state: () => {
    return {
      isFilled: false,
      gender: 0,
      age: 0,
      weight: 0,
      height: 0,
      activity: 0,
      date1: 0,
      date2: 0,
    };
  },
  actions: {
    setData({ age, weight, height, activity, gender }) {
      this.age = age;
      this.weight = weight;
      this.height = height;
      this.activity = activity;
      this.gender = gender;
      this.isFilled = true;
    },
    setDateInputs(datesObj) {
      this.date1 = datesObj.date1;
      this.date2 = datesObj.date2;
    },

    getNeededCalories() {
      let activityNumber, genderNumber;

      if (this.activity === "Минимальная") {
        activityNumber = 1.2;
      } else if (this.activity === "Слабая") {
        activityNumber = 1.375;
      } else if (this.activity === "Умеренная") {
        activityNumber = 1.55;
      } else if (this.activity === "Тяжелая") {
        activityNumber = 1.725;
      } else if (this.activity === "Экстремальная") {
        activityNumber = 1.9;
      }

      if (this.gender === "Мужчина") {
        genderNumber = 5;
      } else {
        genderNumber = -161;
      }

      return Math.round(
        (this.weight * 10 + this.height * 6.25 - this.age * 5 + genderNumber) *
          activityNumber
      );
    },
  },
  getters: {
    getPersonData() {
      return `Пол: ${this.gender}\nВозраст: ${this.age}\nВес: ${this.weight}\nРост: ${this.height}\nАктивность: ${this.activity}`;
    },
  },
});
