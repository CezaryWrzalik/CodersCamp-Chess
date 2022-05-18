import { Square } from "./Classes/Square";
import { Column, Row } from "./Types/Types";

export const convertIdToPiece = (id: string) => {
  const x = parseInt(id[1]);
  return new Square(parseInt(id[1]) as Row, Column[id[0]]);
};
