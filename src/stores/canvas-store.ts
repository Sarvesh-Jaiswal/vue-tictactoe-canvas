import { BoardSymbol } from "./../types/index";
import { Canvas } from "./../data-classes/canvas";
import { defineStore } from "pinia";
import { ref } from "vue";
import { BoxCoordinate } from "../types";

export const useCanvasStore = defineStore("canvasStore", () => {
  const canvas = ref(new Canvas());

  function initializeCanvas(): void {
    canvas.value.initializeCanvas();
  }

  function getBoxCoordinate(event: MouseEvent): BoxCoordinate {
    return canvas.value.getBoxCoordinate(event);
  }

  function markSymbol(row: number, column: number, value: BoardSymbol): void {
    canvas.value.markSymbol(row, column, value);
  }

  function strokeLine(row?: number, column?: number, daigonal?: number) {
    canvas.value.strokeLine(row,column,daigonal)
  }

  function reset(): void {
    canvas.value = new Canvas()
    canvas.value.initializeCanvas()
  }

  return {
    initializeCanvas,
    getBoxCoordinate,
    markSymbol,
    strokeLine,
    reset,
  };
});

// function drawCrossInCanvas(x: number, y: number) {
//   var canvas: HTMLCanvasElement = document.querySelector("#gameCanvas")!;
//   var ctx: CanvasRenderingContext2D = canvas.getContext("2d")!;
//   ctx.lineWidth = 2;
//   // TO draw cross in 1,1 box
//   // ctx.moveTo(0, 0);
//   // ctx.lineTo(100, 100);
//   // ctx.moveTo(100, 0);
//   // ctx.lineTo(0, 100);
//   // ctx.stroke();
//   //  code only to draw in 1st row
//   // ctx.moveTo((y - 1) * 100, 0); // 0, 100, 200
//   // ctx.lineTo(y * 100, lineHeight); // 100 is line point to draw
//   // ctx.moveTo(y * 100, 0);
//   // ctx.lineTo((y - 1) * 100, lineHeight); // 100 is line point to draw
//   // ctx.stroke();
//   // // code only to draw in 2nd row
//   // ctx.moveTo((y - 1) * 100, 100);
//   // ctx.lineTo(y * 100, 200);
//   // ctx.moveTo(y * 100, 100);
//   // ctx.lineTo((y - 1) * 100, 200); // 100 is line point to draw
//   // ctx.stroke();
//   // code only to draw in 3rd row
//   // ctx.moveTo((y - 1) * 100, 200);
//   // ctx.lineTo(y * 100, 300);
//   // ctx.moveTo(y * 100, 200);
//   // ctx.lineTo((y - 1) * 100, 300); // 100 is line point to draw
//   // ctx.stroke();
//   ctx.moveTo((y - 1) * 100, (x - 1) * 100);
//   ctx.lineTo(y * 100, x * 100);
//   ctx.moveTo(y * 100, (x - 1) * 100);
//   ctx.lineTo((y - 1) * 100, x * 100);
//   ctx.stroke();
// }
