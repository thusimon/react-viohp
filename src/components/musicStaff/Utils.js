/**
 * Created by Lu on 8/15/2018.
 */
import * as Constant from './Constants';

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
  // filter the full scale, get the notes sfIdx from -6 to 14
  let filteredFullScale = filterFullScale(-7, 15);
  let scaleIndex = filteredFullScale.findIndex(notes => {
    return notes.map(note => note.name).includes(scale);
  });
  let res = [], i=0, intervalLen = intervals.length;
  let firstNote = filteredFullScale[scaleIndex].filter(note => note.name==scale);
  res.push(firstNote[0]);
  while (scaleIndex + intervals[i] < filteredFullScale.length){
    scaleIndex += intervals[i];
    let notes=filteredFullScale[scaleIndex];
    // we should find the note whose sfIdx is different from the previous one
    let curNoteSfIdx = res[i].sfIdx;
    let differentSfIdxNote = notes.length>1 ?
      notes.filter(note => note.sfIdx!=curNoteSfIdx) :
      notes;
    res.push(differentSfIdxNote[0]);
    i = (++i)%intervalLen;
  }
  return res;
};

/**
 * map the full extended scales to violin board
 * for example position 1: lowest note 3G=>sfIdx=13, highest 5B=>sfIdx=-3
 * TODO should extend to other positions
 * @param range
 * return a two dimensional array
 */
export const generateVirtualBoardNotes = (minSfIdx, maxSfIdx, markNotes=[]) =>{
  let fullNotes = filterFullScale(minSfIdx, maxSfIdx);

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
