export enum Signature {
  Major = 'Major',
  Minor = 'Minor'
};

export enum SymbolType {
  NOTE_WHOLE,
  NOTE_HALF,
  NOTE_HALF_REVERSE,
  NOTE_QUARTER,
  NOTE_QUARTER_REVERSE,
  NOTE_EIGHTH,
  NOTE_EIGHTH_REVERSE,
  BAR,
  WHOLEREST,
  HALFREST,
  QUARTERREST,
  EIGTHREST,
  FLAT,
  SHARP,
  NATURAL,
  DOT
};

export interface Descriptor {
  scale?: SymbolType,
  augment?: boolean
}

export interface ScoreSymbol {
  type: SymbolType,
  name?: string,
  x?: number,
  desc?: Descriptor
}

export interface Score {
  id: string,
  signature: Signature,
  scale: string,
  title: string,
  author: string,
  notes: ScoreSymbol[][]
}

export enum NoteName {
  C  = 'C',
  CS = 'C#',
  DF = 'Db',
  D  = 'D',
  DS = 'D#',
  EF = 'Eb',
  E  = 'E',
  F  = 'F',
  FS = 'F#',
  GF = 'Gb',
  G  = 'G',
  GS = 'G#',
  AF = 'Ab',
  A  = 'A',
  AS = 'A#',
  BF = 'Bb',
  B  = 'B',
};

export enum NOTE {
  C  = 'C',
  CS = 'CS',
  DF = 'DF',
  D  = 'D',
  DS = 'DS',
  EF = 'EF',
  E  = 'E',
  F  = 'F',
  FS = 'FS',
  GF = 'GF',
  G  = 'G',
  GS = 'GS',
  AF = 'AF',
  A  = 'A',
  AS = 'AS',
  BF = 'BF',
  B  = 'B',
}

export interface ScaleHead {
  type: SymbolType,
  pos: number
}

export type ScaleHeads = {
  [key in Signature]: {
    [key in NOTE]: ScaleHead[];
  };
};