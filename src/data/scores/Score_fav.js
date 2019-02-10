/**
 * Created by Lu on 11/7/2018.
 */
import {NotesFullMap as Notes} from '../../components/musicStaff/Constants';
import * as Syms from '../../components/musicStaff/Symbols';

export const BlackHeart={
  name:"black_heart",
  signature:"Major",
  scale:"F",
  title:"Black Heart",
  author:"Two steps from hell",
  notes:[
    [ {type:Syms.NOTE_QUARTER_TYPE, pitch:"A3", descriptor:{showStaffline:true}},
      {type:Syms.NOTE_HALF_TYPE, pitch:"D4"},
      {type:Syms.NOTE_QUARTER_TYPE, pitch:"D4"},
      {type:Syms.NOTE_HALF_TYPE, pitch:"D4"},
      {type:Syms.NOTE_QUARTER_TYPE, pitch:"F4", descriptor:{rotate:true}},
      {type:Syms.NOTE_HALF_TYPE, pitch:"A4"},
      {type:Syms.NOTE_QUARTER_TYPE, pitch:"A4"},{type:Syms.NOTE_HALF_TYPE, pitch:"A4"},
      {type:Syms.NOTE_QUARTER_TYPE, pitch:"A4"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"G4"},{type:Syms.NOTE_EIGHTH_TYPE, pitch:"A4"},
      {type:Syms.NOTE_QUARTER_TYPE, pitch:"G4"},{type:Syms.NOTE_HALF_TYPE, pitch:"D4"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"D4"},
      {type:Syms.NOTE_HALF_TYPE, pitch:"F4"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"D4"},{type:Syms.NOTE_HALF_TYPE, pitch:"D4"},
      {type:Syms.NOTE_QUARTER_TYPE, pitch:"D4"},{type:Syms.NOTE_HALF_TYPE, pitch:"F4"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"D4"}],

    [ {type:Syms.NOTE_HALF_TYPE, pitch:"D4"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"D4"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"C4"},
      {type:Syms.NOTE_QUARTER_TYPE, pitch:"D4"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"E4"},{type:Syms.NOTE_HALF_TYPE, pitch:"A3"},
      {type:Syms.NOTE_QUARTER_TYPE, pitch:"C4"},{type:Syms.NOTE_HALF_TYPE, pitch:"D4"},{type:Syms.NOTE_HALF_TYPE, pitch:"D4"},
      {type:Syms.NOTE_QUARTER_TYPE, pitch:"A3"},{type:Syms.NOTE_HALF_TYPE, pitch:"D4"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"D4"},
      {type:Syms.NOTE_HALF_TYPE, pitch:"D4"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"F4"},{type:Syms.NOTE_HALF_TYPE, pitch:"A4"},
      {type:Syms.NOTE_QUARTER_TYPE, pitch:"A4"}],
    [ {type:Syms.NOTE_HALF_TYPE, pitch:"A4"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"A4"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"G4"},
      {type:Syms.NOTE_EIGHTH_TYPE, pitch:"A4"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"G4"},{type:Syms.NOTE_HALF_TYPE, pitch:"D4"},
      {type:Syms.NOTE_QUARTER_TYPE, pitch:"D4"},{type:Syms.NOTE_HALF_TYPE, pitch:"F4"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"D4"},
      {type:Syms.NOTE_HALF_TYPE, pitch:"D4"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"D4"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"G4"},
      {type:Syms.NOTE_EIGHTH_TYPE, pitch:"A4"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"G4"},{type:Syms.NOTE_HALF_TYPE, pitch:"D4"},
      {type:Syms.NOTE_QUARTER_TYPE, pitch:"D4"},{type:Syms.NOTE_HALF_TYPE, pitch:"F4"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"D4"},
      {type:Syms.NOTE_QUARTER_TYPE, pitch:"F4"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"D4"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"E4"},
      {type:Syms.NOTE_HALF_TYPE, pitch:"D4"}],
    [ {type:Syms.NOTE_HALF_TYPE, pitch:"D4"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"E5b"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"E5b"},
      {type:Syms.NOTE_EIGHTH_TYPE, pitch:"D5"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"D5b"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"D5b"},
      {type:Syms.NOTE_QUARTER_TYPE, pitch:"D5"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"E5b"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"E5b"},
      {type:Syms.NOTE_EIGHTH_TYPE, pitch:"D5"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"D5b"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"D5b"},
      {type:Syms.NOTE_QUARTER_TYPE, pitch:"D5"},{type:Syms.NOTE_EIGHTH_TYPE, pitch:"D5"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"E5b"},
      {type:Syms.NOTE_QUARTER_TYPE, pitch:"E5b"},{type:Syms.NOTE_EIGHTH_TYPE, pitch:"D5"}],
    [ {type:Syms.NOTE_QUARTER_TYPE, pitch:"D5b"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"D5b"},{type:Syms.NOTE_EIGHTH_TYPE, pitch:"A4"},
      {type:Syms.NOTE_QUARTER_TYPE, pitch:"D5"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"D5"},{type:Syms.NOTE_EIGHTH_TYPE, pitch:"D5b"},
      {type:Syms.NOTE_QUARTER_TYPE, pitch:"D5"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"D5"},{type:Syms.NOTE_EIGHTH_TYPE, pitch:"E5"},
      {type:Syms.NOTE_QUARTER_TYPE, pitch:"F5S"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"F5S"},{type:Syms.NOTE_EIGHTH_TYPE, pitch:"G5"},
      {type:Syms.NOTE_QUARTER_TYPE, pitch:"A5"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"A5"},{type:Syms.NOTE_EIGHTH_TYPE, pitch:"E5b"}]
  ]
};


