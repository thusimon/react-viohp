import * as types from '../actions/actionTypes';
import {modalInitState as initState} from './initialState';

export interface ModalState {
  type?: string;
  scorePickerDisplay?: boolean;
  spectrumSettingDisplay?: boolean;
  spectrumFilterDisplay?: boolean;
  prepareTimerDisplay?: boolean;
}

const modalReducer = (state=initState, action: ModalState = {}) => {
  switch (action.type) {
    case types.SCORE_PICKER_TOGGLE: {
      const toggled = !state.scorePickerDisplay;
      return {...state, ...{scorePickerDisplay: toggled}};
    }
    case types.SPECTRUM_SETTING_TOGGLE: {
      const toggled = !state.spectrumSettingDisplay;
      return {...state, ...{spectrumSettingDisplay: toggled}};
    }
    case types.SPECTRUM_FILTER_TOGGLE: {
      const toggled = !state.spectrumFilterDisplay;
      return {...state, ...{spectrumFilterDisplay: toggled}};
    }
    case types.PREPARE_TIMER_TOGGLE: {
      const toggled = !state.prepareTimerDisplay;
      return {...state, ...{prepareTimerDisplay: toggled}};
    }
    default:{
      return state;
    }
  }
}

export default modalReducer;
