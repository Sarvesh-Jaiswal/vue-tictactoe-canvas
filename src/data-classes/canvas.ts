import { BoardSymbol } from "./../types/index";
export class Canvas {
  canvas!: HTMLCanvasElement;
  ctx!: CanvasRenderingContext2D;
  CANVAS_DRAWING_SIZE: number = 300;

  constructor() {}

  initializeCanvas(): void {
    this.canvas = document.querySelector("#gameCanvas") as HTMLCanvasElement;
    // this.canvas.style.cursor = 'pointer';
    this.canvas.className = "";
    this.ctx = this.canvas.getContext("2d")!;
    this._setDrawingArea();
    this._drawLines();
  }

  private _setDrawingArea(): void {
    // drawing area for height and width in canvas
    const canvasHeight = this.CANVAS_DRAWING_SIZE;
    // setting height and width as same
    // because to make canvas 1x1
    this.ctx.canvas.height = canvasHeight;
    this.ctx.canvas.width = canvasHeight;
    // setting line color
    this.ctx.strokeStyle = "#bebebe";
  }

  private _drawLines(): void {
    const size = this.CANVAS_DRAWING_SIZE;
    this.ctx.lineWidth = 2;
    // drawing horizontal lines code start
    // draw 1st horizontal line
    this.ctx.beginPath();
    this.ctx.moveTo(0, 100); //start point of line
    this.ctx.lineTo(size, 100); //end point of line
    // draw 2st horizontal line
    this.ctx.moveTo(0, 200);
    this.ctx.lineTo(size, 200);
    // drawing horizontal lines code end

    // drawing vertical lines code start
    // draw 1st vertical line
    this.ctx.moveTo(100, 0);
    this.ctx.lineTo(100, size);
    // draw 2st vertical line
    this.ctx.moveTo(200, 0);
    this.ctx.lineTo(200, size);
    // drawing vertical lines code end
    this.ctx.stroke();
  }

  markSymbol(row: number, column: number, value: BoardSymbol): void {
    if (value == "x") {
      this._drawCrossInCanvas(row, column);
      return;
    }
    this._drawCircleInCanvas(row, column);
  }

  getBoxCoordinate(event: MouseEvent): {
    row: number;
    column: number;
  } {
    let rect = this.canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    return this._getBoxCoordinate(x, y, this.canvas.offsetHeight);
  }

  private _getBoxCoordinate(
    x: number,
    y: number,
    canvasHeight: number
  ): { row: number; column: number } {
    const boxSize = canvasHeight / 3;
    // get row number
    const row = this._getBoxNumber(y, boxSize);
    // get column number
    const column = this._getBoxNumber(x, boxSize);
    return { row, column };
  }

  // will return box number base on whats provided
  // if y coordinate is provided will return row number
  // if x coordinate is provided will return column number
  private _getBoxNumber(point: number, boxSize: number): number {
    if (point < boxSize) return 1;
    if (point < 2 * boxSize) return 2;
    return 3;
  }

  private _drawCrossInCanvas(x: number, y: number): void {
    var context: CanvasRenderingContext2D = this.ctx;
    context.beginPath();
    context.lineWidth = 2.7;
    const padding = 20;
    context.moveTo((y - 1) * 100 + padding, (x - 1) * 100 + padding);
    context.lineTo(y * 100 - padding, x * 100 - padding);
    context.moveTo(y * 100 - padding, (x - 1) * 100 + padding);
    context.lineTo((y - 1) * 100 + padding, x * 100 - padding);
    context.stroke();
  }

  private _drawCircleInCanvas(x: number, y: number): void {
    this.ctx.lineWidth = 2.7;
    this.ctx.beginPath();
    // (y-1) & (x-1) is for start point like (0,0), (100, 100) & (100,200)
    // + 50 is to start drawing from center of box
    const xPoint = (y - 1) * 100 + 50 - 1; // -1 is just for visual difference
    const yPoint = (x - 1) * 100 + 50 - 1; // -1 is just for visual difference
    const startAngle = 0;
    const endAngle = 360;
    const radius = 35;
    this.ctx.arc(xPoint, yPoint, radius, startAngle, endAngle);
    this.ctx.stroke();
  }

  strokeLine(row?: number, column?: number, daigonal?: number): void {
    this.ctx.lineWidth = 7;
    this.ctx.lineCap = "round";
    this.ctx.strokeStyle = "rgba(68,68,68,0.7)";
    if (row) return this._drawVerticalStroke(row);
    if (column) return this._drawHorizontalStroke(column);
    if (daigonal) return this._drawDaigonalStroke(daigonal == 1);
  }

  private _drawHorizontalStroke(column: number): void {
    const context = this.ctx;
    const x = 50 + (column - 1) * 100;
    const padding = 10;
    context.beginPath();
    context.moveTo(x, 0 + padding);
    context.lineTo(x, this.CANVAS_DRAWING_SIZE - padding);
    context.stroke();
  }

  private _drawVerticalStroke(row: number): void {
    const context = this.ctx;
    const y = 50 + (row - 1) * 100;
    const padding = 10;
    context.beginPath();
    context.moveTo(0 + padding, y);
    context.lineTo(this.CANVAS_DRAWING_SIZE - padding, y);
    context.stroke();
  }

  private _drawDaigonalStroke(left: boolean): void {
    const context = this.ctx;
    const padding = 10;
    context.beginPath();
    context.moveTo(left ? 0 + padding : 300 - padding, 0 + padding);
    context.lineTo(left ? 300 - padding : 0 + padding, 300 - padding);
    context.stroke();
  }
}
