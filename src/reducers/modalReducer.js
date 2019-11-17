import * as types from '../actions/actionTypes';
import {modalInitState as initState} from './initialState';

const modalReducer = (state=initState, action={}) => {
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
    default:{
      return state;
    }
  }
}

export default modalReducer;
