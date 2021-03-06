import * as types from './actionTypes';

export const setSignatureScale = (signature, scale) => {
  return {type:types.SET_SIGNA_SCALE, signature, scale};
};

export const addNote = (note, idx) => {
  return {type:types.ADD_NOTE, note, idx};
};

export const clearAllNotes = () => {
  return {type:types.CLEAR_ALL_NOTES};
};

export const loadScore = (score) => {
  return {type:types.LOAD_SCORE, scoreInfo:{title:score.title, author:score.author, scale:score.scale, signature:score.signature}, notes:score.notes};
};

export const clickNote = (markNote) => {
  return {type:types.NOTE_CLICK, markNote};
};

export const noteDrag = (dragInfo) => {
  return {type:types.NOTE_DRAG, dragInfo};
};

export const showFreqLine = (freqLineVal)=>{
  return {type:types.SHOW_FREQLINE, freqLineVal};
};

export const setScoreRaw = (score) => {
  return {type: types.SET_SCORE, score}
}

export const setScore = (category, id)=>{
  return {type: types.SET_SCORE_ID, category, id};
};

export const resetScore = () => {
  return {type: types.RESET_SCORE};
};

export const setScoreList = (scoreList)=>{
  return {type: types.SET_SCORE_LIST, scoreList};
};

export const updateScoreInfo = (name, value) => {
  return {type: types.UPDATE_SCORE_INFO, name, value};
};

export const updateScoreNotes = (notes) => {
  return {type: types.UPDATE_SCORE_NOTES, notes};
};
