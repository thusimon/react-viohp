// the line string should contain label at the beginning
/**
 * notes should be an array
 * [
 *   {0: {}, 1: {}, 2： {}}
 * ]
 *
*/
import {SymbolType as Sym} from '../../music-editor/types'

export const ConvertNotesToText = (notes) => {
  const allNotesStr = notes.map(noteLine=>{
    const noteLineStr = noteLine.map(note=>{
      note = note||{};
      return JSON.stringify(note, null, '  ');
    }).join(',');
    return '[' + noteLineStr + ']';
  }).join(',\n');
  return `[\n${allNotesStr}\n]`;
};

/**
 * ((w|h|q|e|s)|(R))|(r(w|h|q|e|s))|(|)
 * (f|s|n).
 * example hR f. => half reverse flat augment
 * @param {string} symText 
 */
const ConvertTextToSym = (symText) => {
  const noteSym: {
    type: Sym
    desc?: any
    pitch?: string
  } = {
    type: Sym.NOTE_WHOLE
  };

  if (!symText) {
    return noteSym;
  }
  const symTextSplit = symText.split(' ');
  const [symTypeText, descriptorText] = symTextSplit;
  let symType = null;
  switch (symTypeText) {
    case 'w':
      symType = Sym.NOTE_WHOLE;
      break;
    case 'h':
      symType = Sym.NOTE_HALF;
      break;
    case 'Rh':
      symType = Sym.NOTE_HALF_REVERSE;
      break;
    case 'q':
      symType = Sym.NOTE_QUARTER;
      break;
    case 'Rq':
      symType = Sym.NOTE_QUARTER_REVERSE;
      break;
    case 'e':
      symType = Sym.NOTE_EIGHTH;
      break;
    case 'Re':
      symType = Sym.NOTE_EIGHTH_REVERSE;
      break;
    case '|':
      symType = Sym.BAR;
      break;
    case 'rw':
      symType = Sym.WHOLEREST;
      break;
    case 'rh':
      symType = Sym.HALFREST;
      break;
    case 'rq':
      symType = Sym.QUARTERREST;
      break;
    case 're':
      symType = Sym.EIGTHREST;
      break;
    default:
      break;
  }
  noteSym.type = symType;
  if (descriptorText) {
    let desc: {
      augment?: boolean,
      scale?: Sym
    } = {};
    if (descriptorText.includes('.')){
      desc.augment = true;
    } else if (descriptorText.includes('f')){
      desc.scale=Sym.FLAT;
    } else if (descriptorText.includes('s')){
      desc.scale=Sym.SHARP;
    } else if (descriptorText.includes('n')){
      desc.scale=Sym.NATURAL;
    }
    noteSym.desc = desc;
  }
  return noteSym;
};

export const ConvertTextToNote = (noteText) => {
  if (!noteText) {
    return {};
  }
  noteText = noteText.trim();
  const [noteSym, pitch] = noteText.split(',');
  const note = ConvertTextToSym(noteSym);
  note.pitch = pitch || 'A4';
  return note;
};
/**
 * @param {string} text 
 * noteLine: [<sym type>, <pitch name>, <x>;]
 * qR, A3, 20: A quarter note with Flat scale, augment, and reversed symbol, pitch name is A3, x position is 20
 */
export const ConvertTextToNotes = (text) => {
  let notesArr;
  try {
    notesArr = eval(text);
    return notesArr;
  } catch (e){
    throw {name: 'NOTE_EVAL_ERROR', message: e.message};
  }
};