export const MajorCPractice={
  name:"c_major_prac",
  signature:"Major",
  scale:"C",
  title:"C Major Practice",
  author:"J Hrimaly",
  notes:[
    [ {type:Syms.NOTE_QUARTER_TYPE, pitch:"C4"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"D4"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"E4"},
      {type:Syms.NOTE_QUARTER_TYPE, pitch:"F4"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"G4"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"A4"},
      {type:Syms.NOTE_QUARTER_TYPE, pitch:"B4"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"C5"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"C5"},
      {type:Syms.NOTE_QUARTER_TYPE, pitch:"B4"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"A4"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"G4"},
      {type:Syms.NOTE_QUARTER_TYPE, pitch:"F4"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"E4"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"D4"},
      {type:Syms.NOTE_QUARTER_TYPE, pitch:"C4"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"C4"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"E4"},
      {type:Syms.NOTE_QUARTER_TYPE, pitch:"G4"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"C5"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"E5"},
      {type:Syms.NOTE_QUARTER_TYPE, pitch:"C5"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"G4"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"E4"},
      {type:Syms.NOTE_QUARTER_TYPE, pitch:"C4"}],
    [ {type:Syms.NOTE_QUARTER_TYPE, pitch:"C4"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"D4"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"E4"},
      {type:Syms.NOTE_QUARTER_TYPE, pitch:"F4"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"G4"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"A4"},
      {type:Syms.NOTE_QUARTER_TYPE, pitch:"B4"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"C5"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"C5"},
      {type:Syms.NOTE_QUARTER_TYPE, pitch:"B4"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"A4"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"G4"},
      {type:Syms.NOTE_QUARTER_TYPE, pitch:"F4"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"E4"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"D4"},
      {type:Syms.NOTE_QUARTER_TYPE, pitch:"C4"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"C4"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"E4"},
      {type:Syms.NOTE_QUARTER_TYPE, pitch:"G4"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"C5"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"E5"},
      {type:Syms.NOTE_QUARTER_TYPE, pitch:"C5"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"G4"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"E4"},
      {type:Syms.NOTE_QUARTER_TYPE, pitch:"C4"}],
    [ {type:Syms.NOTE_QUARTER_TYPE, pitch:"C4"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"D4"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"E4"},
      {type:Syms.NOTE_QUARTER_TYPE, pitch:"F4"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"G4"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"A4"},
      {type:Syms.NOTE_QUARTER_TYPE, pitch:"B4"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"C5"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"C5"},
      {type:Syms.NOTE_QUARTER_TYPE, pitch:"B4"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"A4"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"G4"},
      {type:Syms.NOTE_QUARTER_TYPE, pitch:"F4"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"E4"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"D4"},
      {type:Syms.NOTE_QUARTER_TYPE, pitch:"C4"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"C4"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"E4"},
      {type:Syms.NOTE_QUARTER_TYPE, pitch:"G4"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"C5"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"E5"},
      {type:Syms.NOTE_QUARTER_TYPE, pitch:"C5"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"G4"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"E4"},
      {type:Syms.NOTE_QUARTER_TYPE, pitch:"C4"}],
    [ {type:Syms.NOTE_QUARTER_TYPE, pitch:"C4"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"D4"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"E4"},
      {type:Syms.NOTE_QUARTER_TYPE, pitch:"F4"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"G4"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"A4"},
      {type:Syms.NOTE_QUARTER_TYPE, pitch:"B4"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"C5"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"C5"},
      {type:Syms.NOTE_QUARTER_TYPE, pitch:"B4"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"A4"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"G4"},
      {type:Syms.NOTE_QUARTER_TYPE, pitch:"F4"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"E4"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"D4"},
      {type:Syms.NOTE_QUARTER_TYPE, pitch:"C4"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"C4"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"E4"},
      {type:Syms.NOTE_QUARTER_TYPE, pitch:"G4"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"C5"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"E5"},
      {type:Syms.NOTE_QUARTER_TYPE, pitch:"C5"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"G4"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"E4"},
      {type:Syms.NOTE_QUARTER_TYPE, pitch:"C4"}],
    ]
};

