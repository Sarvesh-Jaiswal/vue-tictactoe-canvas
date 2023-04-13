<template>
  <canvas
    @click="onCanvasClick"
    id="gameCanvas"
    :style="height ? `--canvasH:${height}px;` : ''"
    :class="classToApply"
  >
    Your browser does not support the HTML canvas tag.
  </canvas>
</template>

<script setup lang="ts">
defineProps<{
  height?: number;
  classToApply: string;
}>();

const emit = defineEmits<{
  (event: "canvasCliked", value: MouseEvent): void;
}>();

function onCanvasClick(event: MouseEvent) {
  emit("canvasCliked", event);
}
</script>

<style lang="scss" scoped>
$canvas_height: var(--canvasH, 100%);
$canvas_width: $canvas_height;

canvas {
  position: absolute;
  height: $canvas_height;
  width: $canvas_width;
  cursor: pointer;
  border: 5px solid #444444;
  // background-color:  #000000;
  &.game-over {
    cursor: not-allowed !important;
  }
}
</style>
