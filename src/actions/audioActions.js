/**
 * Created by Lu on 10/31/2018.
 */
import * as types from './actionTypes';

export const displayInfo = (peakEnergy, peakFreq, noteColor, noteName, noteFreq)=>{
  return {type:types.DISPLAY_INFO, peakEnergy, peakFreq, noteColor, noteName, noteFreq}
};

export const displaySampleRate = (sampleRate)=>{
  return {type:types.DISPLAY_SAMPLERATE, sampleRate}
};

export const saveSettings = (threshold, tolerance, freqRange)=>{
  return {type:types.SAVE_SETTINGS, threshold, tolerance, freqRange};
};
