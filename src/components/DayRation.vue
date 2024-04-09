<template>
  <div style="display: flex; justify-content: center; padding: 15px 0">
    <div style="">
      <div class="text-h4" style="margin-bottom: 10px">Дневной рацион</div>
      <div class="text-h5" style="margin-bottom: 40px">
        {{ parseDate(daysStore.activeDay) }}
      </div>

      <v-card class="mx-auto" style="width: 400px; padding: 5px" variant="flat">
        <v-card
          v-for="(meal, i) in mealNames"
          style="margin-bottom: 5px"
          variant="outlined"
        >
          <v-list style="padding: 10px">
            <v-list-group>
              <template v-slot:activator="{ props }">
                <v-list-item v-bind="props">
                  <v-list-item-title class="text-h6">{{
                    mealNames[i]
                  }}</v-list-item-title>
                </v-list-item>
              </template>

              <v-list-item
                v-for="(curFood, j) in currentDay?.value?.meals[i]?.food"
                :key="j"
                :title="curFood.name"
                :value="curFood.name"
              ></v-list-item>
              <v-card-actions style="display: flex; justify-content: center">
                <ModalAddFood :meal="meal.name"></ModalAddFood>
              </v-card-actions>
            </v-list-group>
          </v-list>
        </v-card>
        <v-btn v-if="!currentDay || currentDay?.meals?.length < 3"
          >Добавить прием</v-btn
        >
      </v-card>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, watch } from "vue";
import ModalAddFood from "./ModalAddFood.vue";

import { daysStore } from "../main.js";
import parseDate from "../functions/parseDayTo_DD-MM-YYYY";
import { storeToRefs } from "pinia";

const currentDay = ref(new Object());

const { activeDay } = storeToRefs(daysStore);
watch(activeDay, (newValue) => {
  currentDay.value = daysStore.days.find((day) => {
    if (day.day.getTime() === newValue.getTime()) return day;
  });
  for (let i = 0; i < 3; i++) {
    console.log(currentDay?.value?.meals[i]?.food[0]?.name);
  }
});

const mealNames = ["Завтрак", "Обед", "Ужин"];
</script>
<style></style>
