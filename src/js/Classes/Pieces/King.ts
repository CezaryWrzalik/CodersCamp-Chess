import { doMove } from '~/Interfaces/doMove';
import { BoardWithPieces, Color, KING, KNIGHT, ROOK } from '~/Types/Types';
import { Square } from '../Square';
import { Piece } from './Piece';
import { Translation } from '../../Types/Types';

export class King extends Piece implements doMove {
  moved;

  constructor(color: Color, position: Square, picture: KING) {
    super(color, position, Translation.King);
    this.moved = false;
    this.picture = picture
  }
  possibleMoves(game: BoardWithPieces, position: Square): Square[] {
    const vectors: [number, number][] = [
      [1, 1],
      [-1, 1],
      [1, -1],
      [0, 1],
      [0, -1],
      [-1, 0],
      [1, 0],
      [-1, -1],
    ];
    let result: Square[] = [];
    vectors.forEach((elem) => {
      this.vectorMove(elem[0], elem[1], position, game, result, false);
    });
    const castle = this.possibleCastle(game, position);
    result = castle ? result.concat(castle) : result;
    return result;
  }

  possibleCastle(game: BoardWithPieces, position: Square): Square[] {
    let solution: Square[] = [];
    const positions =
        this.side === Color.WHITE
          ? ['A1', 'B1', 'C1', 'D1', 'E1', 'F1', 'G1', 'H1']
          : ['A8', 'B8', 'C8', 'D8', 'E8', 'F8', 'G8', 'H8'];
    if (!this.moved && (game[positions[0]] || game[positions[7]])) {
      if (!game[positions[0]]?.moved && !game[positions[1]] && !game[positions[2]] && game[positions[3]]) {
        solution.push(position.getMovedCopy(position, 0, -2));
      }
      if (
        game[positions[3]] &&
        !game[positions[4]] &&
        !game[positions[5]] &&
        !game[positions[6]] &&
        !game[positions[7]]?.moved
      ) {
        solution.push(position.getMovedCopy(position, 0, 2));
      }
    }
    return solution;
  }
}
