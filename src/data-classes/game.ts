import { Board } from "./board";
import { Player } from "./player";
import { BoardSymbol, BoardValue } from "./../types/index";
export class Game {
  player1: Player = new Player("PLAYER 1", "x");
  player2: Player = new Player("PLAYER 2", "o");
  currentPlayer: Player = this.player1;
  wonPlayer?: Player;
  board: Board = new Board();

  switchCurrentPlayer(): void {
    const isCurrentPlayerP1: boolean = this.currentPlayer == this.player1;
    this.currentPlayer = isCurrentPlayerP1 ? this.player2 : this.player1;
  }

  markSymbol(x: number, y: number): BoardValue {
    // if (this.isGameOver()) return;
    const row = x - 1;
    const column = y - 1;
    if (this.board.getPositionValue(row, column)) return;
    this.board.setPositionValue(row, column, this.currentPlayer.symbol);
    const symbolMarked: BoardSymbol = this.currentPlayer.symbol;
    this.checkWonPlayer();
    this.switchCurrentPlayer();
    return symbolMarked;
  }

  checkWonPlayer(): boolean {
    if (this.rowStroked || this.columnStroked || this.daigonalStroked)
    {
      this.wonPlayer = this.currentPlayer
      return true;
    }
    return false;
  }


  public get daigonalStroked(): number | undefined {
    return this.board.strokedDaigonal;
  } 

  public get rowStroked(): number | undefined {
    return this.board.strokedRow;
  }

  public get columnStroked(): number | undefined  {
    return this.board.strokedColumn;
  }

  public get isBoardFull(): boolean {
    return this.board.isBoardFull;
  }
}
