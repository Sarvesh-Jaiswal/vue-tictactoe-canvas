import { BoardSymbol } from "../types";

export class Player {
  name: string;
  symbol: BoardSymbol;

  constructor(name: string, symbol: BoardSymbol) {
    this.name = name;
    this.symbol = symbol;
  }
}
