import {SymbolType} from '../types';

export const isSymbolNote = (type: SymbolType): boolean => {
  return type <= SymbolType.NOTE_EIGHTH_REVERSE;
}
