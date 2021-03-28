import {ScoreSymbol, SymbolType, ScoreType, IteratorResponse} from '../types';
import SymbolSVG from '../symbols/symbol-svg';
import {STAFF_SCALES_HEAD} from '../constants';

export const getSymXPosition = (symbols: ScoreSymbol[], startOffSet:number, staffWidth:number): ScoreSymbol[] => {
  let notesLen = symbols.filter(d => d.type != SymbolType.BAR).length;
  notesLen = notesLen > 0 ? notesLen : 1;
  const interval = (staffWidth - startOffSet) * 0.95 / notesLen;
  return symbols.map((sym, idx) => {
    if (sym.type != SymbolType.BAR) {
      sym.x = startOffSet + interval * idx;
    } else {
      const notesBeforeBarIdx = idx - 1 > 0 ? idx - 1 : 0; 
      sym.x = startOffSet + interval * notesBeforeBarIdx + interval / 2;
    }
    return sym;
  });
}

export const getSymsInterval = (symbols: ScoreSymbol[], startOffset:number, endOffset: number, staffWidth:number): number => {
  let notesLen = symbols.filter(d => {
    return d.type != SymbolType.BAR
  }).length - 1;
  notesLen = notesLen > 0 ? notesLen : 1;
  return (staffWidth - startOffset - endOffset) / notesLen;
}

export const getStaffNotesStartOffset = (score: ScoreType): number => {
  const {signature, scale} = score.scoreInfo;
  const scalesHeadLength = STAFF_SCALES_HEAD[signature][scale].length;
  return 100 + scalesHeadLength * 12;
}

export const getNoteIterator = function* (notes: SymbolSVG[][]): Generator<IteratorResponse, boolean> {
  this.notes = notes;
  this.row = 0;
  this.col = 0;
  while(this.row < this.notes.length) {
    const curRow = this.notes[this.row];
    while(this.col < curRow.length) {
      const curNote = this.notes[this.row][this.col];
      if (curNote.type == SymbolType.BAR) {
        this.col++;
        continue;
      }
      yield {symbol: curNote, row: this.row, col: this.col};
      this.col++;
    }
    this.col = 0;
    this.row++;
  }
  return false;
};

export const getTimeoutFromNoteType = (note: SymbolSVG, baseTime: number): number => {
  let time = baseTime;
  switch (note.type) {
    case SymbolType.NOTE_HALF:
    case SymbolType.NOTE_HALF_REVERSE:
    case SymbolType.HALFREST:
      time = baseTime*4;
      break;
    case SymbolType.NOTE_QUARTER:
    case SymbolType.NOTE_QUARTER_REVERSE:
    case SymbolType.QUARTERREST:
      time = baseTime*2;
      break;
    case SymbolType.NOTE_EIGHTH:
    case SymbolType.NOTE_EIGHTH_REVERSE:
    case SymbolType.EIGTHREST:
    default:
      time = baseTime;
  }
  if (note.desc && note.desc.augment) {
    time += time/2;
  }
  return time;
};

export const waitTime = async (time: number) => {
  return new Promise((resolve, reject) => {
    let wait = setTimeout(() => {
      clearTimeout(wait);
      resolve('time up');
    }, time)
  });
}
