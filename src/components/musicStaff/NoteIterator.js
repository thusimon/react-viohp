import * as Symbols from './Symbols';

const getNoteIterator = function(notes) {
  this.notes = notes;
  this.row = 0;
  this.col = 0;
  this.getNextNoteInfo = function* () {
    while(this.row<this.notes.length) {
      const curRow = this.notes[this.row];
      while(this.col<curRow.length) {
        const curNote = this.notes[this.row][this.col];
        if (curNote.type == Symbols.BARLINE_TYPE) {
          this.col++;
          continue;
        }
        yield {note: curNote, row: this.row, col: this.col};
        this.col++;
      }
      this.col = 0;
      this.row++;
    }
  };
  this.resetIdx = function(){
    this.row = 0;
    this.col = 0;
  };
};

export default getNoteIterator;