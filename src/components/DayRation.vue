<template>
  <div class="flex-center">
    <div>
      <div class="text-h4" style="margin-bottom: 10px">Дневной рацион</div>
      <div class="text-h5" style="margin-bottom: 40px">
        {{ parseDate(currentDay.day) }}
      </div>

      <v-card
        class="mx-auto"
        style="width: 400px; padding: 5px"
        variant="flat"
        :key="refreshKey"
      >
        <v-card
          v-for="(meal, i) in mealNames"
          style="margin-bottom: 5px"
          elevation="4"
        >
          <v-list style="padding: 10px" density="compact">
            <v-list-group>
              <template v-slot:activator="{ props }">
                <v-list-item v-bind="props">
                  <v-list-item-title class="text-h5">{{
                    meal
                  }}</v-list-item-title>
                </v-list-item>
              </template>

              <v-divider :thickness="1" class="border-opacity-25" />

              <v-card
                density="compact"
                @click.stop="openDialogFoodData = true"
                variant="tonal"
                v-if="currentDayMeals"
                style="margin: 10px 0"
                v-for="curFood in currentDayMeals[i]?.food"
                :key="curFood.id"
                :title="curFood.data.name"
                :subtitle="curFood.weight + ' грамм'"
                :value="curFood.data.name"
              >
                <template #append>
                  <v-btn
                    variant="plain"
                    :slim="true"
                    icon="mdi-close"
                    @click.stop="
                      daysStore.deleteMeal(currentDay.id, i, curFood.id)
                    "
                  >
                  </v-btn>
                  <v-btn
                    variant="plain"
                    :slim="true"
                    icon="mdi-pencil-outline"
                    @click.stop="openEditModal(curFood)"
                  >
                  </v-btn>
                </template>
              </v-card>

              <v-btn elevation="4" block @click.stop="createFood(i)">
                Добавить</v-btn
              >
            </v-list-group>
          </v-list>
        </v-card>
        <ModalAddFood
          :meal="choosenMeal"
          v-model="openDialogAddFood"
          :choosedForEditFood="choosedForEditFood"
          @update:modalAddFood="closeDialog"
        ></ModalAddFood>
        <ModalFoodData
          :foodName="currentDay?.meals[choosenMeal]?.food[0]?.data?.name"
          v-model="openDialogFoodData"
          @update:modalFoodData="openDialogFoodData = false"
        >
        </ModalFoodData>
      </v-card>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import ModalAddFood from "./ModalAddFood.vue";
import ModalFoodData from "./ModalFoodData.vue";
import { daysStore } from "../main.js";
import parseDate from "../functions/parseDayTo_DD-MM-YYYY";
import { storeToRefs } from "pinia";

const { activeDay } = storeToRefs(daysStore);
const currentDay = ref(
  daysStore.days.find(
    (day) => day.day.getTime() === activeDay?.value.getTime()
  ) || new Object()
);
const refreshKey = ref(0);

const openDialogFoodData = ref(false);
const openDialogAddFood = ref(false);
const choosenMeal = ref(0);
const choosedForEditFood = ref({});
const mealNames = ["Завтрак", "Обед", "Ужин"];

const currentDayMeals = computed(() => currentDay.value?.meals || []);

const findCurrentDay = (dayParam) => {
  currentDay.value = daysStore.days.find(
    (day) => day.day.getTime() === dayParam.getTime()
  );
};

const createFood = (i) => {
  openDialogAddFood.value = true;
  choosenMeal.value = i;
};

const closeDialog = () => {
  choosedForEditFood.value = {};
  openDialogAddFood.value = false;
};

const openEditModal = (curFood) => {
  openDialogAddFood.value = true;
  choosedForEditFood.value = curFood;
};

watch(activeDay, (newValue) => {
  refreshKey.value++;
  findCurrentDay(newValue);
});
</script>
<style></style>
