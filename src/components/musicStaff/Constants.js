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

export const NotesFullMap = {
  "g3"  : {name: 'g3', label:'G3', scale:"G",  sfIdx:13, freq:196},
  "g3s" : {name: 'g3s', label:'G3#', scale:"GS",  sfIdx:13, freq:208},

  "a3b" : {name: 'a3b', label:'A3b', scale:"AF",  sfIdx:12, freq:208},
  "a3"  : {name: 'a3', label:'A3', scale:"A",  sfIdx:12, freq:220},
  "a3s" : {name: 'a3s', label:'A3#',scale:"AS",  sfIdx:12, freq:233},

  "b3b" : {name: 'b3b', label:'B3b',scale:"BF",  sfIdx:11, freq:233},
  "b3"  : {name: 'b3', label:'B3', scale:"B",  sfIdx:11, freq:245},

  "c4"  : {name: 'c4', label:'C4', scale:"C",  sfIdx:10, freq:262},
  "c4s" : {name: 'c4s', label:'C4#',scale:"CS",  sfIdx:10, freq:277},

  "d4b" : {name: 'd4b', label:'D4b', scale:"DF",  sfIdx:9, freq:277},
  "d4"  : {name: 'd4', label:'D4', scale:"D",  sfIdx:9, freq:294},
  "d4s" : {name: 'd4s', label:'D4#',scale:"D",  sfIdx:9, freq:311},

  "e4b" : {name: 'e4b', label:'E4b',scale:"EF",  sfIdx:8, freq:311},
  "e4"  : {name: 'e4', label:'E4', scale:"E",  sfIdx:8, freq:330},

  "f4"  : {name: 'f4', label:'F4', scale:"F",  sfIdx:7, freq:349},
  "f4s" : {name: 'f4s', label:'F4#',scale:"FS",  sfIdx:7, freq:370},

  "g4b" : {name: 'g4b', label:'G4b',scale:"GF",  sfIdx:6, freq:370},
  "g4"  : {name: 'g4', label:'G4', scale:"G",  sfIdx:6, freq:392},
  "g4s" : {name: 'g4s', label:'G4#',scale:"GS",  sfIdx:6, freq:415},

  "a4b" : {name: 'a4b', label:'A4b',scale:"AF",  sfIdx:5, freq:415},
  "a4"  : {name: 'a4', label:'A4', scale:"A",  sfIdx:5, freq:440},
  "a4s" : {name: 'a4s', label:'A4#',scale:"AS",  sfIdx:5, freq:466},

  "b4b" : {name: 'b4b', label:'B4b',scale:"BF",  sfIdx:4, freq:466},
  "b4"  : {name: 'b4', label:'B4', scale:"B",  sfIdx:4, freq:494},

  "c5"  : {name: 'c5', label:'C5', scale:"C",  sfIdx:3, freq:523},
  "c5s" : {name: 'c5s', label:'C5#',scale:"CS",  sfIdx:3, freq:554},

  "d5b" : {name: 'd5b', label:'D5b',scale:"DF",  sfIdx:2, freq:554},
  "d5"  : {name: 'd5', label:'D5', scale:"D",  sfIdx:2, freq:587},
  "d5s" : {name: 'd5s', label:'D5#',scale:"DS",  sfIdx:2, freq:622},

  "e5b" : {name: 'e5b', label:'E5b',scale:"EF",  sfIdx:1, freq:622},
  "e5"  : {name: 'e5', label:'E5', scale:"E",  sfIdx:1, freq:659},

  "f5"  : {name: 'f5', label:'F5', scale:"F",  sfIdx:0, freq:698},
  "f5s" : {name: 'f5s', label:'F5#',scale:"FS",  sfIdx:0, freq:740},

  "g5b" : {name: 'g5b', label:'G5b',scale:"GF",  sfIdx:-1, freq:740},
  "g5"  : {name: 'g5', label:'G5', scale:"G",  sfIdx:-1, freq:784},
  "g5s" : {name: 'g5s', label:'G5#',scale:"GS",  sfIdx:-1, freq:830},

  "a5b" : {name: 'a5b', label:'A5b',scale:"AF",  sfIdx:-2, freq:830},
  "a5"  : {name: 'a5', label:'A5', scale:"A",  sfIdx:-2, freq:880},
  "a5s" : {name: 'a5s', label:'A5#',scale:"AS",  sfIdx:-2, freq:932},

  "b5b" : {name: 'b5b', label:'B5b',scale:"BF",  sfIdx:-3, freq:932},
  "b5"  : {name: 'b5', label:'B5', scale:"B",  sfIdx:-3, freq:988}
};

export const NotesFullArr = Object.values(NotesFullMap);

