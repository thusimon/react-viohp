import {ScoreSymbol, SymbolType, ScoreType, IteratorResponse, AudioFreqData, NoteType} from '../types';
import SymbolSVG from '../symbols/symbol-svg';
import {STAFF_SCALES_HEAD} from '../staffData/staff-data';

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

export const getFreqLineXInc = (sym1: SymbolSVG, sym2: SymbolSVG, audioSampleInterval: number) => {
  return (sym2.x-sym1.x) / (sym1.timeout / audioSampleInterval);
}

export const getFreqLineYVal = (notesFullScale: NoteType[], freq: number) => {
  // do an interpolation on full scale notes
  const upperIdx = notesFullScale.findIndex(note => note.freq >= freq);
  const lowerIdx = upperIdx == 0 ? 0 : upperIdx - 1;
  const upperNote = notesFullScale[upperIdx];
  const lowerNote = notesFullScale[lowerIdx];
  // sfIdx = -6 -> y = 0
  // sfIdx = 14 -> y = 200
  const upperY = upperNote.sfIdx * 10 + 60; // frequency higher
  const lowerY = lowerNote.sfIdx * 10 + 60; // frequency lower
  return 
  return 1;
}

export const generateStaffFreqLineD = (audioData: AudioFreqData[]) => {
  return audioData.reduce((accumulator, currentValue) => {
    const currentY = currentValue.y;
    const currentXInc = currentValue.xInc;
    const lastYIdx = accumulator.lastIndexOf(' ', accumulator.length - 2);
    const lastXIdx = accumulator.lastIndexOf(' ', lastYIdx - 1);
    const lastX = parseFloat(accumulator.slice(lastXIdx+1, lastYIdx));
    const lineToAdd = `L ${lastX + currentXInc} ${currentY} `;
    return accumulator + lineToAdd;
  }, 'M 0 0 ')
}
