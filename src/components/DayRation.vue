<template>
  <div style="display: flex; justify-content: center; padding: 15px 0">
    <div style="">
      <div class="text-h4" style="margin-bottom: 10px">Дневной рацион</div>
      <div class="text-h5" style="margin-bottom: 40px">
        {{ daysStore.activeDay }}
      </div>

      <v-card class="mx-auto" style="width: 400px; padding: 5px" variant="flat">
        <v-card
          v-for="meal in meals"
          style="margin-bottom: 5px"
          variant="outlined"
        >
          <v-list style="padding: 10px">
            <v-list-group>
              <template v-slot:activator="{ props }">
                <v-list-item v-bind="props">
                  <v-list-item-title class="text-h6">{{
                    meal.title
                  }}</v-list-item-title>
                </v-list-item>
              </template>

              <v-list-item
                v-for="(title, i) in meal.food"
                :key="i"
                :title="title"
                :value="title"
              ></v-list-item>
              <v-card-actions style="display: flex; justify-content: center">
                <ModalAddFood :meal="meal.title"></ModalAddFood>
              </v-card-actions>
            </v-list-group>
          </v-list>
        </v-card>
      </v-card>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import ModalAddFood from "./ModalAddFood.vue";

import { daysStore } from "../main.js";

const meals = reactive([
  { title: "Завтрак", food: ["Овсянка", "Сэндвич"] },
  { title: "Обед", food: ["Овсянка", "Сэндвич"] },
  { title: "Ужин", food: ["Овсянка", "Сэндвич"] },
]);
</script>
<style></style>
