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

export const waitTime = async (time: number) => {
  return new Promise((resolve, reject) => {
    let wait = setTimeout(() => {
      clearTimeout(wait);
      resolve('time up');
    }, time)
  });
}

export const getFreqLineXIncStep = (sym1: SymbolSVG, sym2: SymbolSVG, audioSampleInterval: number) => {
  return (sym1.x-sym2.x) / (sym1.timeout / audioSampleInterval);
}

export const getFreqLineYVal = (baseSym: SymbolSVG, freq: number) => {
  // TODO: need interplation, now just use a linear one
  return baseSym.sfIdx * 20 + (baseSym.freq - freq); 
}

export const generateStaffFreqLineD = (audioArr: number[], baseY: number, xStep: number) => {
  let d = 'M 0 0 '
  
}