export const MajorFPractice={
  name:"f_major_prac",
  signature:"Major",
  scale:"F",
  title:"F Major Practice",
  author:"J Hrimaly",
  notes:[
    [ {type:Syms.NOTE_QUARTER_TYPE, pitch:"F4"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"G4"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"A4"},
      {type:Syms.NOTE_QUARTER_TYPE, pitch:"B4b"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"C5"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"D5"},
      {type:Syms.NOTE_QUARTER_TYPE, pitch:"E5"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"F5"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"F5"},
      {type:Syms.NOTE_QUARTER_TYPE, pitch:"E5"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"D5"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"C5"},
      {type:Syms.NOTE_QUARTER_TYPE, pitch:"B4b"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"A4"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"G4"},
      {type:Syms.NOTE_QUARTER_TYPE, pitch:"F4"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"F4"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"A4"},
      {type:Syms.NOTE_QUARTER_TYPE, pitch:"C5"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"F5"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"A5"},
      {type:Syms.NOTE_QUARTER_TYPE, pitch:"F5"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"C5"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"A4"},
      {type:Syms.NOTE_QUARTER_TYPE, pitch:"F4"}],
    [ {type:Syms.NOTE_QUARTER_TYPE, pitch:"F4"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"G4"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"A4"},
      {type:Syms.NOTE_QUARTER_TYPE, pitch:"B4b"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"C5"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"D5"},
      {type:Syms.NOTE_QUARTER_TYPE, pitch:"E5"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"F5"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"F5"},
      {type:Syms.NOTE_QUARTER_TYPE, pitch:"E5"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"D5"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"C5"},
      {type:Syms.NOTE_QUARTER_TYPE, pitch:"B4b"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"A4"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"G4"},
      {type:Syms.NOTE_QUARTER_TYPE, pitch:"F4"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"F4"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"A4"},
      {type:Syms.NOTE_QUARTER_TYPE, pitch:"C5"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"F5"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"A5"},
      {type:Syms.NOTE_QUARTER_TYPE, pitch:"F5"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"C5"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"A4"},
      {type:Syms.NOTE_QUARTER_TYPE, pitch:"F4"}],
    [ {type:Syms.NOTE_QUARTER_TYPE, pitch:"F4"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"G4"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"A4"},
      {type:Syms.NOTE_QUARTER_TYPE, pitch:"B4b"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"C5"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"D5"},
      {type:Syms.NOTE_QUARTER_TYPE, pitch:"E5"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"F5"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"F5"},
      {type:Syms.NOTE_QUARTER_TYPE, pitch:"E5"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"D5"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"C5"},
      {type:Syms.NOTE_QUARTER_TYPE, pitch:"B4b"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"A4"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"G4"},
      {type:Syms.NOTE_QUARTER_TYPE, pitch:"F4"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"F4"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"A4"},
      {type:Syms.NOTE_QUARTER_TYPE, pitch:"C5"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"F5"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"A5"},
      {type:Syms.NOTE_QUARTER_TYPE, pitch:"F5"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"C5"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"A4"},
      {type:Syms.NOTE_QUARTER_TYPE, pitch:"F4"}],
    [ {type:Syms.NOTE_QUARTER_TYPE, pitch:"F4"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"G4"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"A4"},
      {type:Syms.NOTE_QUARTER_TYPE, pitch:"B4b"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"C5"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"D5"},
      {type:Syms.NOTE_QUARTER_TYPE, pitch:"E5"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"F5"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"F5"},
      {type:Syms.NOTE_QUARTER_TYPE, pitch:"E5"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"D5"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"C5"},
      {type:Syms.NOTE_QUARTER_TYPE, pitch:"B4b"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"A4"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"G4"},
      {type:Syms.NOTE_QUARTER_TYPE, pitch:"F4"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"F4"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"A4"},
      {type:Syms.NOTE_QUARTER_TYPE, pitch:"C5"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"F5"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"A5"},
      {type:Syms.NOTE_QUARTER_TYPE, pitch:"F5"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"C5"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"A4"},
      {type:Syms.NOTE_QUARTER_TYPE, pitch:"F4"}],
  ]
};

