import * as types from './actionTypes';

export const generateScaleHeads = (scaleHead, signature, scale) => {
  return {type:types.GENERATE_SCALE_HEAD, scaleHead, signature, scale};
};

export const addNote = (note) => {
  return {type:types.ADD_NOTE, note};
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
