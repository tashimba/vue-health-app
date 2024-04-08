<template>
  <v-btn variant="outlined" block @click="dialog = true"> Добавить</v-btn>
  <v-dialog v-model="dialog" class="mx-auto" max-width="400">
    <v-card style="padding: 10px">
      <v-autocomplete
        label="Select"
        :items="foodStore.foodData.slice(1, 10).map((obj) => obj.name)"
        v-model="choosenFood"
      ></v-autocomplete>
      <v-btn @click="addMeal">Добавить</v-btn>
    </v-card>
  </v-dialog>
</template>
<script setup>
import { ref, watch } from "vue";
import { foodStore } from "../main.js";
import { daysStore } from "../main.js";

const props = defineProps(["meal"]);

const dialog = ref(false);
const choosenFood = ref("");

function addMeal() {
  const addingFood = {
    foodName: choosenFood.value,
    meal: props.meal,
    day: daysStore.activeDay,
  };
  console.log(addingFood);

  daysStore.addMealOnDate(addingFood);
}
</script>
<style></style>
