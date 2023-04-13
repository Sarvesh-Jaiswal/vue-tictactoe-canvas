<template>
  <div class="wrapper">
    <button @click="onResetClick" class="btn">reset</button>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (event: "resetCanvas"): void;
}>();

function onResetClick(): void {
  emit("resetCanvas");
}
</script>

<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn {
  font-size: 16px;
  color: #bebebe;
  cursor: pointer;
  text-transform: capitalize;
  padding: 15px 32px;
  border-radius: 5px;
  background-color: transparent;
  border: 2px solid #bebebe;
}
</style>