export const MajorBFPractice={
  name:"b_flat_major_prac",
  signature:"Major",
  scale:"BF",
  title:"B Flat Major Practice",
  author:"J Hrimaly",
  notes:[
    [ {type:Syms.NOTE_QUARTER_TYPE, pitch:"B3b"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"C4"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"D4"},
      {type:Syms.NOTE_QUARTER_TYPE, pitch:"E4b"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"F4"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"G4"},
      {type:Syms.NOTE_QUARTER_TYPE, pitch:"A4"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"B4b"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"B4b"},
      {type:Syms.NOTE_QUARTER_TYPE, pitch:"A4"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"G4"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"F4"},
      {type:Syms.NOTE_QUARTER_TYPE, pitch:"E4b"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"D4"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"C4"},
      {type:Syms.NOTE_QUARTER_TYPE, pitch:"B3b"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"B3b"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"D4"},
      {type:Syms.NOTE_QUARTER_TYPE, pitch:"F4"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"B4b"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"D5"},
      {type:Syms.NOTE_QUARTER_TYPE, pitch:"B4b"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"F4"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"D4"},
      {type:Syms.NOTE_QUARTER_TYPE, pitch:"B3b"}],
    [ {type:Syms.NOTE_QUARTER_TYPE, pitch:"B3b"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"C4"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"D4"},
      {type:Syms.NOTE_QUARTER_TYPE, pitch:"E4b"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"F4"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"G4"},
      {type:Syms.NOTE_QUARTER_TYPE, pitch:"A4"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"B4b"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"B4b"},
      {type:Syms.NOTE_QUARTER_TYPE, pitch:"A4"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"G4"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"F4"},
      {type:Syms.NOTE_QUARTER_TYPE, pitch:"E4b"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"D4"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"C4"},
      {type:Syms.NOTE_QUARTER_TYPE, pitch:"B3b"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"B3b"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"D4"},
      {type:Syms.NOTE_QUARTER_TYPE, pitch:"F4"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"B4b"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"D5"},
      {type:Syms.NOTE_QUARTER_TYPE, pitch:"B4b"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"F4"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"D4"},
      {type:Syms.NOTE_QUARTER_TYPE, pitch:"B3b"}],
    [ {type:Syms.NOTE_QUARTER_TYPE, pitch:"B3b"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"C4"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"D4"},
      {type:Syms.NOTE_QUARTER_TYPE, pitch:"E4b"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"F4"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"G4"},
      {type:Syms.NOTE_QUARTER_TYPE, pitch:"A4"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"B4b"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"B4b"},
      {type:Syms.NOTE_QUARTER_TYPE, pitch:"A4"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"G4"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"F4"},
      {type:Syms.NOTE_QUARTER_TYPE, pitch:"E4b"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"D4"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"C4"},
      {type:Syms.NOTE_QUARTER_TYPE, pitch:"B3b"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"B3b"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"D4"},
      {type:Syms.NOTE_QUARTER_TYPE, pitch:"F4"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"B4b"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"D5"},
      {type:Syms.NOTE_QUARTER_TYPE, pitch:"B4b"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"F4"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"D4"},
      {type:Syms.NOTE_QUARTER_TYPE, pitch:"B3b"}],
    [ {type:Syms.NOTE_QUARTER_TYPE, pitch:"B3b"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"C4"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"D4"},
      {type:Syms.NOTE_QUARTER_TYPE, pitch:"E4b"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"F4"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"G4"},
      {type:Syms.NOTE_QUARTER_TYPE, pitch:"A4"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"B4b"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"B4b"},
      {type:Syms.NOTE_QUARTER_TYPE, pitch:"A4"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"G4"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"F4"},
      {type:Syms.NOTE_QUARTER_TYPE, pitch:"E4b"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"D4"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"C4"},
      {type:Syms.NOTE_QUARTER_TYPE, pitch:"B3b"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"B3b"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"D4"},
      {type:Syms.NOTE_QUARTER_TYPE, pitch:"F4"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"B4b"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"D5"},
      {type:Syms.NOTE_QUARTER_TYPE, pitch:"B4b"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"F4"},{type:Syms.NOTE_QUARTER_TYPE, pitch:"D4"},
      {type:Syms.NOTE_QUARTER_TYPE, pitch:"B3b"}],
  ]
};
