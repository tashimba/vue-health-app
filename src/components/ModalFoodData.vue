<template>
  <v-dialog
    :model-value="modelValue"
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
  modelValue: Boolean,
  foodName: String,
});
const emit = defineEmits(["update:modelValue"]);
const closeDialog = () => emit("update:modelValue", false);
</script>
<style></style>
