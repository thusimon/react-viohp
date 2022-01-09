import * as types from './actionTypes';

export const toggleScorePicker = () => {
  return {type:types.SCORE_PICKER_TOGGLE};
}

export const toggleSpectrumFilter = () => {
  return {type:types.SPECTRUM_FILTER_TOGGLE};
}

export const toggleSpectrumSetting = () => {
  return {type:types.SPECTRUM_SETTING_TOGGLE};
}

export const togglePrepareTimer = () => {
  return {type:types.PREPARE_TIMER_TOGGLE};
}
