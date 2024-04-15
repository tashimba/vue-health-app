<template>
  <v-btn style="width: 200px" @click="dialog = true">
    <template v-slot:prepend>
      <v-icon icon="mdi-hamburger-plus"></v-icon>
    </template>
    Добавить
  </v-btn>
  <v-dialog v-model="dialog" class="mx-auto" max-width="400">
    <v-card style="padding: 10px">
      <v-text-field label="Название" v-model="inputValueName"></v-text-field>
      <v-text-field label="Калории" v-model="inputValueCalories"></v-text-field>
      <v-text-field label="Белки" v-model="inputValueProteins"></v-text-field>
      <v-text-field label="Жиры" v-model="inputValueFats"></v-text-field>
      <v-text-field label="Углеводы" v-model="inputValueCarbs"></v-text-field>
      <v-btn
        @click="
          foodStore.createFood({
            name: inputValueName,
            calories: inputValueCalories,
            proteins: inputValueProteins,
            fats: inputValueFats,
            carbs: inputValueCarbs,
          })
        "
        >Добавить</v-btn
      >
    </v-card>
  </v-dialog>
</template>
<script setup>
import { ref, reactive } from "vue";
import { foodStore } from "../main";

const dialog = ref(false);

const inputValueName = ref("");
const inputValueCalories = ref("");
const inputValueProteins = ref("");
const inputValueFats = ref("");
const inputValueCarbs = ref("");
</script>
<style></style>
