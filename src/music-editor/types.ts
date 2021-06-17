import React from 'react';
import SymbolSVG from './symbols/symbol-svg';

export enum Signature {
  Major = 'Major',
  Minor = 'Minor'
};

export enum SymbolType {
  NOTE_WHOLE,
  NOTE_HALF,
  NOTE_QUARTER,
  NOTE_EIGHTH,
  NOTE_HALF_REVERSE,
  NOTE_QUARTER_REVERSE,
  NOTE_EIGHTH_REVERSE,
  BAR,
  WHOLEREST,
  HALFREST,
  QUARTERREST,
  EIGTHREST,
  FLAT,
  SHARP,
  NATURAL,
  ARROW
};

export interface Descriptor {
  scale?: SymbolType,
  augment?: boolean
}

export interface ScoreSymbol {
  type: SymbolType;
  name?: string;
  x?: number;
  desc?: Descriptor;
  sfIdx?: number;
  freq?: number;
}

export interface ScoreType {
  id?: string,
  signature?: Signature,
  scale?: string,
  title?: string,
  author?: string,
  notes?: ScoreSymbol[][],
  scoreInfo?: any;
}

export interface IteratorResponse {
  symbol: SymbolSVG;
  row: number;
  col: number;
}

export interface StaffType {
  config: {
    showNoteName: boolean;
    showStaffIndex: boolean;
    showAudioSpectrum: boolean;
  }
}

export interface StaffOwnProps {
  sectionRef: React.RefObject<HTMLDivElement>;
}

export interface PlayType {
  playing: number;
  vol: number;
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

export type AudioFreqData = {
  xInc: number,
  y: number
}