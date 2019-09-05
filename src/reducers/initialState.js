/**
 * Created by Lu on 8/9/2018.
 */
import * as MusicConstants from '../components/musicStaff/Constants';

export const courseInitState = {
  authors:[],
  courses:[],
  ajaxCallsInProgress: 0
};

export const musicInitState = {
  notes:[{},{},{},{}],
  markNotes:[],
  dragInfo: {dragStatus:-1, dragNoteName:"C", startOffSet:[0,0], noteShift:[0,0]},
  signature : 'Major',
  scale : 'C',
  freqLineVal:-1,
  musicInfo:{},
  scoreName:""
};

export const audioInitState = {
  sampleRate: 48000,
  peakEnergy: 0,
  noteColor: "#00FF00",
  peakFreq: "0",
  noteName: "--",
  noteFreq: "--",
  threshold: 100, // if the spectrum power is less than threshold, consider as noise
  tolerance: 5, // the spectrum peak's freq is x, find the pitch between [x-5, x+5]
  freqRange: [180, 1000], //the frequency range to display the spectrum position 1, note frequency g3=196Hz, b5=988Hz
  filters_AJAXFlag: 0,
  filters:{}
};

export const scoreInitState = {
  name:"",
  scoreList:[]
};

export const playerInitState = {
  playing: -1,
  seek: 0
}