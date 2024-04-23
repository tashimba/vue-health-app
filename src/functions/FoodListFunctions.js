import foodBase from "../food_base.min.json";

const getFoodList = () => {
  const localStorageData = JSON.parse(localStorage.getItem("foodBase")) || [];
  const jsonData = foodBase;

  return [...jsonData, ...localStorageData];
};
const getFoodByName = (name) => {
  return getFoodList().find((food) => food.name === name);
};

const getFoodDataByName = (name) => {
  const food = getFoodByName(name);
  return `Название: ${food.name}\nКалории: ${food.calories}\nБелки: ${food.proteins}\nЖиры: ${food.fats}\nУглеводы: ${food.carbs}`;
};
const createFood = (obj) => {
  const foods = JSON.parse(localStorage.getItem("foodBase")) || [];
  foods.push(obj);
  localStorage.setItem("foodBase", JSON.stringify(foods));
};
const getFoodListWithTypes = () =>
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

export {
  getFoodList,
  getFoodByName,
  createFood,
  getFoodListWithTypes,
  getFoodDataByName,
};
