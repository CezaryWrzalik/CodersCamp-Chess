import { doMove } from '~/Interfaces/doMove';
import { BISHOP, BoardWithPieces, BOARD_SIZE, Color, Column, Row } from '~/Types/Types';
import { Square } from '../Square';
// import { Bishop } from './Bishop';
import { Translation } from '../../Types/Types';

// columns A-H rows 1-8
export class Piece implements doMove {
  side: Color;
  position: Square;
  moved: boolean;
  picture
  name: Translation[keyof Translation];

  constructor(color: Color, position: Square,  name: Translation[keyof Translation]) {
    this.side = color;
    this.position = position;
    this.moved = false;
    this.name = name;
  }

  vectorMove = (
    row_increase: number,
    column_increase: number,
    actualPosition: Square,
    actualBoard: BoardWithPieces,
    result: Square[],
    repeat: boolean,
  ): Square[] => {
    const nextPlace = new Square((actualPosition.row + row_increase) as Row, actualPosition.column + column_increase);
    if (this.isValid(nextPlace)) {
      if (this.isMyPieceThere(nextPlace, actualBoard)) {
        return result;
      } else {
        result.push(nextPlace);
        if (this.isOpponentPieceThere(nextPlace, actualBoard)) {
          return result;
        } else if (repeat) {
          this.vectorMove(row_increase, column_increase, nextPlace, actualBoard, result, repeat);
        } else {
          return result;
        }
      }
    }

    return result;
  };

  isValid = (place: Square): boolean => {
    return place.row <= BOARD_SIZE && place.row > 0 && place.column <= BOARD_SIZE && place.column > 0;
  };

  isMyPieceThere = (place: Square, actualBoard: BoardWithPieces): boolean => {
    const pieceOnPlace: Piece = actualBoard[place.toString()];
    if (pieceOnPlace) {
      return pieceOnPlace.side === this.side;
    }
  };

  isOpponentPieceThere = (place: Square, actualBoard: BoardWithPieces): boolean => {
    const pieceOnPlace: Piece = actualBoard[place.toString()];
    if (pieceOnPlace) {
      return pieceOnPlace.side != this.side;
    }
  };

  possibleMoves(game: BoardWithPieces, position: Square) {
    return null;
  }
}
