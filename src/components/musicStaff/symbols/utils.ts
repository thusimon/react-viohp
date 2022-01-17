import {Descriptor, SymbolType} from '../types';
import SymbolSVG from './symbol-svg';

export const isSymbolNote = (type: SymbolType): boolean => {
  return type <= SymbolType.NOTE_EIGHTH_REVERSE;
}

export const isSymbolNoteUp = (type: SymbolType): boolean => {
  return type <= SymbolType.NOTE_EIGHTH;
}

export const isSymbolNoteReverse = (type: SymbolType): boolean => {
  return type > SymbolType.NOTE_EIGHTH && type <= SymbolType.NOTE_EIGHTH_REVERSE;
}

export const getTimeoutFromSymbolType = (type: SymbolType, desc: Descriptor, baseTime: number) => {
  let time = baseTime;
  switch (type) {
    case SymbolType.NOTE_HALF:
    case SymbolType.NOTE_HALF_REVERSE:
    case SymbolType.HALFREST:
      time = baseTime * 4;
      break;
    case SymbolType.NOTE_QUARTER:
    case SymbolType.NOTE_QUARTER_REVERSE:
    case SymbolType.QUARTERREST:
      time = baseTime * 2;
      break;
    case SymbolType.NOTE_EIGHTH:
    case SymbolType.NOTE_EIGHTH_REVERSE:
    case SymbolType.EIGTHREST:
    default:
      time = baseTime;
  }
  if (desc && desc.augment) {
    time += time/2;
  }
  return time;
};