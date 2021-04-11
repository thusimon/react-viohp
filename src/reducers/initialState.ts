/**
 * Created by Lu on 8/9/2018.
 */
export const scoreInitState = {
  notes:[[],[],[]],
  originalNotes: [[],[],[]],
  markNotes:[],
  dragInfo: {dragStatus:-1, dragNoteName:"C", startOffSet:[0,0], noteShift:[0,0]},
  freqLineVal:-1,
  scoreInfo:{
    signature : 'Major', 
    scale : 'C',
    title: 'Score Title',
    author: 'author'
  },
  scoreId:"",
  name:"",
  scoreList:{}
};

export const staffInitState = {
  config: {
    showNoteName: true,
    showStaffIndex: true,
    showAudioSpectrum: false
  }
}

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
  filters:{},
  analyzeState: false
};

export const playerInitState = {
  playing: -1,
  vol: 0.1
};

export const modalInitState = {
  scorePickerDisplay: false,
  spectrumFilterDisplay: false,
  spectrumSettingDisplay: false,
  prepareTimerDisplay: false
}

export const authInitState = {
  user: null
}

export const wsInitState = {
  ws: null,
  updateTime: null
}