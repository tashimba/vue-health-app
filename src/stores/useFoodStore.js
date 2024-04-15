import { defineStore } from "pinia";
import foodBase from "../food_base.min.json";

export const useFoodStore = defineStore("food", {
  state: () => {
    return {
      foodData: foodBase,
      // foodData: [
      //   {
      //     name: { type: String },
      //     calories: { type: Number },
      //     proteins: { type: Number },
      //     fats: { type: Number },
      //     carbs: { type: Number },
      //   },
      // ],
    };
  },
  actions: {
    getFoodByName(name) {
      return this.foodData.find((food) => food.name === name);
    },

    createFood(obj) {
      this.foodData.push(obj);
    },
  },
  getters: {
    fieldWithTypes: (state) =>
      state.foodData.map(
        (item) =>
          (item = {
            name: item.name,
            calories: parseInt(item.calories),
            proteins: parseInt(item.proteins),
            fats: parseInt(item.fats),
            carbs: parseInt(item.carbs),
          })
      ),
  },
});
