// the line string should contain label at the beginning
/**
 * notes should be an array
 * [
 *   {0: {}, 1: {}, 2： {}}
 * ]
 *
*/
import * as Sym from '../../components/musicStaff/Symbols';

export const ConvertNotesToText = (notes) => {

  return notes.map(noteLine=>{
    return Object.values(noteLine).join(';');
  }).join(`
`);
};

/**
 * ((w|h|q|e|s)|(R))|(r(w|h|q|e|s))|(|)
 * (f|s|n).
 * example hR f. => half reverse flat augment
 * @param {string} symText 
 */
const ConvertTextToSym = (symText) => {
  const noteSym = {};
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
      symType = Sym.BARLINE_TYPE;
      break;
    case 'rw':
      symType = Sym.WHOLEREST_TYPE;
      break;
    case 'rh':
      symType = Sym.HALFREST_TYPE;
      break;
    case 'rq':
      symType = Sym.QUARTERREST_TYPE;
      break;
    case 're':
      symType = Sym.EIGTHREST_TYPE;
      break;
    default:
      break;
  }
  noteSym.type = symType;
  if (descriptorText) {
    let descriptor = {};
    if (descriptorText.includes('.')){
      descriptor.augment = true;
    } else if (descriptorText.includes('f')){
      descriptor.scale=Sym.FLAT_TYPE;
    } else if (descriptorText.includes('s')){
      descriptor.scale=Sym.SHARP_TYPE;
    } else if (descriptorText.includes('n')){
      descriptor.scale=Sym.NATURAL_TYPE;
    }
    noteSym.descriptor = descriptor;
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
  const res = text.split('\n').map(textLine=>{
    if (!textLine) {
      return [];
    } else {
      return textLine.trim().split(';').map(noteRaw => ConvertTextToNote(noteRaw));
    }
  });
  return res;
};
