<template>
  <v-dialog
    :model-value="openDialogFoodData"
    @click:outside="closeDialog"
    class="mx-auto"
    max-width="400"
  >
    <v-card class="pa-2">
      <v-card-title style="text-align: center"
        >Характеристики продукта</v-card-title
      >
      <v-card-text style="white-space: pre">{{
        getFoodDataByName(props.foodName)
      }}</v-card-text>
    </v-card>
  </v-dialog>
</template>
<script setup>
import { getFoodDataByName } from "../functions/FoodListFunctions";

const props = defineProps({
  openDialogFoodData: Boolean,
  foodName: String,
});
const emit = defineEmits(["update:modalFoodData"]);
const closeDialog = () => emit("update:modalFoodData", false);
</script>
<style></style>
