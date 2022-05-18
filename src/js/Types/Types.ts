import { Piece } from '~/Classes/Pieces/Piece';

export type Row = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export type BoardWithPieces = { [key: string]: Piece };

export enum Column {
  'wypełniacz',
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
}
export enum Color {
  WHITE = 'BIAŁE',
  BLACK = 'CZARNE',
}

export enum PAWN {
  'WHITE' = './images/pieces/white/pawn.png',
  'BLACK' = './images/pieces/black/pawn.png',
}
export enum ROOK {
  'WHITE' = './images/pieces/white/rook.png',
  'BLACK' = './images/pieces/black/rook.png',
}
export enum KNIGHT {
  'WHITE' = './images/pieces/white/knight.png',
  'BLACK' = './images/pieces/black/knight.png',
}
export enum BISHOP {
  'WHITE' = './images/pieces/white/bishop.png',
  'BLACK' = './images/pieces/black/bishop.png',
}
export enum QUEEN {
  'WHITE' = './images/pieces/white/queen.png',
  'BLACK' = './images/pieces/black/queen.png',
}
export enum KING {
  'WHITE' = './images/pieces/white/king.png',
  'BLACK' = './images/pieces/black/king.png',
}

export const BOARD_SIZE = 8;

export enum Translation {
  Rook = 'WIEŻA',
  Pawn = 'PION',
  Bishop = 'GONIEC',
  King = 'KRÓL',
  Knight = 'SKOCZEK',
  Queen = 'HETMAN',
}
