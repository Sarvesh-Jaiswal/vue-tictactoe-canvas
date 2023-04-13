export type BoardSymbol = "x" | "o";
export type BoardValue = BoardSymbol | undefined;

export type BoxCoordinate = { row: number; column: number };

type StrokedRow = '1stRow' | '2ndRow' | '3rdRow';

// type Horizont

export type StrokedLine = StrokedRow;