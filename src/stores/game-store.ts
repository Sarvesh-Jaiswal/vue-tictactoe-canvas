import { Game } from "./../data-classes/game";
import { defineStore } from "pinia";
import { BoardValue } from "../types";
import { computed, Ref, ref } from "vue";

export const useGameStore = defineStore("gameStore", () => {
  const game: Ref<Game> = ref(new Game());
  const wonPlayer = computed(() => game.value.wonPlayer);
  const rowStroked = computed(() => game.value.rowStroked);
  const columnStroked = computed(() => game.value.columnStroked);
  const daigonalStroked = computed(() => game.value.daigonalStroked);
  const isBoardFull = computed(() => game.value.isBoardFull);

  function markSymbolOnBoard(x: number, y: number): BoardValue {
    return game.value.markSymbol(x, y);
  }

  function isGameOver(): boolean {
  if (isLineStroked()) return true;
  if (isBoardFull.value) return true;
  return false;
}

  function isLineStroked(): boolean {
  if (rowStroked.value) return true;
  if (columnStroked.value) return true;
  if (daigonalStroked.value) return true;
  return false;
}

  function reset() {
    game.value = new Game()
  }

  return {
    wonPlayer,
    rowStroked,
    columnStroked,
    daigonalStroked,
    isBoardFull,
    isGameOver,
    isLineStroked,
    markSymbolOnBoard,
    reset
  };
});
