
import {Row, Column} from "../Types/Types"

export class Square{
    row: Row;
    column: Column;

    constructor (row: Row, column: Column){
        this.row = row;
        this.column = column
    }

    getMovedCopy(position: Square, rowIncrease:number, columnIncrease: number): Square{
      return new Square((position.row + rowIncrease) as Row, position.column + columnIncrease)
    }

    toString = () :string => {
        return Column[this.column]+this.row.toString()
    }
}