export const SCALE_FULL = [
  [NotesFullMap.g3],
  [NotesFullMap.g3s, NotesFullMap.a3b],
  [NotesFullMap.a3],
  [NotesFullMap.a3s, NotesFullMap.b3b],
  [NotesFullMap.b3],
  [NotesFullMap.c4],
  [NotesFullMap.c4s, NotesFullMap.d4b],
  [NotesFullMap.d4],
  [NotesFullMap.d4s, NotesFullMap.e4b],
  [NotesFullMap.e4],
  [NotesFullMap.f4],
  [NotesFullMap.f4s, NotesFullMap.g4b],
  [NotesFullMap.g4],
  [NotesFullMap.g4s, NotesFullMap.a4b],
  [NotesFullMap.a4],
  [NotesFullMap.a4s, NotesFullMap.b4b],
  [NotesFullMap.b4],
  [NotesFullMap.c5],
  [NotesFullMap.c5s, NotesFullMap.d5b],
  [NotesFullMap.d5],
  [NotesFullMap.d5s, NotesFullMap.e5b],
  [NotesFullMap.e5],
  [NotesFullMap.f5],
  [NotesFullMap.f5s, NotesFullMap.g5b],
  [NotesFullMap.g5],
  [NotesFullMap.g5s, NotesFullMap.a5b],
  [NotesFullMap.a5],
  [NotesFullMap.a5s, NotesFullMap.b5b],
  [NotesFullMap.b5]
];

export const Notes = {
  C : {name:'C', label:'C',   sfIdx: 3, primary: true,  SF: 0 , mark: false},
  CS: {name:'CS',label:'C#',  sfIdx: 3, primary: false, SF: 1 , mark: false},
  DF: {name:'DF',label:'Db',  sfIdx: 2, primary: false, SF: -1, mark: false},
  D : {name:'D', label:'D',   sfIdx: 2, primary: true,  SF: 0 , mark: false},
  DS: {name:'DS',label:'D#',  sfIdx: 2, primary: false, SF: 1 , mark: false},
  EF: {name:'EF',label:'Eb',  sfIdx: 1, primary: false, SF: -1, mark: false},
  E : {name:'E', label:'E',   sfIdx: 1, primary: true,  SF: 0 , mark: false},
  F : {name:'F', label:'F',   sfIdx: 0, primary: true,  SF: 0 , mark: false},
  FS: {name:'FS',label:'F#',  sfIdx: 0, primary: false, SF: 1 , mark: false},
  GF: {name:'GF',label:'Gb',  sfIdx:-1, primary: false, SF: -1, mark: false},
  G : {name:'G', label:'G',   sfIdx:-1, primary: true,  SF: 0 , mark: false},
  GS: {name:'GS',label:'G#',  sfIdx:-1, primary: false, SF: 1 , mark: false},
  AF: {name:'AF',label:'Ab',  sfIdx:-2, primary: false, SF: -1, mark: false},
  A : {name:'A', label:'A',   sfIdx:-2, primary: true,  SF: 0 , mark: false},
  AS: {name:'AS',label:'A#',  sfIdx:-2, primary: false, SF: 1 , mark: false},
  BF: {name:'BF',label:'Bb',  sfIdx:-3, primary: false, SF: -1, mark: false},
  B : {name:'B', label:'B',   sfIdx:-3, primary: true,  SF: 0 , mark: false},
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
export const MajorIntervalR = [1,2,2,2,1,2,2];
export const MinorInterval = [2,1,2,2,1,2,2];
export const MinorIntervalR = [2,2,1,2,2,1,2];

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
    C : [{name:"flat", sfIdx:4}, {name:"flat", sfIdx:1}, {name:"flat", sfIdx: 5}],
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

export const ViolinFinger_POS1 = [
  {finger: "0", notes: [Notes.G, Notes.D, Notes.A, Notes.E ]},
  {finger: "1", notes: [Notes.AF,Notes.EF,Notes.BF,Notes.F ]},
  {finger: "1", notes: [Notes.A, Notes.E, Notes.B, Notes.FS]},
  {finger: "2", notes: [Notes.BF,Notes.F, Notes.C, Notes.G ]},
  {finger: "2", notes: [Notes.B, Notes.FS,Notes.CS,Notes.GS]},
  {finger: "3", notes: [Notes.C, Notes.G, Notes.D, Notes.A ]},
  {finger:"3/4",notes: [Notes.CS,Notes.GS,Notes.EF,Notes.BF]},
  {finger: "4", notes: [Notes.D, Notes.A, Notes.E, Notes.B]},
];

export const STAFF_SYM_START = 0.1;
export const STAFF_SYM_END = 1;
export const STAFF_WIDTH = 1200;