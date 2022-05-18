import { doMove } from '~/Interfaces/doMove';
import { BoardWithPieces, Color, ROOK } from '~/Types/Types';
import { Square } from '../Square';
import { Piece } from './Piece';
import { Translation } from '../../Types/Types';

export class Rook extends Piece implements doMove {
  moved;

  constructor(color: Color, position: Square, picture: ROOK) {
    super(color, position, Translation.Rook);
    this.moved = false;
    this.picture = picture
  }

  possibleMoves(game: BoardWithPieces, position: Square): Square[] {
    let result: Square[] = [];
    result = this.vectorMove(0, 1, position, game, result, true);
    result.concat(this.vectorMove(0, -1, position, game, result, true));
    result.concat(this.vectorMove(1, 0, position, game, result, true));
    result.concat(this.vectorMove(-1, 0, position, game, result, true));
    return result;
  }
}
