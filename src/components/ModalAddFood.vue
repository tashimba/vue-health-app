<template>
  <v-btn variant="outlined" block @click="dialog = true"> Добавить</v-btn>
  <v-dialog v-model="dialog" class="mx-auto" max-width="400">
    <v-card style="padding: 10px">
      <v-autocomplete
        label="Продукт"
        :items="foodStore.foodData.slice(1, 10).map((obj) => obj.name)"
        v-model="choosenFood"
      ></v-autocomplete>
      <v-text-field
        label="Масса"
        suffix="граммы"
        v-model="foodWeight"
      ></v-text-field>
      <v-btn @click="addMeal">Добавить</v-btn>
    </v-card>
  </v-dialog>
</template>
<script setup>
import { ref, watch } from "vue";
import { foodStore } from "../main.js";
import { daysStore } from "../main.js";

const props = defineProps(["meal"]);

const emit = defineEmits(["refresh"]);
const dialog = ref(false);
const choosenFood = ref("");
const foodWeight = ref(0);

function addMeal() {
  const addingFood = {
    foodName: choosenFood.value,
    meal: props.meal,
    weight: foodWeight.value,
  };
  daysStore.addMealOnDate(addingFood);
  dialog.value = false;
}
</script>
<style></style>
