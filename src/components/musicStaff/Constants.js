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
  C : {label:'C',   sfIdx: 3, primary: true,  SF: 0 },
  CS: {label:'C#',  sfIdx: 3, primary: false, SF: 1 },
  DF: {label:'Db',  sfIdx: 2, primary: false, SF: -1},
  D : {label:'D',   sfIdx: 2, primary: true,  SF: 0 },
  DS: {label:'D#',  sfIdx: 2, primary: false, SF: 1 },
  EF: {label:'Eb',  sfIdx: 1, primary: false, SF: -1},
  E : {label:'E',   sfIdx: 1, primary: true,  SF: 0 },
  F : {label:'F',   sfIdx: 0, primary: true,  SF: 0 },
  FS: {label:'F#',  sfIdx: 0, primary: false, SF: 1 },
  GF: {label:'Gb',  sfIdx:-1, primary: false, SF: -1},
  G : {label:'G',   sfIdx:-1, primary: true,  SF: 0 },
  GS: {label:'G#',  sfIdx:-1, primary: false, SF: 1 },
  AF: {label:'Ab',  sfIdx:-2, primary: false, SF: -1},
  A : {label:'A',   sfIdx:-2, primary: true,  SF: 0 },
  AS: {label:'A#',  sfIdx:-2, primary: false, SF: 1 },
  BF: {label:'Bb',  sfIdx:-3, primary: false, SF: -1},
  B : {label:'B',   sfIdx:-3, primary: true,  SF: 0 },
};

export const SCALE_INTERVAL = [
  [Notes.C],
  [Notes.CS, Notes.DF],
  [Notes.D],
  [Notes.DS, Notes.EF],
  [Notes.E],
  [Notes.F],
  [Notes.FS, Notes.GF],
  [Notes.G],
  [Notes.GS, Notes.AF],
  [Notes.A],
  [Notes.AS, Notes.BF],
  [Notes.B]
];

export const SIGNATURES = [
  {name:'Major'},
  {name:'Minor'}
];

export const MajorInterval = [2,2,1,2,2,2,1];
export const MinorInterval = [2,1,2,2,1,2,2];

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
export const SharpFlat = {
  Major:{
    C : []

  },
  Minor:{
    C : [{type:"flat", sfIdx:4}, {type:"flat", sfIdx:1}, {type:"flat", sfIdx: 5}]
  }
};
