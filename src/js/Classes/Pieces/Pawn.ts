import { doMove } from '~/Interfaces/doMove';
import { BoardWithPieces, Color, KING, KNIGHT, PAWN, ROOK, Row } from '~/Types/Types';
import { Square } from '../Square';
import { Piece } from './Piece';
import { Translation } from '../../Types/Types';

export class Pawn extends Piece implements doMove {
  constructor(color: Color, position: Square, picture: PAWN) {
    super(color, position, Translation.Pawn);
    this.picture = picture
  }

  possibleMoves(game: BoardWithPieces, position: Square): Square[] {
    let result: Square[] = [];
    if (this.side === Color.BLACK) {
      let x = this.checkPotentialDiagonalMoves(false, game, position);
      result = result ? result.concat(x) : x;
      let y = this.checkVerticalMove(false, game, position);
      result = result ? result.concat(y) : y;
    } else {
      let x = this.checkPotentialDiagonalMoves(true, game, position);
      result = result ? result.concat(x) : x;
      let y = this.checkVerticalMove(true, game, position);
      result = result ? result.concat(y) : y;
    }
    return result;
  }

  checkPotentialDiagonalMoves(upTheBoard: boolean, game: BoardWithPieces, position: Square) :Square[] {
    let result :Square[] = []
    const vec: number = upTheBoard ? 1 : -1;
    const tab = [
      new Square((position.row + vec) as Row, position.column + vec),
      new Square((position.row + vec) as Row, position.column - vec),
    ];
    tab.forEach(elem => {
      const actualPiece = game[elem.toString()]
      if(actualPiece && actualPiece.side != this.side){
        result.push(elem)
      }
    })
    return result
  }

  checkVerticalMove(upTheBoard: boolean, game: BoardWithPieces, position: Square): Square[] {
    let result: Square[] = [];
    const vec = upTheBoard ? 1 : -1;
    const nextPlace = position.getMovedCopy(position, vec, 0);
    if (game[nextPlace.toString()]) {
      return result;
    } else {
      result.push(nextPlace);
      if (!this.moved) {
        const upTwo = nextPlace.getMovedCopy(nextPlace, vec, 0);
        if (!game[upTwo.toString()]) {
          result.push(upTwo);
        }
      }
    }
    return result;
  }
}
