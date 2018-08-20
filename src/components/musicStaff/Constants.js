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
  C : {name:'C', label:'C',   sfIdx: 3, primary: true,  SF: 0 },
  CS: {name:'CS',label:'C#',  sfIdx: 3, primary: false, SF: 1 },
  DF: {name:'DF',label:'Db',  sfIdx: 2, primary: false, SF: -1},
  D : {name:'D', label:'D',   sfIdx: 2, primary: true,  SF: 0 },
  DS: {name:'DS',label:'D#',  sfIdx: 2, primary: false, SF: 1 },
  EF: {name:'EF',label:'Eb',  sfIdx: 1, primary: false, SF: -1},
  E : {name:'E', label:'E',   sfIdx: 1, primary: true,  SF: 0 },
  F : {name:'F', label:'F',   sfIdx: 0, primary: true,  SF: 0 },
  FS: {name:'FS',label:'F#',  sfIdx: 0, primary: false, SF: 1 },
  GF: {name:'GF',label:'Gb',  sfIdx:-1, primary: false, SF: -1},
  G : {name:'G', label:'G',   sfIdx:-1, primary: true,  SF: 0 },
  GS: {name:'GS',label:'G#',  sfIdx:-1, primary: false, SF: 1 },
  AF: {name:'AF',label:'Ab',  sfIdx:-2, primary: false, SF: -1},
  A : {name:'A', label:'A',   sfIdx:-2, primary: true,  SF: 0 },
  AS: {name:'AS',label:'A#',  sfIdx:-2, primary: false, SF: 1 },
  BF: {name:'BF',label:'Bb',  sfIdx:-3, primary: false, SF: -1},
  B : {name:'B', label:'B',   sfIdx:-3, primary: true,  SF: 0 },
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

export const SHARPFLATIDX = {
  Major:{
    C : [],
    CS: [{name:'flat', sfIdx:4},{name:'flat', sfIdx:1},{name:'flat', sfIdx:5},{name:'flat', sfIdx:2},{name:'flat', sfIdx:6}],
    DF: [{name:'flat', sfIdx:4},{name:'flat', sfIdx:1},{name:'flat', sfIdx:5},{name:'flat', sfIdx:2},{name:'flat', sfIdx:6}],
    D : [{name:'sharp', sfIdx:0},{name:'sharp', sfIdx:3}],
    DS: [{name:'flat', sfIdx:4},{name:'flat', sfIdx:1},{name:'flat', sfIdx:5}],
    EF: [{name:'flat', sfIdx:4},{name:'flat', sfIdx:1},{name:'flat', sfIdx:5}],
    E : [{name:'sharp', sfIdx:0},{name:'sharp', sfIdx:3},{name:'sharp', sfIdx:-1},{name:'sharp', sfIdx:2}],
    F : [{name:'flat', sfIdx:4}],
    FS: [{name:'sharp', sfIdx:0},{name:'sharp', sfIdx:3},{name:'sharp', sfIdx:-1},{name:'sharp', sfIdx:2},{name:'sharp', sfIdx:5},{name:'sharp', sfIdx:1}],
    GF: [{name:'flat', sfIdx:4},{name:'flat', sfIdx:1},{name:'flat', sfIdx:5},{name:'flat', sfIdx:2},{name:'flat', sfIdx:5},{name:'flat', sfIdx:1}],
    G : [{name:'sharp', sfIdx:0}],
    GS: [{name:'flat', sfIdx:4},{name:'flat', sfIdx:1},{name:'flat', sfIdx:5},{name:'flat', sfIdx:2}],
    AF: [{name:'flat', sfIdx:4},{name:'flat', sfIdx:1},{name:'flat', sfIdx:5},{name:'flat', sfIdx:2}],
    A : [{name:'sharp', sfIdx:0},{name:'sharp', sfIdx:3},{name:'sharp', sfIdx:-1}],
    AS: [{name:'flat', sfIdx:4},{name:'flat', sfIdx:1}],
    BF: [{name:'flat', sfIdx:4},{name:'flat', sfIdx:1}],
    B : [{name:'sharp', sfIdx:0},{name:'sharp', sfIdx:3},{name:'sharp', sfIdx:-1},{name:'sharp', sfIdx:2},{name:'sharp', sfIdx:5}]
  },
  Minor:{
    C : [{name:"flat", sfIdx:4}, {name:"flat", sfIdx:1}, {type:"flat", sfIdx: 5}],
    CS: [{name:'sharp', sfIdx:0},{name:'sharp', sfIdx:3},{name:'sharp', sfIdx:-1},{name:'sharp', sfIdx:2}],
    DF: [{name:'sharp', sfIdx:0},{name:'sharp', sfIdx:3},{name:'sharp', sfIdx:-1},{name:'sharp', sfIdx:2}],
    D : [{name:'flat', sfIdx:2}],
    DS: [{name:'flat', sfIdx:4},{name:'flat', sfIdx:1},{name:'flat', sfIdx:5},{name:'flat', sfIdx:2},{name:'flat', sfIdx:6},{name:'flat', sfIdx:3}],
    EF: [{name:'flat', sfIdx:4},{name:'flat', sfIdx:1},{name:'flat', sfIdx:5},{name:'flat', sfIdx:2},{name:'flat', sfIdx:6},{name:'flat', sfIdx:3}],
    E : [{name:'sharp', sfIdx:0}],
    F : [{name:'flat', sfIdx:4},{name:'flat', sfIdx:1},{name:'flat', sfIdx:5},{name:'flat', sfIdx:2}],
    FS: [{name:'sharp', sfIdx:0},{name:'sharp', sfIdx:3},{name:'sharp', sfIdx:-1}],
    GF: [{name:'sharp', sfIdx:0},{name:'sharp', sfIdx:3},{name:'sharp', sfIdx:-1}],
    G : [{name:'flat', sfIdx:4},{name:'flat', sfIdx:1}],
    GS: [{name:'sharp', sfIdx:0},{name:'sharp', sfIdx:3},{name:'sharp', sfIdx:-1},{name:'sharp', sfIdx:2},{name:'sharp', sfIdx:5}],
    AF: [{name:'sharp', sfIdx:0},{name:'sharp', sfIdx:3},{name:'sharp', sfIdx:-1},{name:'sharp', sfIdx:2},{name:'sharp', sfIdx:5}],
    A : [],
    AS: [{name:'flat', sfIdx:4},{name:'flat', sfIdx:1},{name:'flat', sfIdx:5},{name:'flat', sfIdx:2},{name:'flat', sfIdx:6}],
    BF: [{name:'flat', sfIdx:4},{name:'flat', sfIdx:1},{name:'flat', sfIdx:5},{name:'flat', sfIdx:2},{name:'flat', sfIdx:6}],
    B : [{name:'sharp', sfIdx:0},{name:'sharp', sfIdx:3}]
  }
};