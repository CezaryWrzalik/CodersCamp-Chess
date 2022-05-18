import { doMove } from '~/Interfaces/doMove';
import { BISHOP, BoardWithPieces, Color } from '~/Types/Types';
import { Square } from '../Square';
import { Piece } from './Piece';
import { Translation } from '../../Types/Types';

export class Bishop extends Piece implements doMove {
  moved;

  constructor(color: Color, position: Square, picture: BISHOP) {
    super(color, position, Translation.Bishop);
    this.moved = false;
    this.picture = picture
  }

  possibleMoves(game: BoardWithPieces, position: Square): Square[] {
    let result: Square[] = [];
    result = this.vectorMove(1, 1, position, game, result, true);
    result.concat(this.vectorMove(-1, -1, position, game, result, true));
    result.concat(this.vectorMove(1, -1, position, game, result, true));
    result.concat(this.vectorMove(-1, 1, position, game, result, true));
    return result;
  }
}
