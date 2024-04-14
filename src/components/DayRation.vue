<template>
  <div style="display: flex; justify-content: center; padding: 15px 0">
    <div v-if="daysStore.activeDay">
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
          <v-list style="padding: 10px" density="compact">
            <v-list-group>
              <template v-slot:activator="{ props }">
                <v-list-item v-bind="props">
                  <v-list-item-title class="text-h6">{{
                    meal
                  }}</v-list-item-title>
                </v-list-item>
              </template>

              <v-divider :thickness="1" class="border-opacity-25" />

              <v-list-item
                v-if="currentDay?.meals"
                style="margin: 10px 0"
                v-for="curFood in currentDay?.meals[i]?.food"
                :key="curFood.id"
                :title="curFood.data.name"
                :subtitle="curFood.weight + ' грамм'"
                :value="curFood.data.name"
              >
                <template v-slot:append>
                  <v-icon
                    icon="mdi-close"
                    @click.stop="
                      daysStore.deleteMeal(currentDay.id, i, curFood.id)
                    "
                  ></v-icon>
                </template>
              </v-list-item>

              <v-card-actions style="display: flex; justify-content: center">
                <ModalAddFood :meal="i"></ModalAddFood>
              </v-card-actions>
            </v-list-group>
          </v-list>
        </v-card>
      </v-card>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import ModalAddFood from "./ModalAddFood.vue";

import { daysStore } from "../main.js";
import parseDate from "../functions/parseDayTo_DD-MM-YYYY";
import { storeToRefs } from "pinia";

const findCurrentDay = (dayParam) => {
  currentDay.value = daysStore.days.find((day) => {
    if (day.day.getTime() === dayParam.value.getTime()) return day;
  });
};

const { activeDay } = storeToRefs(daysStore);

const currentDay = ref(new Object());

findCurrentDay(activeDay);

watch(activeDay, (newValue) => {
  findCurrentDay(newValue);
});

const mealNames = ["Завтрак", "Обед", "Ужин"];
</script>
<style></style>
