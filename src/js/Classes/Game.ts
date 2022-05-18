import { BISHOP, BoardWithPieces, Color, KING, KNIGHT, PAWN, QUEEN, ROOK } from '~/Types/Types';
import { Bishop } from './Pieces/Bishop';
import { King } from './Pieces/King';
import { Knight } from './Pieces/Knight';
import { Pawn } from './Pieces/Pawn';
import { Piece } from './Pieces/Piece';
import { Queen } from './Pieces/Queen';
import { Rook } from './Pieces/Rook';
import { Square } from './Square';
import { convertIdToPiece } from '../Helpers';

export class Game {
  actualGame: BoardWithPieces;
  turn: Color;
  activePiece;

  constructor() {
    this.actualGame = {
      ['A8']: new Rook(Color.BLACK, new Square(8, 1), ROOK.BLACK),
      ['B8']: new Knight(Color.BLACK, new Square(8, 2), KNIGHT.BLACK),
      ['C8']: new Bishop(Color.BLACK, new Square(8, 3), BISHOP.BLACK),
      ['D8']: new King(Color.BLACK, new Square(8, 4), KING.BLACK),
      ['E8']: new Queen(Color.BLACK, new Square(8, 5), QUEEN.BLACK),
      ['F8']: new Bishop(Color.BLACK, new Square(8, 6), BISHOP.BLACK),
      ['G8']: new Knight(Color.BLACK, new Square(8, 7), KNIGHT.BLACK),
      ['H8']: new Rook(Color.BLACK, new Square(8, 8), ROOK.BLACK),
      ['A7']: new Pawn(Color.BLACK, new Square(7, 1), PAWN.BLACK),
      ['B7']: new Pawn(Color.BLACK, new Square(7, 2), PAWN.BLACK),
      ['C7']: new Pawn(Color.BLACK, new Square(7, 3), PAWN.BLACK),
      ['D7']: new Pawn(Color.BLACK, new Square(7, 4), PAWN.BLACK),
      ['E7']: new Pawn(Color.BLACK, new Square(7, 5), PAWN.BLACK),
      ['F7']: new Pawn(Color.BLACK, new Square(7, 6), PAWN.BLACK),
      ['G7']: new Pawn(Color.BLACK, new Square(7, 7), PAWN.BLACK),
      ['H7']: new Pawn(Color.BLACK, new Square(7, 8), PAWN.BLACK),
      ['A1']: new Rook(Color.WHITE, new Square(1, 1), ROOK.WHITE),
      ['B1']: new Knight(Color.WHITE, new Square(1, 2), KNIGHT.WHITE),
      ['C1']: new Bishop(Color.WHITE, new Square(1, 3), BISHOP.WHITE),
      ['D1']: new King(Color.WHITE, new Square(1, 4), KING.WHITE),
      ['E1']: new Queen(Color.WHITE, new Square(1, 5), QUEEN.WHITE),
      ['F1']: new Bishop(Color.WHITE, new Square(1, 6), BISHOP.WHITE),
      ['G1']: new Knight(Color.WHITE, new Square(1, 7), KNIGHT.WHITE),
      ['H1']: new Rook(Color.WHITE, new Square(1, 8), ROOK.WHITE),
      ['A2']: new Pawn(Color.WHITE, new Square(2, 1), PAWN.WHITE),
      ['B2']: new Pawn(Color.WHITE, new Square(2, 2), PAWN.WHITE),
      ['C2']: new Pawn(Color.WHITE, new Square(2, 3), PAWN.WHITE),
      ['D2']: new Pawn(Color.WHITE, new Square(2, 4), PAWN.WHITE),
      ['E2']: new Pawn(Color.WHITE, new Square(2, 5), PAWN.WHITE),
      ['F2']: new Pawn(Color.WHITE, new Square(2, 6), PAWN.WHITE),
      ['G2']: new Pawn(Color.WHITE, new Square(2, 7), PAWN.WHITE),
      ['H2']: new Pawn(Color.WHITE, new Square(2, 8), PAWN.WHITE),
    };
    this.turn = Color.WHITE;
  }

  getGame = () => {
    return this.actualGame;
  };

