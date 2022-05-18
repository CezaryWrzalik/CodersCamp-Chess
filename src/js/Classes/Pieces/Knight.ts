import { doMove } from '~/Interfaces/doMove';
import { BoardWithPieces, Color, KNIGHT, ROOK } from '~/Types/Types';
import { Square } from '../Square';
import { Piece } from './Piece';
import { Translation } from '../../Types/Types';

export class Knight extends Piece implements doMove {
  moved;

  constructor(color: Color, position: Square, picture: KNIGHT) {
    super(color, position, Translation.Knight);
    this.moved = false;
    this.picture = picture
  }

  possibleMoves(game: BoardWithPieces, position: Square): Square[] {
    const vectors: [number, number][] = [
      [2, 1],
      [1, 2],
      [2, -1],
      [1, -2],
      [-2, -1],
      [-2, 1],
      [-1, -2],
      [-1, 2],
    ];
    let result: Square[] = [];
    vectors.forEach((elem) => {
      const move = this.vectorMove(elem[0], elem[1], position, game, result, false);
      if (move) {
        result = result ? result.concat(move) : move;
      }
    });
    return result;
  }
}
