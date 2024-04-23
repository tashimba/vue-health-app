<template>
  <v-dialog
    :model-value="modalAddFood"
    @click:outside="closeDialog"
    class="mx-auto"
    max-width="400"
  >
    <v-card style="padding: 10px">
      <v-autocomplete
        label="Продукт"
        :items="
          getFoodListWithTypes().map((obj) =>
            obj.name.length > 30
              ? obj.name.slice(0, 35, '...') + '...'
              : obj.name
          )
        "
        v-model="choosenFood"
        :error-messages="choosenFoodError"
      >
      </v-autocomplete>
      <v-text-field
        trim
        label="Масса"
        suffix="граммы"
        v-model="foodWeight"
        :error-messages="foodWeightError"
      ></v-text-field>
      <v-btn @click="clickHandler">Добавить</v-btn>
    </v-card>
  </v-dialog>
</template>
<script setup>
import { computed, ref, watch, onMounted, onUpdated, reactive } from "vue";
// import { foodStore } from "../main.js";
import { daysStore } from "../main.js";
import { getFoodListWithTypes } from "../functions/FoodListFunctions.js";

const props = defineProps({
  meal: Number,
  modalAddFood: Boolean,
  choosedForEditFood: Object,
});
const emit = defineEmits(["update:modalAddFood"]);

const choosenFood = ref(props.choosedForEditFood.data?.name || "");
const foodWeight = ref(props.choosedForEditFood.weight || "");

const closeDialog = () => emit("update:modalAddFood");
const choosenFoodError = ref("");
const foodWeightError = ref("");
const checkInputs = () => {
  let isValid = true;
  if (!choosenFood.value) {
    choosenFoodError.value = "Обязательное поле";
    isValid = false;
  }
  if (!foodWeight.value) {
    foodWeightError.value = "Обязательное поле";
    isValid = false;
  }
  return isValid;
};

const clickHandler = () => {
  if (!checkInputs()) return;
  const addingFood = {
    foodName: choosenFood.value,
    meal: props.meal,
    weight: Math.abs(parseInt(foodWeight.value)) ?? 0,
  };

  if (!props.choosedForEditFood.id) {
    daysStore.addMealOnDate(addingFood);
  } else {
    daysStore.editMeal(
      daysStore.getCurrentDay.id,
      addingFood,
      props.choosedForEditFood.id
    );
  }
  choosenFood.value = "";
  foodWeight.value = 0;
  choosenFoodError.value = "";
  foodWeightError.value = "";
  closeDialog();
};

watch(choosenFood, () => {
  choosenFoodError.value = "";
});

watch(foodWeight, () => {
  foodWeightError.value = "";
});
console.log(props.choosedForEditFood.id);
</script>
<style></style>
