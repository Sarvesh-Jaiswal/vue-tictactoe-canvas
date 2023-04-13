<template>
  <TopBar class="top-bar">{{ info }}</TopBar>
  <div class="canvas-wrapper">
    <Canvas
      @canvas-cliked="onCanvasClick"
      :height="canvasHeight"
      :class-to-apply="classApplyToCanvas"
    />
  </div>
  <BottomBar @reset-canvas="resetCanvas" class="bottom-bar"></BottomBar>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { onMounted, onUnmounted } from "vue";
import BottomBar from "./components/BottomBar.vue";
import Canvas from "./components/Canvas.vue";
import TopBar from "./components/TopBar.vue";
import { useAppStore } from "./stores/app-store";

const appStore = useAppStore();

const { info, canvasHeight, classApplyToCanvas } = storeToRefs(appStore);

onMounted(() => {
  appStore.initializeCanvas();
  appStore.addEventListner();
});

onUnmounted(() => {
  appStore.removeEventListner();
});

function onCanvasClick(event: MouseEvent): void {
  appStore.onCanvasClick(event);
}

function resetCanvas(): void {
  appStore.resetCanvas();
}
</script>

<style lang="scss" scoped>
.canvas-wrapper {
  height: 70%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.top-bar,
.bottom-bar {
  height: 15%;
}

//  .top-bar {
//   background-color: aqua;
// }

//  .bottom-bar {
//   background-color: aqua;
// }

.svg-wrapper {
  height: 200px;
}
</style>
