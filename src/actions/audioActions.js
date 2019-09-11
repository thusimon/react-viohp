/**
 * Created by Lu on 10/31/2018.
 */
import * as types from './actionTypes';
import mockAudioApi from '../api/mockAudioApi';

export const beginAjaxCall = (reqType)=>{
  return {type: types.BEGIN_AJAX_CALL, reqType};
};

export const displayInfo = (peakEnergy, peakFreq, noteColor, noteName, noteFreq)=>{
  return {type:types.DISPLAY_INFO, peakEnergy, peakFreq, noteColor, noteName, noteFreq};
};

export const setAudioParam = (sampleRate,fftSize)=>{
  return {type:types.SET_AUDIO_PARAM, sampleRate,fftSize};
};

export const saveSettings = (threshold, tolerance, freqRange)=>{
  return {type:types.SAVE_SETTINGS, threshold, tolerance, freqRange};
};

export const loadFiltersSuccess = (filters) => {
  return {type: types.LOAD_FILTER_SUCCESS, filters};
};

//TODO why loadAllFitlers returns a function, but not an object like others?????
export const loadAllFilters = ()=>{
  return function(dispatch) {
    dispatch(beginAjaxCall("filters"));
    return mockAudioApi.getAllFilters().then(filters=>{
      dispatch(loadFiltersSuccess(filters));
    }).catch(err=>{
      throw err;
    });
  };
};
export const addFilterPoint = (x, y)=>{
  return {type:types.ADD_FILTER_POINT, x, y};
};

export const removeFilterPoint = ()=>{
  return {type:types.REMOVE_FILTER_POINT};
};

export const saveFilterPoints = (xpoints, ypoints)=>{
  return {type:types.SAVE_FILTER_POINTS, xpoints, ypoints};
};

export const applyFilter = (appliedFiltername, appliedFilter) => {
  return {type:types.APPLY_FILTER, appliedFiltername, appliedFilter};
};