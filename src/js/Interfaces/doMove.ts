import { BoardWithPieces } from "~/Types/Types";
import {Square} from "../Classes/Square"

export interface doMove{

  possibleMoves(game: BoardWithPieces, position: Square): Square[]
}
