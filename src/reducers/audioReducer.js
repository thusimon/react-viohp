/**
 * Created by Lu on 10/31/2018.
 */
import * as types from '../actions/actionTypes';
import {audioInitState as initState} from './initialState';

export default function audioReducer(state=initState, action={}){
  switch (action.type){
    case types.DISPLAY_INFO:
    {
      let {peakEnergy, peakFreq, noteColor, noteName, noteFreq} = action;
      return Object.assign({}, state, {peakEnergy, peakFreq, noteColor, noteName, noteFreq});
    }
    case types.DISPLAY_SAMPLERATE:
      return Object.assign({}, state, {sampleRate:action.sampleRate});
    default:
      return state;
  }
}
