/**
 * Created by Lu on 8/15/2018.
 */
// the scale and interval, this is fixed
// since the notes are periodic, the position is not important
/**
 * the real staff
 * ----- -4 -----
 * ----- -2 -----
 * ⎯⎯⎯⎯⎯  0 ⎯⎯⎯⎯⎯
 * ⎯⎯⎯⎯⎯  2 ⎯⎯⎯⎯⎯
 * ⎯⎯⎯⎯⎯  4 ⎯⎯⎯⎯⎯
 * ⎯⎯⎯⎯⎯  6 ⎯⎯⎯⎯⎯
 * ⎯⎯⎯⎯⎯  8 ⎯⎯⎯⎯⎯
 * ----- 10 -----
 * ----- 12 -----
 */
export const Notes = {
  C : {label:'C',   sfIdx: 3, primary: true,  RF: 0 },
  CR: {label:'C#',  sfIdx: 3, primary: false, RF: 1 },
  DF: {label:'Db',  sfIdx: 2, primary: false, RF: -1},
  D : {label:'D',   sfIdx: 2, primary: true,  RF: 0 },
  DR: {label:'D#',  sfIdx: 2, primary: false, RF: 1 },
  EF: {label:'Eb',  sfIdx: 1, primary: false, RF: -1},
  E : {label:'E',   sfIdx: 1, primary: true,  RF: 0 },
  F : {label:'F',   sfIdx: 0, primary: true,  RF: 0 },
  FR: {label:'F#',  sfIdx: 0, primary: false, RF: 1 },
  GF: {label:'Gb',  sfIdx:-1, primary: false, RF: -1},
  G : {label:'G',   sfIdx:-1, primary: true,  RF: 0 },
  GR: {label:'G#',  sfIdx:-1, primary: false, RF: 1 },
  AF: {label:'Ab',  sfIdx:-2, primary: false, RF: -1},
  A : {label:'A',   sfIdx:-2, primary: true,  RF: 0 },
  AR: {label:'A#',  sfIdx:-2, primary: false, RF: 1 },
  BF: {label:'Bb',  sfIdx:-3, primary: false, RF: -1},
  B : {label:'B',   sfIdx:-3, primary: true,  RF: 0 },
};

export const SCALE_INTERVAL = [
  [Notes.C],
  [Notes.CR, Notes.DF],
  [Notes.D],
  [Notes.DR, Notes.EF],
  [Notes.E],
  [Notes.F],
  [Notes.FR, Notes.GF],
  [Notes.G],
  [Notes.GR, Notes.AF],
  [Notes.A],
  [Notes.AR, Notes.BF],
  [Notes.B]
];

export const SCALE_LEN = SCALE_INTERVAL.length;

export const SIGNATURES = [
  {name:'Major'},
  {name:'Minor'}
];

export const MajorInterval = [2,2,1,2,2,2,1];
export const MinorInterval = [2,1,2,2,1,2,2];


export const noteShift = (note, offSet) => {

};
//return notes from lowest to highest
export const getExtendScales = (srcScale=SCALE_INTERVAL,range=[1,0]) => {
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
  for (let noteKey in Notes) {
    let note = Notes[noteKey];
    scaleNames.push({value: note.label, text:note.label});
  }
  return scaleNames;
};

/**
 * @param signature, can only be Major or Minor
 * @param scale
 */
export const getSetOfNoteFromSignatureScale = (signature, scale) => {
  const intervals = signature == 'Major' ? MajorInterval : MinorInterval;
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
