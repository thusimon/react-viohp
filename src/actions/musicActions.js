import * as types from './actionTypes';

export const generateScaleHeads = (scaleHead) => {
  return {type:types.GENERATE_SCALE_HEAD, scaleHead};
};

export const addNotes = (notes) => {
  return {type:types.ADD_NOTES, notes};
};

export const showScaleNotes = (scaleNotes) => {
  return {type:types.SHOW_SCALE_NOTES, scaleNotes};
};

export const clearAllNotes = () => {
  return {type:types.CLEAR_ALL_NOTES};
};

export const clickNote = (markNote) => {
  return {type:types.NOTE_CLICK, markNote};
};

export const noteDrag = (dragInfo) => {
  return {type:types.NOTE_DRAG, dragInfo};
};
