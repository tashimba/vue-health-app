<template>
  <NavDrawer></NavDrawer>
  <RouterView></RouterView>
</template>

<script setup>
import NavDrawer from "./components/NavDrawer.vue";
</script>

<style>
.marginDrawer {
  margin-left: 260px;
}
.paddingContent {
  padding: 20px;
}
.flex-center {
  display: flex;
  justify-content: center;
}
</style>
