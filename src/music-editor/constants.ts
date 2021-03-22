import {ScaleHeads} from './types';
import {SymbolType} from './types';

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