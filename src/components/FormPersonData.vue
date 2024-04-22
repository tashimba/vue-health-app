<template>
  <v-container fill-height fluid class="paddingContent">
    <v-row justify="center">
      <v-col cols="3">
        <v-text-field
          v-for="inputData in inputsData"
          :label="inputData.label"
          v-model.trim="inputData.inputValue"
          :error-messages="inputData.errorMessage"
        >
        </v-text-field>
        <v-select
          v-for="selectData in selectsData"
          v-model="selectData.inputValue"
          :items="selectData.items"
          :label="selectData.label"
        >
        </v-select>
        <v-btn @click="clickBtnHandler">Сохранить</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup>
import { reactive, ref } from "vue";
const emit = defineEmits(["formSubmitted"]);
import { personStore } from "../main.js";

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
  console.log(selectsData[1].inputValue);
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
    console.log(personStore.getNeededCalories());
  }
};

const dialog = ref(true);
</script>
<style></style>
