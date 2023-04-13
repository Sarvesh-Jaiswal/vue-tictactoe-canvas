<template>
  <div class="wrapper">
    <slot />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.wrapper {
  height: 100%;
  font-size: 27pt;
  color: #bebebe;
  /* background-color:brown; */
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: capitalize;
}
</style>
