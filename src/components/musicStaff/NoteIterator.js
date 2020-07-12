import * as Sym from './Symbols';

export const getNoteIterator = function(notes) {
  this.notes = notes;
  this.row = 0;
  this.col = 0;
  this.getNextNoteInfo = function* () {
    while(this.row<this.notes.length) {
      const curRow = this.notes[this.row];
      while(this.col<curRow.length) {
        const curNote = this.notes[this.row][this.col];
        if (curNote.type == Sym.BARLINE_TYPE) {
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

export const getTimeoutFromNoteType = (note, baseTime) => {
  let time = baseTime;
  switch (note.type) {
    case Sym.NOTE_HALF:
    case Sym.NOTE_HALF_REVERSE:
    case Sym.HALFREST_TYPE:
      time = baseTime*4;
      break;
    case Sym.NOTE_QUARTER:
    case Sym.NOTE_QUARTER_REVERSE:
    case Sym.QUARTERREST_TYPE:
      time = baseTime*2;
      break;
    case Sym.NOTE_EIGHTH:
    case Sym.NOTE_EIGHTH_REVERSE:
    case Sym.EIGTHREST_TYPE:
    default:
      time = baseTime;
  }
  if (note.descriptor && note.descriptor.augment) {
    time += time/2;
  }
  return time;
};
