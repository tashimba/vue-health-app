<template>
  <v-dialog
    :model-value="openDialogAddFood"
    @click:outside="closeDialog"
    class="mx-auto"
    max-width="400"
  >
    <v-card style="padding: 10px">
      <v-autocomplete
        label="Продукт"
        :items="getFoodListWithTypes().map((obj) => obj.name)"
        v-model="choosenFood"
        :error-messages="choosenFoodError"
        :menu-props="{ maxWidth: '200' }"
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
  openDialogAddFood: Boolean,
  choosedForEditFood: Object,
});
console.log(props.choosedForEditFood);
const emit = defineEmits(["update:modalAddFood"]);

const choosenFood = ref("");
const foodWeight = ref("");

const closeDialog = () => emit("update:modalAddFood", false);
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

onUpdated(() => {
  choosenFood.value = props.choosedForEditFood.data?.name || "";
  foodWeight.value = props.choosedForEditFood.weight || "";
});
</script>
<style></style>
