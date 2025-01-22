<template>
  <v-layout>
    <v-navigation-drawer class="nav-drawer">
      <v-list density="compact" nav>
        <v-list-item
          v-for="item in listItems"
          :key="item.value"
          :prepend-icon="item.icon"
          :title="item.title"
          :value="item.value"
          @click="
            () => {
              if ($route.path !== item.route) $router.push(item.route);
            }
          "
          style="padding: 15px 10px; font-size: 1.2rem"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-layout>
</template>
<script setup>
import { reactive } from "vue";

const listItems = reactive([
  {
    title: "Календарь",
    value: 0,
    icon: "mdi-calendar-badge",
    route: "/",
  },
  {
    title: "Статистика",
    value: 1,
    icon: "mdi-poll",
    route: "/analysis",
  },
  {
    title: "Продукты",
    value: 2,
    icon: "mdi-nutrition",
    route: "/foods",
  },
]);
</script>
<style></style>
