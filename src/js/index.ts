import { Game } from './Classes/Game';
import { Piece } from './Classes/Pieces/Piece';
import { Square } from './Classes/Square';
import { Controler } from './Display';
import { BoardWithPieces, Color, Column, PAWN, Row } from './Types/Types';
import { History } from './History';

const game: Game = new Game();
const history: History = new History();
const controler = new Controler(game, history);

const start = document.getElementById('start')!;
start.addEventListener('click', () => {
  controler.reloadGame();
  controler.renderGame();
})

const x = document.getElementById('button');
x.addEventListener('click', () => {
  if (game.turn === Color.WHITE) {
    game.turn = Color.BLACK;
  } else {
    game.turn = Color.WHITE;
  }
});
