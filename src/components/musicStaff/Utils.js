/**
 * Created by Lu on 8/15/2018.
 */
import * as Constant from './Constants';
import * as Symbols from './Symbols';

export const noteShift = (note, offSet) => {

};
//return notes from lowest to highest
export const getExtendScales = (srcScale=Constant.SCALE_INTERVAL,range=[1,0]) => {
  let result = [];
  range.forEach(idx => {
    let shiftOffSet = idx * 7;
    let shiftedScale = srcScale.map(scale => {
      return scale.map(note => {
        let newNote = Object.assign({}, note);
        newNote.sfIdx += shiftOffSet;
        return newNote;
      });
    });
    result  = result.concat(shiftedScale);
  });
  return result;
};

export const FULL_SCALE = getExtendScales(Constant.SCALE_INTERVAL, [2,1,0,-1]);
export const getAllScaleNames = ()=>{
  let scaleNames = [];
  for (let noteKey in Constant.Notes) {
    let note = Constant.Notes[noteKey];
    scaleNames.push({value: noteKey, text:note.label});
  }
  return scaleNames;
};

export const getAllSignatureNames = ()=>{
  return Constant.SIGNATURES.map(signature =>
    ({value:signature.name, text:signature.name}));
};

export const filterFullScale = (minSfIdx, maxSfIdx) => {
  return FULL_SCALE.filter(notes => {
    let sfIdxes = notes.map(note => note.sfIdx);
    let maxsfIdx = Math.max(...sfIdxes);
    let minsfIdx = Math.min(...sfIdxes);
    return maxsfIdx<=maxSfIdx && minsfIdx>=minSfIdx;
  });
};
/**
 * @param signature, can only be Major or Minor
 * @param scale
 */

export const getSetOfNoteFromSignatureScale = (signature, scale) => {
  const intervals = signature == 'Major' ? Constant.MajorInterval : Constant.MinorInterval;
  const intervalsR = signature == 'Major' ? Constant.MajorIntervalR : Constant.MinorIntervalR;

  // find the first note that matches the scale
  let scaleIndex = Constant.SCALE_FULL.findIndex(notes=>{
      return notes.map(note=>note.scale).includes(scale)
    });
  let res = [], i=0, intervalLen = intervals.length;
  let firstNote = Constant.SCALE_FULL[scaleIndex].filter(note=>note.scale==scale);
  res.push(firstNote[0]);
  // traverse the Constant.NotesFullArr to get the notes that matches the signature and scale
  let nextIdx = scaleIndex;
  let NotesFullArrLen = Constant.SCALE_FULL.length;
  while (nextIdx+intervals[i]<NotesFullArrLen){
    nextIdx += intervals[i];
    let notes = Constant.SCALE_FULL[nextIdx];
    // we should find the note whose sfIdx is different from the previous one
    let curNoteSfIdx = res[i].sfIdx;
    let differentSfIdxNote = notes.length>1 ?
      notes.filter(note => note.sfIdx!=curNoteSfIdx) :
      notes;
    res.push(differentSfIdxNote[0]);
    i = (++i)%intervalLen;
  }
  // should trace back to add notes
  nextIdx = scaleIndex, i=0;
  while (nextIdx-intervalsR[i]>=0){
    nextIdx -= intervalsR[i];
    let notes = Constant.SCALE_FULL[nextIdx];
    // we should find the note whose sfIdx is different from the previous one
    let curNoteSfIdx = res[0].sfIdx;
    let differentSfIdxNote = notes.length>1 ?
      notes.filter(note => note.sfIdx!=curNoteSfIdx) :
      notes;
    res.unshift(differentSfIdxNote[0]);
    i = (++i)%intervalLen;
  }
  return res;
};

export const convertNotesArrToNotesMap=(notesArr)=>{
  let res={};
  for(let i=0;i<notesArr.length;i++){
    res[i]=notesArr[i];
  }
  return res;
};

export const getNoteFromPosition = (scaleNoteFull, sfIdx)=>{
  let noteBySfIdx = scaleNoteFull.filter(note=>note.sfIdx == sfIdx);
  // only use the first found
  return noteBySfIdx[0];
};

/**
 * map the full extended scales to violin board
 * for example position 1: lowest note 3G=>sfIdx=13, highest 5B=>sfIdx=-3
 * TODO should extend to other positions
 * @param range
 * return a two dimensional array
 */
