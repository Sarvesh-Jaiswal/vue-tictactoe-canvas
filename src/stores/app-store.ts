import { defineStore, storeToRefs } from "pinia";
import { computed, ComputedRef, ref } from "vue";
import { useCanvasStore } from "./canvas-store";
import { useGameStore } from "./game-store";

export const useAppStore = defineStore("appStore", () => {
  const gameStore = useGameStore();
  const canvasStore = useCanvasStore();
  const canvasHeight = ref();

  const { wonPlayer, isBoardFull, rowStroked, columnStroked, daigonalStroked } =
    storeToRefs(gameStore);

  const info: ComputedRef<string> = computed(() => {
    if (wonPlayer.value) {
      return `${wonPlayer.value.name} WON`;
    }
    if (isBoardFull.value) return "DRAW";
    return "TicTacToe";
  });

  const classApplyToCanvas = computed(() =>
    wonPlayer.value || isBoardFull.value ? "game-over" : ""
  );

  function initializeCanvas(): void {
    canvasStore.initializeCanvas();
  }

  function onCanvasClick(event: MouseEvent): void {
    if (gameStore.isGameOver()) return;
    const { row, column } = canvasStore.getBoxCoordinate(event);
    const value = gameStore.markSymbolOnBoard(row, column);
    if (value) {
      canvasStore.markSymbol(row, column, value);
    }
    if (gameStore.isLineStroked()) {
      canvasStore.strokeLine(
        rowStroked.value,
        columnStroked.value,
        daigonalStroked.value
      );
    }
  }

  function resetCanvas(): void {
    gameStore.reset();
    canvasStore.reset();
  }

  function addEventListner(): void {
    window.addEventListener("resize", resizeEventListneners);
    resizeEventListneners();
  }

  function removeEventListner(): void {
    window.removeEventListener("resize", resizeEventListneners);
  }

  function resizeEventListneners() {
    _resizeCanvas();
    _setAppHeight();
  }

  function _resizeCanvas(): void {
    const wrapper: HTMLElement = document.querySelector(".canvas-wrapper")!;
    const padding = 50;
    const wrapperHeight = wrapper.offsetHeight;
    const wrapperWidth = wrapper.offsetWidth;
    canvasHeight.value =
      (wrapperHeight > wrapperWidth ? wrapperWidth : wrapperHeight) - padding;
  }

  function _setAppHeight() {
    const doc = document.documentElement;
    doc.style.setProperty("--appHeight", `${window.innerHeight}px`);
  }

  return {
    info,
    canvasHeight,
    classApplyToCanvas,
    initializeCanvas,
    addEventListner,
    removeEventListner,
    onCanvasClick,
    resetCanvas,
  };
});
