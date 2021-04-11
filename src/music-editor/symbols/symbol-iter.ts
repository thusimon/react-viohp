import SymbolSVG from './symbol-svg';
import {IteratorResponse, SymbolType} from '../types';

class SymbolIterator {
  notes: SymbolSVG[][];
  row: number;
  col: number;
  state: number;
  iter: Generator<IteratorResponse, boolean>;
  constructor(notes: SymbolSVG[][], state=0) {
    this.notes = notes;
    this.row = 0;
    this.col = 0;
    this.state = state;
    this.iter = this.symIter();
  }
  setState(state: number) {
    this.state = state;
  }
  *symIter(): Generator<IteratorResponse, boolean> {
    while(this.row < this.notes.length) {
      const curRow = this.notes[this.row];
      while(this.col < curRow.length) {
        const curNote = this.notes[this.row][this.col];
        if (curNote.type == SymbolType.BAR) {
          this.col++;
          continue;
        }
        yield {symbol: curNote, row: this.row, col: this.col};
        // decide col step;
        let colStep;
        if (this.state == 1) {
          // play normal
          colStep = 1;
        } else if (this.state == 2) {
          // forward
          colStep = 0;
          this.col = 0;
          this.row++;
        } else if (this.state == -2) {
          // rewind
          colStep = 0;
          this.col = 0;
          this.row = this.row - 1 >= 0 ? this.row - 1 : 0;
        } else {
          colStep = 0;
        }
        this.col += colStep;
      }
      this.col = 0;
      this.row++;
    }
    return false;
  }
}

export default SymbolIterator;
