import foodBase from "../food_base.min.json";

const getFoodList = () => {
  const localStorageData = JSON.parse(localStorage.getItem("foodBase")) || [];
  const jsonData = foodBase;

  return [...localStorageData, ...jsonData];
};
const getFoodByName = (name) => {
  return getFoodList().find((food) => food.name === name);
};

const createFood = (obj) => {
  localStorage.setItem("foodBase", JSON.stringify([obj]));
};
const getFieldWithTypes = () =>
  getFoodList().map(
    (item) =>
      (item = {
        name: item.name,
        calories: parseInt(item.calories),
        proteins: parseInt(item.proteins),
        fats: parseInt(item.fats),
        carbs: parseInt(item.carbs),
      })
  );

export { getFoodList, getFoodByName, createFood, getFieldWithTypes };
