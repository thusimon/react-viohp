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
  return {type:types.LOAD_SCORE, musicInfo:{title:score.title, author:score.author}, scale:score.scale, signature:score.signature, notes:score.notes}
};

export const clickNote = (markNote) => {
  return {type:types.NOTE_CLICK, markNote};
};

export const noteDrag = (dragInfo) => {
  return {type:types.NOTE_DRAG, dragInfo};
};

export const showFreqLine = (freqLineVal)=>{
  return {type:types.SHOW_FREQLINE, freqLineVal}
};

export const setScore = (scoreName)=>{
  return {type: types.SET_SCORE_NAME, scoreName}
};

export const setScoreList = (scoreList)=>{
  return {type: types.SET_SCORE_LIST, scoreList}
};