export const generateVirtualBoardNotes = (markNotes=[]) =>{
  let fullNotes = Constant.SCALE_FULL;

  let allStringNotes = [], startIdx = 0;
  // each string at a position will have 8 notes
  let stringNotesLen = 8;
  for (let i=0; i<4; i++){
    let stringNotes = fullNotes.slice(startIdx, startIdx+stringNotesLen);
    allStringNotes.push(stringNotes);
    startIdx += stringNotesLen;
    startIdx--;
  }
  // the result would be 8*4 array
  return allStringNotes;
};

/**
 * @param notesFullArr, should be an array of notes with freq in ascending order
 * @param queryFreq
 */
export const getSFIdxFromFreq = (notesFullArr, queryFreq) => {
  // find the first index that the freq is greater than the query freq
  let smallestSFIdx = notesFullArr[0].sfIdx;
  let noteIdx = notesFullArr.findIndex(note=>note.freq>=queryFreq);
  if (noteIdx<=0){
    return smallestSFIdx;
  } else {
    let curNote = notesFullArr[noteIdx];
    let preNote = notesFullArr[noteIdx-1];
    let curNSfIdx = curNote.sfIdx, curNFreq = curNote.freq;
    let preNSfIdx = preNote.sfIdx, preNFreq = preNote.freq;
    // liner interpolate
    if (Math.abs(queryFreq-curNFreq)<=0.01){
      return curNSfIdx;
    }
    let t = (queryFreq-preNFreq)/(curNFreq-queryFreq);
    return (t*curNSfIdx+preNSfIdx)/(1+t);
  }

};

export const updateMarkNote = (currMarkNotes, markNote) => {
  // markNote: {name:'C', sfIdx:3, mark: true}
  if (markNote.mark){
    // we should add this mark note to curMarkNotes array
    currMarkNotes.push(markNote);
  } else {
    // we should filter those markNotes in currMarkNotes
    currMarkNotes = currMarkNotes.filter(note => {
      return !(note.name==markNote.name && note.sfIdx==markNote.sfIdx);
    });
  }
  return currMarkNotes;
};

export const getSvgClassName = (noteName)=>{
  let svgClassName="note_2th_flip";
  switch(noteName){
    case Symbols.NOTE_WHOLE_TYPE:
      svgClassName = "note_circle";
      break;
    case Symbols.NOTE_CIRCLE:
      svgClassName = 'note-circle';
      break;
    case Symbols.NOTE_HEAD_EMPTY:
      svgClassName = 'note-head-empty';
      break;
      case Symbols.NOTE_HEAD_FILL:
      svgClassName = 'note-head-fill';
      break;
    case Symbols.NOTE_POLE:
      svgClassName = 'note-pole';
      break;
    case Symbols.NOTE_TAIL:
      svgClassName = 'note-tail';
      break;
    case Symbols.NOTE_TAIL_REVERSE:
      svgClassName = 'note-tail-reverse';
      break;
    case Symbols.NOTE_HALF2:
      svgClassName = 'note-half';
      break;
    case Symbols.NOTE_HALF_REVERSE:
      svgClassName = 'note-half-reverse';
      break;
    case Symbols.NOTE_QUARTER2:
      svgClassName = 'note-quarter';
      break;
    case Symbols.NOTE_QUARTER_REVERSE:
      svgClassName = 'note-quarter-reverse';
      break;
    case Symbols.NOTE_EIGHTH2:
      svgClassName = 'note-eighth'
      break;
    case Symbols.NOTE_EIGHTH_REVERSE:
      svgClassName = 'note-eighth-reverse';
      break;
    case Symbols.NOTE_HALF_TYPE:
      svgClassName="note_2th_flip";
      break;
    case Symbols.NOTE_QUARTER_TYPE:
      svgClassName="note_4th_flip";
      break;
    case Symbols.NOTE_EIGHTH_TYPE:
      svgClassName="note_8th_flip";
      break;
    case Symbols.NOTE_SIXTEENTH_TYPE:
      svgClassName="note_16th_flip";
      break;
    case Symbols.NOTE_THIRTYSECOND_TYPE:
      svgClassName="note_32th_flip";
      break;
    default:
      break;
  }
  return svgClassName;
}