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
  "G3"  : {name:'G3',   label:'G3', scale:"G",  sfIdx:13, primary: true,  mark: false, freq:196},
  "G3S" : {name:'G3S',  label:'G3#', scale:"GS",  sfIdx:13, primary: false, mark: false, freq:208},

  "A3b" : {name:'A3b',  label:'A3b', scale:"AF",  sfIdx:12, primary: false, mark: false, freq:208},
  "A3"  : {name:'A3',   label:'A3', scale:"A",  sfIdx:12, primary: true,  mark: false, freq:220},
  "A3S" : {name:'A3S',  label:'A3#',scale:"AS",  sfIdx:12, primary: false, mark: false, freq:233},

  "B3b" : {name:'B3b',  label:'B3b',scale:"BF",  sfIdx:11, primary: false, mark: false, freq:233},
  "B3"  : {name:'B3',   label:'B3', scale:"B",  sfIdx:11, primary: true,  mark: false, freq:245},

  "C4"  : {name:'C4',   label:'C4', scale:"C",  sfIdx:10, primary: true,  mark: false, freq:262},
  "C4S" : {name:'C4S',  label:'C4#',scale:"CS",  sfIdx:10, primary: false, mark: false, freq:277},

  "D4b" : {name:'D4b',  label:'D4b', scale:"DF",  sfIdx:9,  primary: true,  mark: false, freq:277},
  "D4"  : {name:'D4',   label:'D4', scale:"D",  sfIdx:9,  primary: true,  mark: false, freq:294},
  "D4S" : {name:'D4S',  label:'D4#',scale:"D",  sfIdx:9,  primary: false, mark: false, freq:311},

  "E4b" : {name:'E4b',  label:'E4b',scale:"EF",  sfIdx:8,  primary: false, mark: false, freq:311},
  "E4"  : {name:'E4',   label:'E4', scale:"E",  sfIdx:8,  primary: true,  mark: false, freq:330},

  "F4"  : {name:'F4',   label:'F4', scale:"F",  sfIdx:7,  primary: true,  mark: false, freq:349},
  "F4S" : {name:'F4S',  label:'F4#',scale:"FS",  sfIdx:7,  primary: false, mark: false, freq:370},

  "G4b" : {name:'G4b',  label:'G4b',scale:"GF",  sfIdx:6,  primary: false, mark: false, freq:370},
  "G4"  : {name:'G4',   label:'G4', scale:"G",  sfIdx:6,  primary: true,  mark: false, freq:392},
  "G4S" : {name:'G4S',  label:'G4#',scale:"GS",  sfIdx:6,  primary: false, mark: false, freq:415},

  "A4b" : {name:'A4b',  label:'A4b',scale:"AF",  sfIdx:5,  primary: false, mark: false, freq:415},
  "A4"  : {name:'A4',   label:'A4', scale:"A",  sfIdx:5,  primary: true,  mark: false, freq:440},
  "A4S" : {name:'A4S',  label:'A4#',scale:"AS",  sfIdx:5,  primary: false, mark: false, freq:466},

  "B4b" : {name:'B4b',  label:'B4b',scale:"BF",  sfIdx:4,  primary: false, mark: false, freq:466},
  "B4"  : {name:'B4',   label:'B4', scale:"B",  sfIdx:4,  primary: true,  mark: false, freq:494},

  "C5"  : {name:'C5',   label:'C5', scale:"C",  sfIdx:3,  primary: true,  mark: false, freq:523},
  "C5S" : {name:'C5S',  label:'C5#',scale:"CS",  sfIdx:3,  primary: false, mark: false, freq:554},

  "D5b" : {name:'D5b',  label:'D5b',scale:"DF",  sfIdx:2,  primary: false, mark: false, freq:554},
  "D5"  : {name:'D5',   label:'D5', scale:"D",  sfIdx:2,  primary: true,  mark: false, freq:587},
  "D5S" : {name:'D5S',  label:'D5#',scale:"DS",  sfIdx:2,  primary: false, mark: false, freq:622},

  "E5b" : {name:'E5b',  label:'E5b',scale:"EF",  sfIdx:1,  primary: false, mark: false, freq:622},
  "E5"  : {name:'E5',   label:'E5', scale:"E",  sfIdx:1,  primary: true,  mark: false, freq:659},

  "F5"  : {name:'F5',   label:'F5', scale:"F",  sfIdx:0, primary: true, mark: false, freq:698},
  "F5S" : {name:'F5S',  label:'F5#',scale:"FS",  sfIdx:0, primary: false, mark: false, freq:740},

  "G5b" : {name:'G5b',  label:'G5b',scale:"GF",  sfIdx:-1, primary: false, mark: false, freq:740},
  "G5"  : {name:'G5',   label:'G5', scale:"G",  sfIdx:-1, primary: true,  mark: false, freq:784},
  "G5S" : {name:'G5S',  label:'G5#',scale:"GS",  sfIdx:-1, primary: false, mark: false, freq:830},

  "A5b" : {name:'A5b',  label:'A5b',scale:"AF",  sfIdx:-2, primary: false, mark: false, freq:830},
  "A5"  : {name:'A5',   label:'A5', scale:"A",  sfIdx:-2, primary: true,  mark: false, freq:880},
  "A5S" : {name:'A5S',  label:'A5#',scale:"AS",  sfIdx:-2, primary: false, mark: false, freq:932},

  "B5b" : {name:'B5b',  label:'B5b',scale:"BF",  sfIdx:-3, primary: false, mark: false, freq:932},
  "B5"  : {name:'B5',   label:'B5', scale:"B",  sfIdx:-3, primary: true,  mark: false, freq:988}
};

export const NotesFullArr = Object.values(NotesFullMap);

export const SCALE_FULL = [
  [NotesFullMap.G3],
  [NotesFullMap.G3S, NotesFullMap.A3b],
  [NotesFullMap.A3],
  [NotesFullMap.A3S, NotesFullMap.B3b],
  [NotesFullMap.B3],
  [NotesFullMap.C4],
  [NotesFullMap.C4S, NotesFullMap.D4b],
  [NotesFullMap.D4],
  [NotesFullMap.D4S, NotesFullMap.E4b],
  [NotesFullMap.E4],
  [NotesFullMap.F4],
  [NotesFullMap.F4S, NotesFullMap.G4b],
  [NotesFullMap.G4],
  [NotesFullMap.G4S, NotesFullMap.A4b],
  [NotesFullMap.A4],
  [NotesFullMap.A4S, NotesFullMap.B4b],
  [NotesFullMap.B4],
  [NotesFullMap.C5],
  [NotesFullMap.C5S, NotesFullMap.D5b],
  [NotesFullMap.D5],
  [NotesFullMap.D5S, NotesFullMap.E5b],
  [NotesFullMap.E5],
  [NotesFullMap.F5],
  [NotesFullMap.F5S, NotesFullMap.G5b],
  [NotesFullMap.G5],
  [NotesFullMap.G5S, NotesFullMap.A5b],
  [NotesFullMap.A5],
  [NotesFullMap.A5S, NotesFullMap.B5b],
  [NotesFullMap.B5]
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
