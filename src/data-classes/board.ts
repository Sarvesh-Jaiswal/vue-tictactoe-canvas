import { BoardSymbol, BoxCoordinate } from "./../types/index";
import { BoardValue } from "../types";

export class Board {
  board: BoardValue[][] = [
    [undefined, undefined, undefined],
    [undefined, undefined, undefined],
    [undefined, undefined, undefined],
  ];

  getPositionValue(row: number, column: number): BoardValue {
    return this.board[row][column];
  }

  setPositionValue(row: number, column: number, value: BoardSymbol): void {
    this.board[row][column] = value;
  }

  get isBoardFull(): boolean {
    let returnValue = true;
    this.board.forEach((row: BoardValue[]) => {
      row.forEach((value: BoardValue) => {
        if (!value) returnValue = false;
      });
    });
    return returnValue;
  }

  get strokedRow(): number | undefined {
    for (let row = 1; row <= 3; row++) {
        const value = this.isLineStroke(
          { row, column:1 },
          { row, column:2 },
          { row, column:3 }
        );
      if (value) return row;
    }
    return undefined;
  }

  get strokedColumn(): number | undefined {
    for (let column = 1; column <= 3; column++) {
        const value = this.isLineStroke(
          { row:1, column },
          { row:2, column },
          { row:3, column }
        );
      if (value) return column;
    }
    return undefined;
  }

  get strokedDaigonal(): number | undefined {
    if (this.isDaigonalStroked(true)) return 1;
    if (this.isDaigonalStroked()) return 2;
    return 
  }

  isDaigonalStroked(left?: boolean) {
    const firstBox = {row:1, column: left ? 1: 3};
    const thirdBox = {row:3, column: left ? 3: 1};
    return this.isLineStroke(
      firstBox,
      {row:2, column:2},
      thirdBox)
  }

  isLineStroke(
    firstBox: BoxCoordinate,
    secondBox: BoxCoordinate,
    thirdBox: BoxCoordinate
  ): boolean {
    const board = this.board;
    // -1 because in array length start with 0 rather than 1
    const stroke =
      board[firstBox.row - 1][firstBox.column - 1] != undefined &&
      board[firstBox.row - 1][firstBox.column - 1] ==
        board[secondBox.row - 1][secondBox.column -1 ] &&
      board[secondBox.row - 1][secondBox.column - 1] ==
        board[thirdBox.row - 1][thirdBox.column - 1];
    return stroke;
  }
}
