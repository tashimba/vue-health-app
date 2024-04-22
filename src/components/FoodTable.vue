<template>
  <v-row justify="center" style="height: 60px" no-gutters>
    <v-col>
      <ModalCreateFood></ModalCreateFood>
    </v-col>

    <v-col cols="4">
      <v-text-field
        label="Поиск"
        density="compact"
        clearable
        v-model="inputValue"
        @click:clear="inputValue = ''"
      >
        <template v-slot:append-inner>
          <v-icon icon="mdi-magnify"></v-icon>
        </template>
      </v-text-field>
    </v-col>
  </v-row>
  <v-data-table
    :headers="headers"
    :items="newFoodListFiltered"
    :search="inputValue"
    density="compact"
  ></v-data-table>
</template>

<script setup>
import { ref, computed } from "vue";
import { storeToRefs } from "pinia";
import ModalCreateFood from "./ModalCreateFood.vue";

const inputValue = ref("");
// const { fieldWithTypes } = storeToRefs(foodStore);

const headers = [
  {
    title: "Название",
    key: "name",
    width: "30%",
  },
  {
    title: "Калории (кКал)",
    key: "calories",
  },
  {
    title: "Белки (гр)",
    key: "proteins",
  },
  {
    title: "Жиры (гр)",
    key: "fats",
  },
  {
    title: "Углеводы (гр)",
    key: "carbs",
  },
];

import {
  getFoodList,
  getFoodByName,
  createFood,
  getFieldWithTypes,
} from "../functions/getFoodList";
const newFoodBase = getFoodList();

const newFoodListFiltered = computed(() => {
  return getFieldWithTypes().filter((el) =>
    el.name.toLowerCase().includes(inputValue.value.toLowerCase())
  );
});
</script>

<style></style>
