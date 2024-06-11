<template>
  <NavDrawer></NavDrawer>
  <RouterView></RouterView>
</template>

<script setup>
import NavDrawer from "./components/NavDrawer.vue";
</script>

<style>
.margin-drawer {
  margin-left: 260px;
}
.padding-content {
  padding: 20px;
}
.flex-center {
  display: flex;
  justify-content: center;
}
</style>
