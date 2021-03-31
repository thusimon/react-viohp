import {SymbolType} from '../types';

export const isSymbolNote = (type: SymbolType): boolean => {
  return type <= SymbolType.NOTE_EIGHTH_REVERSE;
}

export const isSymbolNoteUp = (type: SymbolType): boolean => {
  return type <= SymbolType.NOTE_EIGHTH;
}

export const isSymbolNoteReverse = (type: SymbolType): boolean => {
  return type > SymbolType.NOTE_EIGHTH && type <= SymbolType.NOTE_EIGHTH_REVERSE;
}
