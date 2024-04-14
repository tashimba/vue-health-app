<template>
  <div class="marginDrawer foodTable">
    <v-row>
      <v-spacer></v-spacer>

      <v-col cols="5" align="center">
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
    <v-table>
      <thead>
        <tr>
          <th class="text-left">Название</th>
          <th class="text-left">Калории</th>
          <th class="text-left">Белки</th>
          <th class="text-left">Жиры</th>
          <th class="text-left">Углеводы</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="item in foodListFiltered" :key="item.name">
          <td>{{ item.name }}</td>
          <td>{{ item.calories }}</td>
          <td>{{ item.proteins }}</td>
          <td>{{ item.fats }}</td>
          <td>{{ item.carbs }}</td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script setup>
import { ref, watch, reactive, computed } from "vue";
import { foodStore } from "../main";

const inputValue = ref("");

const foodList = reactive(foodStore.foodData);

const foodListFiltered = computed(() => {
  return foodList.filter((el) => el.name.includes(inputValue.value));
});

const foodListFilter = () => {
  return foodList.filter((el) => el.name.includes(inputValue.value));
};

// watch(inputValue, (newValue) => {
//   foodList
// });
</script>

<style>
.foodTable {
  padding: 20px;
}
</style>
