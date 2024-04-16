<template>
  <div>
    <v-text-field type="date" :label="componentProps.label"></v-text-field>
  </div>
</template>
<script setup>
import { defineProps } from "vue";

const componentProps = defineProps({
  label: {
    type: String,
    required: true,
  },
});
</script>
<style></style>
