import {ScoreSymbol, SymbolType} from '../types';

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
