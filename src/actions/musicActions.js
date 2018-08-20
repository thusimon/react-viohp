import * as types from './actionTypes';

export const generateScaleHeads = (scaleHead) => {
  return {type:types.GENERATE_SCALE_HEAD, scaleHead};
};

export const addNotes = (notes) => {
  return {type:types.ADD_NOTES, notes};
};
