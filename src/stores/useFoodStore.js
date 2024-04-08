import { defineStore } from "pinia";
import foodBase from "../food_base.min.json";

export const useFoodStore = defineStore("food", {
  state: () => {
    return {
      foodData: foodBase,
    };
  },
  actions: {
    getFoodByName(name) {
      return this.foodData.find((food) => food.name === name);
    },
  },
});
