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

export const FULL_SCALE = getExtendScales();

export const getAllScaleNames = ()=>{
  let scaleNames = [];
  for (let noteKey in Constant.Notes) {
    let note = Constant.Notes[noteKey];
    scaleNames.push({value: note.label, text:note.label});
  }
  return scaleNames;
};

export const getAllSignatureNames = ()=>{
  return Constant.SIGNATURES.map(signature =>
    ({value:signature.name, text:signature.name}));
};
/**
 * @param signature, can only be Major or Minor
 * @param scale
 */
export const getSetOfNoteFromSignatureScale = (signature, scale) => {
  const intervals = signature == 'Major' ? Constant.MajorInterval : Constant.MinorInterval;
  let scaleIndex = FULL_SCALE.findIndex(notes => {
    return notes.map(note => note.label).includes(scale);
  });
  let res = [];
  let firstNote = FULL_SCALE[scaleIndex].filter(note => note.label==scale);
  res.push(firstNote[0]);
  for(let i=0; i<intervals.length-1; i++){
    scaleIndex += intervals[i];
    let notes=FULL_SCALE[scaleIndex];
    // we should find the note whose sfIdx is different from the previous one
    let curNoteSfIdx = res[i].sfIdx;
    let differentSfIdxNote = notes.length>1 ?
      notes.filter(note => note.sfIdx!=curNoteSfIdx) :
      notes;
    res.push(differentSfIdxNote[0]);
  }
  return res;
};
