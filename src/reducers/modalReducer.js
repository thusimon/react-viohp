import * as types from '../actions/actionTypes';
import {modalInitState as initState} from './initialState';

const modalReducer = (state=initState, action={}) => {
  switch (action.type) {
    case types.SCORE_PICKER_TOGGLE: {
      const toggled = !state.scorePickerDisplay;
      return {...state, ...{scorePickerDisplay: toggled}};
    }
    default:{
      return state;
    }
  }
}

export default modalReducer;
