import {ScaleHeads, SymbolType, Scale} from '../types';
const {FLAT, SHARP} = SymbolType;

export const STAFF_SCALES_HEAD: ScaleHeads = {
  Major:{
    C : [],
    CS: [
      {type: FLAT, pos: 4},
      {type: FLAT, pos: 1},
      {type: FLAT, pos: 5},
      {type: FLAT, pos: 2},
      {type: FLAT, pos:6}
    ],
    DF: [
      {type: FLAT, pos: 4},
      {type: FLAT, pos: 1},
      {type: FLAT, pos: 5},
      {type: FLAT, pos: 2},
      {type: FLAT, pos: 6}
    ],
    D : [
      {type: SHARP, pos: 0},
      {type: SHARP, pos: 3}
    ],
    DS: [
      {type: FLAT, pos: 4},
      {type: FLAT, pos: 1},
      {type: FLAT, pos: 5}
    ],
    EF: [
      {type: FLAT, pos: 4},
      {type: FLAT, pos: 1},
      {type: FLAT, pos: 5}
    ],
    E : [
      {type: SHARP, pos: 0},
      {type: SHARP, pos: 3},
      {type: SHARP, pos: -1},
      {type: SHARP, pos: 2}
    ],
    F : [{type: FLAT, pos: 4}],
    FS: [
      {type: SHARP, pos: 0},
      {type: SHARP, pos: 3},
      {type: SHARP, pos: -1},
      {type: SHARP, pos: 2},
      {type: SHARP, pos: 5},
      {type: SHARP, pos: 1}
    ],
    GF: [
      {type: FLAT, pos: 4},
      {type: FLAT, pos: 1},
      {type: FLAT, pos: 5},
      {type: FLAT, pos: 2},
      {type: FLAT, pos: 5},
      {type: FLAT, pos: 1}
    ],
    G : [{type: SHARP, pos: 0}],
    GS: [
      {type: FLAT, pos: 4},
      {type: FLAT, pos: 1},
      {type: FLAT, pos: 5},
      {type: FLAT, pos: 2}
    ],
    AF: [
      {type: FLAT, pos: 4},
      {type: FLAT, pos: 1},
      {type: FLAT, pos: 5},
      {type: FLAT, pos: 2}
    ],
    A : [
      {type: SHARP, pos: 0},
      {type: SHARP, pos: 3},
      {type: SHARP, pos: -1}
    ],
    AS: [
      {type: FLAT, pos: 4},
      {type: FLAT, pos: 1}
    ],
    BF: [
      {type: FLAT, pos: 4},
      {type: FLAT, pos: 1}
    ],
    B : [
      {type: SHARP, pos: 0},
      {type: SHARP, pos: 3},
      {type: SHARP, pos: -1},
      {type: SHARP, pos: 2},
      {type: SHARP, pos: 5}
    ]
  },
  Minor:{
    C : [
      {type: FLAT, pos: 4},
      {type: FLAT, pos: 1},
      {type: FLAT, pos:  5}
    ],
    CS: [
      {type: SHARP, pos: 0},
      {type: SHARP, pos: 3},
      {type: SHARP, pos: -1},
      {type: SHARP, pos: 2}
    ],
    DF: [
      {type: SHARP, pos: 0},
      {type: SHARP, pos: 3},
      {type: SHARP, pos: -1},
      {type: SHARP, pos: 2}
    ],
    D : [{type: FLAT, pos: 2}],
    DS: [
      {type: FLAT, pos: 4},
      {type: FLAT, pos: 1},
      {type: FLAT, pos: 5},
      {type: FLAT, pos: 2},
      {type: FLAT, pos: 6},
      {type: FLAT, pos: 3}
    ],
    EF: [
      {type: FLAT, pos: 4},
      {type: FLAT, pos: 1},
      {type: FLAT, pos: 5},
      {type: FLAT, pos: 2},
      {type: FLAT, pos: 6},
      {type: FLAT, pos: 3}
    ],
    E : [{type: SHARP, pos: 0}],
    F : [
      {type: FLAT, pos: 4},
      {type: FLAT, pos: 1},
      {type: FLAT, pos: 5},
      {type: FLAT, pos: 2}
    ],
    FS: [
      {type: SHARP, pos: 0},
      {type: SHARP, pos: 3},
      {type: SHARP, pos: -1}
    ],
    GF: [
      {type: SHARP, pos: 0},
      {type: SHARP, pos: 3},
      {type: SHARP, pos: -1}
    ],
    G : [
      {type: FLAT, pos: 4},
      {type: FLAT, pos: 1}
    ],
    GS: [
      {type: SHARP, pos: 0},
      {type: SHARP, pos: 3},
      {type: SHARP, pos: -1},
      {type: SHARP, pos: 2},
      {type: SHARP, pos: 5}
    ],
    AF: [
      {type: SHARP, pos: 0},
      {type: SHARP, pos: 3},
      {type: SHARP, pos: -1},
      {type: SHARP, pos: 2},
      {type: SHARP, pos: 5}
    ],
    A : [],
    AS: [
      {type: FLAT, pos: 4},
      {type: FLAT, pos: 1},
      {type: FLAT, pos: 5},
      {type: FLAT, pos: 2},
      {type: FLAT, pos: 6}
    ],
    BF: [
      {type: FLAT, pos: 4},
      {type: FLAT, pos: 1},
      {type: FLAT, pos: 5},
      {type: FLAT, pos: 2},
      {type: FLAT, pos: 6}
    ],
    B : [
      {type: SHARP, pos: 0},
      {type: SHARP, pos: 3}
    ]
  }
};

