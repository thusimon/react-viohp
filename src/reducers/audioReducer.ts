import * as types from '../actions/actionTypes';
import {audioInitState as initState} from './initialState';

export interface AudioState {
  type?: string;
  peakEnergy?: number;
  peakFreq?: number;
  noteColor?: string;
  noteName?: string;
  noteFreq?: number;
  sampleRate?: number;
  fftSize?: number;
  threshold?: number;
  tolerance?: number;
  freqRange?: number[];
  filters?: [];
  x?: number;
  y?: number;
  xpoints?: number[];
  ypoints?: number[];
  appliedFiltername?: string
  appliedFilter?: [];
  analyzeState?: number;
  spectrumData?: [];
};

export default function audioReducer(state=initState, action: AudioState={}){
  switch (action.type){
    case types.DISPLAY_INFO:
    {
      let {peakEnergy, peakFreq, noteColor, noteName, noteFreq} = action;
      return Object.assign({}, state, {peakEnergy, peakFreq, noteColor, noteName, noteFreq});
    }
    case types.SET_AUDIO_PARAM:
    {
      let {sampleRate, fftSize} = action;
      return Object.assign({}, state, {sampleRate, fftSize});
    }
    case types.SAVE_SETTINGS:
    {
      let {threshold, tolerance,freqRange} = action;
      return Object.assign({}, state, {threshold, tolerance,freqRange});
    }
    case types.ADD_FILTER_POINT:
    {
      let {x, y} = action;
      let currentFilterPoints = state.filterPoints.push([x,y]);
      return Object.assign({}, state, {filterPoints: currentFilterPoints});
    }
    case types.LOAD_FILTER_SUCCESS:
    {
      // audio filters loaded successfully
      let filters = action.filters;
      // should clear the reqStatus
      return Object.assign({}, state, {filters, filters_AJAXFlag:0});
    }
    case types.APPLY_FILTER: {
      let {appliedFiltername, appliedFilter} = action;
      return Object.assign({...state}, {appliedFilter, appliedFiltername});
    }
    case types.ANALYZE_AUDIO: {
      const {analyzeState} = action;
      return Object.assign({}, state, {analyzeState});
    }
    case types.SPECTRUM_DATA: {
      const { spectrumData } = action;
      return Object.assign({...state}, { spectrumData });
    }
    default:
      return state;
  }
}
