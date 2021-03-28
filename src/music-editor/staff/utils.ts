import {ScoreSymbol, SymbolType, ScoreType} from '../types';
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