  makeMove(newPlace: Square): string[] | string {
    if (this.activePiece instanceof King && this.activePiece.position.column + newPlace.column == 10) {
      const rook = this.turn === Color.BLACK ? ['H8', 'E8'] : ['H1', 'E1'];
      delete this.actualGame[this.activePiece.position.toString()];
      this.activePiece.position = newPlace;
      this.activePiece.moved = true;
      this.actualGame[newPlace.toString()] = this.activePiece;

      var rook2 = this.actualGame[rook[0]];
      delete this.actualGame[rook[0]];
      rook2.position = convertIdToPiece(rook[1]);
      rook2.moved = true;
      this.actualGame[rook[1]] = rook2;
      return 'GREAT CASTLE';
    }
    if (this.activePiece instanceof King && this.activePiece.position.column + newPlace.column == 6) {
      const rook = this.turn === Color.BLACK ? ['A8', 'C8'] : ['A1', 'C1'];
      delete this.actualGame[this.activePiece.position.toString()];
      this.activePiece.position = newPlace;
      this.activePiece.moved = true;
      this.actualGame[newPlace.toString()] = this.activePiece;

      var rook2 = this.actualGame[rook[0]];
      delete this.actualGame[rook[0]];
      rook2.position = convertIdToPiece(rook[1]);
      rook2.moved = true;
      this.actualGame[rook[1]] = rook2;
      return 'SMALL CASTLE';
    }
    let result: string[] = [];
    result.push(this.activePiece.position.toString());

    delete this.actualGame[this.activePiece.position.toString()];
    this.activePiece.position = newPlace;
    this.activePiece.moved = true;
    this.actualGame[newPlace.toString()] = this.activePiece;

    result.push(newPlace.toString());
    return result;
  }

  reloadGame = () => {
    this.actualGame = {
      ['A8']: new Rook(Color.BLACK, new Square(8, 1), ROOK.BLACK),
      ['B8']: new Knight(Color.BLACK, new Square(8, 2), KNIGHT.BLACK),
      ['C8']: new Bishop(Color.BLACK, new Square(8, 3), BISHOP.BLACK),
      ['D8']: new King(Color.BLACK, new Square(8, 4), KING.BLACK),
      ['E8']: new Queen(Color.BLACK, new Square(8, 5), QUEEN.BLACK),
      ['F8']: new Bishop(Color.BLACK, new Square(8, 6), BISHOP.BLACK),
      ['G8']: new Knight(Color.BLACK, new Square(8, 7), KNIGHT.BLACK),
      ['H8']: new Rook(Color.BLACK, new Square(8, 8), ROOK.BLACK),
      ['A7']: new Pawn(Color.BLACK, new Square(7, 1), PAWN.BLACK),
      ['B7']: new Pawn(Color.BLACK, new Square(7, 2), PAWN.BLACK),
      ['C7']: new Pawn(Color.BLACK, new Square(7, 3), PAWN.BLACK),
      ['D7']: new Pawn(Color.BLACK, new Square(7, 4), PAWN.BLACK),
      ['E7']: new Pawn(Color.BLACK, new Square(7, 5), PAWN.BLACK),
      ['F7']: new Pawn(Color.BLACK, new Square(7, 6), PAWN.BLACK),
      ['G7']: new Pawn(Color.BLACK, new Square(7, 7), PAWN.BLACK),
      ['H7']: new Pawn(Color.BLACK, new Square(7, 8), PAWN.BLACK),
      ['A1']: new Rook(Color.WHITE, new Square(1, 1), ROOK.WHITE),
      ['B1']: new Knight(Color.WHITE, new Square(1, 2), KNIGHT.WHITE),
      ['C1']: new Bishop(Color.WHITE, new Square(1, 3), BISHOP.WHITE),
      ['D1']: new King(Color.WHITE, new Square(1, 4), KING.WHITE),
      ['E1']: new Queen(Color.WHITE, new Square(1, 5), QUEEN.WHITE),
      ['F1']: new Bishop(Color.WHITE, new Square(1, 6), BISHOP.WHITE),
      ['G1']: new Knight(Color.WHITE, new Square(1, 7), KNIGHT.WHITE),
      ['H1']: new Rook(Color.WHITE, new Square(1, 8), ROOK.WHITE),
      ['A2']: new Pawn(Color.WHITE, new Square(2, 1), PAWN.WHITE),
      ['B2']: new Pawn(Color.WHITE, new Square(2, 2), PAWN.WHITE),
      ['C2']: new Pawn(Color.WHITE, new Square(2, 3), PAWN.WHITE),
      ['D2']: new Pawn(Color.WHITE, new Square(2, 4), PAWN.WHITE),
      ['E2']: new Pawn(Color.WHITE, new Square(2, 5), PAWN.WHITE),
      ['F2']: new Pawn(Color.WHITE, new Square(2, 6), PAWN.WHITE),
      ['G2']: new Pawn(Color.WHITE, new Square(2, 7), PAWN.WHITE),
      ['H2']: new Pawn(Color.WHITE, new Square(2, 8), PAWN.WHITE),
    };
    this.turn = Color.WHITE;
  };
}
