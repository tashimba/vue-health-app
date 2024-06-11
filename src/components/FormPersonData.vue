<template>
  <div class="flex-center">
    <v-card 
      elevation="6" 
      width="400" 
      style="padding: 20px">
      <v-text-field
        v-for="inputData in inputsData"
        :label="inputData.label"
        v-model.trim="inputData.inputValue"
        :error-messages="inputData.errorMessage"
        :rules="[checkNumberInputs(inputData)]"
      >
      </v-text-field>
      <v-select
        v-for="selectData in selectsData"
        v-model="selectData.inputValue"
        :items="selectData.items"
        :label="selectData.label"
        :error-messages="selectData.errorMessage"
      >
      </v-select>
      <v-btn block @click="clickBtnHandler">Сохранить</v-btn>
    </v-card>
  </div>
</template>
<script setup>
import { reactive, watch } from "vue";
import { personStore } from "../main.js";

const emit = defineEmits(["formSubmitted"]);
const inputsData = reactive([
  { label: "Возраст", inputValue: "", errorMessage: "" },
  { label: "Рост", inputValue: "", errorMessage: "" },
  { label: "Вес", inputValue: "", errorMessage: "" },
]);

const selectsData = reactive([
  {
    label: "Активность",
    inputValue: null,
    errorMessage: "",
    items: ["Минимальная", "Слабая", "Умеренная", "Тяжелая", "Экстремальная"],
  },
  {
    label: "Пол",
    inputValue: null,
    errorMessage: "",
    items: ["Мужчина", "Женщина"],
  },
]);
const checkNumberInputs = (inputData) => {
  if (inputData.inputValue && !parseInt(inputData.inputValue))
    return "Значение должно быть числом";
  else return true;
};
const checkInputValues = () => {
  let isValid = true;
  inputsData.forEach((el) => {
    if (!el.inputValue) {
      el.errorMessage = "Поле обязательно для заполнения";
      isValid = false;
    } else if (el.inputValue < 0) {
      el.errorMessage = "Значение должно быть больше нуля";
      isValid = false;
    }
    if (el.inputValue && !parseInt(el.inputValue)) {
      isValid = false;
    }
  });
  selectsData.forEach((el) => {
    if (!el.inputValue) {
      el.errorMessage = "Поле обязательно для заполнения";
      isValid = false;
    }
  });
  return isValid;
};

const clickBtnHandler = () => {
  if (checkInputValues()) {
    emit("formSubmitted");
    const data = {
      age: parseInt(inputsData[0].inputValue),
      height: parseInt(inputsData[1].inputValue),
      weight: parseInt(inputsData[2].inputValue),
      activity: selectsData[0].inputValue,
      gender: selectsData[1].inputValue,
    };
    personStore.setData(data);
    inputsData.forEach((el) => (el.errorMessage = ""));
    selectsData.forEach((el) => (el.errorMessage = ""));
  }
};
watch(inputsData, () => {
  inputsData.forEach((el) => {
    if (el.inputValue) {
      el.errorMessage = "";
    }
  });
});
</script>
<style></style>
