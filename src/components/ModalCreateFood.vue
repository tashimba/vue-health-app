<template>
  <v-btn style="width: 200px" @click="clickBtnHandler">
    <template #prepend>
      <v-icon icon="mdi-hamburger-plus"></v-icon>
    </template>
    Добавить
  </v-btn>
  <v-dialog v-model="dialog" class="mx-auto" max-width="400">
    <v-card style="padding: 10px">
      <v-text-field
        v-for="(inputData, i) in inputsData"
        :label="inputData.label"
        v-model.trim="inputData.inputValue"
        :error-messages="inputData.errorMessage"
        :rules="[checkNumberInputs(inputData, i)]"
      ></v-text-field>

      <v-alert
        v-if="existingFoodError"
        border="end"
        border-color="error"
        elevation="2"
      >
        {{ existingFoodError }}
      </v-alert>

      <v-btn @click="clickAddHandler">Добавить</v-btn>
    </v-card>
  </v-dialog>
</template>
<script setup>
import { reactive, ref, watch } from "vue";
import { createFood } from "../functions/FoodListFunctions";

const dialog = ref(false);
const inputsData = reactive([
  { label: "Название", inputValue: "", errorMessage: "" },
  { label: "Калории", inputValue: "", errorMessage: "" },
  { label: "Белки", inputValue: "", errorMessage: "" },
  { label: "Жиры", inputValue: "", errorMessage: "" },
  { label: "Углеводы", inputValue: "", errorMessage: "" },
]);

const existingFoodError = ref("");

const clickBtnHandler = () => {
  dialog.value = true;
  inputsData.forEach((el) => {
    el.inputValue = "";
    el.errorMessage = "";
  });
  existingFoodError.value = "";
};
const checkInputValues = () => {
  let isValid = true;
  inputsData.forEach((el, i) => {
    if (!el.inputValue) {
      el.errorMessage = "Поле обязательно для заполнения";
      isValid = false;
    }
    if (i !== 0 && el.inputValue && !parseInt(el.inputValue)) {
      isValid = false;
    }
  });
  return isValid;
};

const checkNumberInputs = (inputData, i) => {
  if (i !== 0 && inputData.inputValue && !parseInt(inputData.inputValue))
    return "Значение должно быть числом";
  else return true;
};

const clickAddHandler = () => {
  if (!checkInputValues()) return;

  const foodObj = {
    name: inputsData[0].inputValue,
    calories: Math.abs(parseInt(inputsData[1].inputValue)),
    proteins: Math.abs(parseInt(inputsData[2].inputValue)),
    fats: Math.abs(parseInt(inputsData[3].inputValue)),
    carbs: Math.abs(parseInt(inputsData[4].inputValue)),
  };

  if (createFood(foodObj) === false) {
    existingFoodError.value = "Такой продукт уже существует";
  } else {
    dialog.value = false;
    inputsData.forEach((el) => (el.inputValue = ""));
  }
};

watch(inputsData, () => {
  inputsData.forEach((el) => {
    if (el.inputValue) el.errorMessage = "";
  });
});
</script>
<style></style>
