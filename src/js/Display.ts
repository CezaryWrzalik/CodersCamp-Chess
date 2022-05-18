import { Game } from './Classes/Game';
import { Piece } from './Classes/Pieces/Piece';
import { Square } from './Classes/Square';
import { Color, Column, Row } from './Types/Types';
import { Translation } from './Types/Types';
import { History } from './History';

export class Controler {
  game: Game;
  history: History;
  started: Boolean;

  constructor(game: Game, history: History) {
    this.game = game;
    this.history = history;
    this.started = false;
  }

  pieceOnClick = (elem: HTMLElement) => {
    let piece: Piece = this.game.actualGame[elem.id];
    if (piece && piece.side === this.game.turn) {
      this.removeMarks(['activeSquare', 'possibleMove']);

      this.game.activePiece = piece;

      let possibleMoves = piece.possibleMoves(this.game.actualGame, piece.position);

      elem.classList.add('activeSquare');

      possibleMoves.forEach((element) => {
        const elem = document.getElementById(element.toString());
        elem.classList.add('possibleMove');
        const self = this;
        elem.addEventListener('click', function () {
          self.changePlaces(this);
        });
      });
    }
  };

  renderPiece = (piece: Piece) => {
    let properPlace = document.getElementById(piece.position.toString());
    let div = document.createElement('div');
    div.classList.add('piece');
    div.classList.add('figure');
    let img = document.createElement('img');
    img.src = piece.picture.toString();
    div.appendChild(img);
    properPlace.appendChild(div);

    const self = this;
    properPlace.addEventListener('click', function () {
      self.pieceOnClick(this);
    });
  };

  removePiece = (piece: Piece) => {
    let properPlace = document.getElementById(piece.position.toString());
    properPlace.removeChild(properPlace.childNodes[0]);
  };

  renderGame = () => {
    const gameNow = this.game.getGame();
    for (let elem in gameNow) {
      this.renderPiece(gameNow[elem]);
    }
    this.started = true;
  };

  reloadGame = () => {
    if(this.started == false) return;
    const gameNow = this.game.getGame();
    for (let elem in gameNow) {
      this.removePiece(gameNow[elem]);
    }
    this.game.reloadGame();
    this.history.dom.innerHTML = '';
  }

  removeMarks = (classes: string[]) => {
    classes.forEach((value) => {
      const appereances = document.getElementsByClassName(value);
      Array.from(appereances).forEach((element) => {
        element.classList.remove(value);
      });
    });
  };

  changePlaces = (elem: HTMLElement): void => {
    if (elem.classList.contains('possibleMove')) {
      let piece: Piece = this.game.actualGame[elem.id];

      let newPlace = piece ? piece.position : this.convertIdToPiece(elem.id);
      const positions = this.game.makeMove(newPlace);

      const pieceName = this.game.actualGame[elem.id].name;
      const pieceColor = this.game.turn;



      if (typeof positions === 'string') {
        this.makeCastle(positions);
      } else {
        this.movePiece(positions[0], positions[1]);
      }
      this.history.newRecord(pieceColor, pieceName, positions);

      this.removeMarks(['activeSquare', 'possibleMove']);
      if (this.game.turn === Color.WHITE) {
        this.game.turn = Color.BLACK;
      } else {
        this.game.turn = Color.WHITE;
      }
    }
  };

  makeCastle = (castleName: String) => {
    const side = this.game.turn === Color.WHITE;
    const kingPlace = side ? ['D1', 'F1', 'B1'] : ['D8', 'F8', 'B8'];
    const smallRookPlace = side ? ['A1','C1'] : ['A8','C8'];
    const bigRookPlace = side ? ['H1', 'E1'] : ['H8','E8'];
    switch (castleName) {
      case 'GREAT CASTLE': {
        this.movePiece(kingPlace[0], kingPlace[1]);
        this.movePiece(bigRookPlace[0], bigRookPlace[1]);
        break;
      }
      case 'SMALL CASTLE': {
        this.movePiece(kingPlace[0], kingPlace[2]);
        this.movePiece(smallRookPlace[0], smallRookPlace[1]);
        break;
      }
    }
  };

  movePiece = (startPlace: string, endPlace: string) => {
    const parent = document.getElementById(startPlace);
    const toRemove = parent.childNodes[0];
    parent.removeChild(toRemove);

    const parent2 = document.getElementById(endPlace);
    const toRemove2 = parent2.childNodes[0];

    if (toRemove2) {
      parent2.removeChild(toRemove2);
    }

    const self = this;
    parent2.appendChild(toRemove);
    parent2.addEventListener('click', function () {
      self.pieceOnClick(this);
    });
  };


  convertIdToPiece = (id: string) => {
    const x = parseInt(id[1]);
    return new Square(parseInt(id[1]) as Row, Column[id[0]]);
  };
}