export const NotesFullMap = {
  "g3"  : {name: 'g3', label:'G3', scale: Scale.G,  sfIdx:13, freq:196},
  "g3s" : {name: 'g3s', label:'G3#', scale: Scale.GS,  sfIdx:13, freq:208},

  "a3b" : {name: 'a3b', label:'A3b', scale: Scale.AF,  sfIdx:12, freq:208},
  "a3"  : {name: 'a3', label:'A3', scale: Scale.A,  sfIdx:12, freq:220},
  "a3s" : {name: 'a3s', label:'A3#',scale: Scale.AS,  sfIdx:12, freq:233},

  "b3b" : {name: 'b3b', label:'B3b',scale: Scale.BF,  sfIdx:11, freq:233},
  "b3"  : {name: 'b3', label:'B3', scale: Scale.B,  sfIdx:11, freq:245},

  "c4"  : {name: 'c4', label:'C4', scale: Scale.C,  sfIdx:10, freq:262},
  "c4s" : {name: 'c4s', label:'C4#',scale: Scale.CS,  sfIdx:10, freq:277},

  "d4b" : {name: 'd4b', label:'D4b', scale: Scale.DF,  sfIdx:9, freq:277},
  "d4"  : {name: 'd4', label:'D4', scale: Scale.D,  sfIdx:9, freq:294},
  "d4s" : {name: 'd4s', label:'D4#',scale: Scale.DS,  sfIdx:9, freq:311},

  "e4b" : {name: 'e4b', label:'E4b',scale: Scale.EF,  sfIdx:8, freq:311},
  "e4"  : {name: 'e4', label:'E4', scale: Scale.E,  sfIdx:8, freq:330},

  "f4"  : {name: 'f4', label:'F4', scale: Scale.F,  sfIdx:7, freq:349},
  "f4s" : {name: 'f4s', label:'F4#',scale: Scale.FS,  sfIdx:7, freq:370},

  "g4b" : {name: 'g4b', label:'G4b',scale: Scale.GF,  sfIdx:6, freq:370},
  "g4"  : {name: 'g4', label:'G4', scale: Scale.G,  sfIdx:6, freq:392},
  "g4s" : {name: 'g4s', label:'G4#',scale: Scale.GS,  sfIdx:6, freq:415},

  "a4b" : {name: 'a4b', label:'A4b',scale: Scale.AF,  sfIdx:5, freq:415},
  "a4"  : {name: 'a4', label:'A4', scale: Scale.A,  sfIdx:5, freq:440},
  "a4s" : {name: 'a4s', label:'A4#',scale: Scale.AS,  sfIdx:5, freq:466},

  "b4b" : {name: 'b4b', label:'B4b',scale: Scale.BF,  sfIdx:4, freq:466},
  "b4"  : {name: 'b4', label:'B4', scale: Scale.B,  sfIdx:4, freq:494},

  "c5"  : {name: 'c5', label:'C5', scale: Scale.C,  sfIdx:3, freq:523},
  "c5s" : {name: 'c5s', label:'C5#',scale: Scale.CS,  sfIdx:3, freq:554},

  "d5b" : {name: 'd5b', label:'D5b',scale: Scale.DF,  sfIdx:2, freq:554},
  "d5"  : {name: 'd5', label:'D5', scale: Scale.D,  sfIdx:2, freq:587},
  "d5s" : {name: 'd5s', label:'D5#',scale: Scale.DS,  sfIdx:2, freq:622},

  "e5b" : {name: 'e5b', label:'E5b',scale: Scale.EF,  sfIdx:1, freq:622},
  "e5"  : {name: 'e5', label:'E5', scale: Scale.E,  sfIdx:1, freq:659},

  "f5"  : {name: 'f5', label:'F5', scale: Scale.F,  sfIdx:0, freq:698},
  "f5s" : {name: 'f5s', label:'F5#',scale: Scale.FS,  sfIdx:0, freq:740},

  "g5b" : {name: 'g5b', label:'G5b',scale: Scale.GF,  sfIdx:-1, freq:740},
  "g5"  : {name: 'g5', label:'G5', scale: Scale.G,  sfIdx:-1, freq:784},
  "g5s" : {name: 'g5s', label:'G5#',scale: Scale.GS,  sfIdx:-1, freq:830},

  "a5b" : {name: 'a5b', label:'A5b',scale: Scale.AF,  sfIdx:-2, freq:830},
  "a5"  : {name: 'a5', label:'A5', scale: Scale.A,  sfIdx:-2, freq:880},
  "a5s" : {name: 'a5s', label:'A5#',scale: Scale.AS,  sfIdx:-2, freq:932},

  "b5b" : {name: 'b5b', label:'B5b',scale: Scale.BF,  sfIdx:-3, freq:932},
  "b5"  : {name: 'b5', label:'B5', scale: Scale.B,  sfIdx:-3, freq:988}
};

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

export const MajorInterval = [2,2,1,2,2,2,1];
export const MinorInterval = [2,1,2,2,1,2,2];
