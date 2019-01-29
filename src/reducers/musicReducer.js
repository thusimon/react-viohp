/**
 * Created by Lu on 8/19/2018.
 */
import * as types from '../actions/actionTypes';
import {musicInitState as initState} from './initialState';
import {getScoreByName} from '../data/scores/Utils';
import {updateMarkNote} from '../components/musicStaff/Utils';

const musicReducer = (state=initState, action={}) => {
  switch (action.type) {
    case types.ADD_NOTE:
    {
      let staffIdx = action.idx;
      let newNote = action.note;
      let curNotes = [...state.notes];
      let curStaffNotes = Object.assign({},curNotes[staffIdx]);
      let noteKeys = Object.keys(curStaffNotes);
      let newKey = noteKeys.length;
      curStaffNotes[newKey] = action.note;
      curNotes[staffIdx] = curStaffNotes;
      return Object.assign({}, state, {notes: curNotes});
    }
    case types.LOAD_SCORE:
    {
      let {scale, signature, musicInfo, notes} = action;
      return Object.assign({}, state, {scale, signature, musicInfo, notes});
    }
    case types.SET_SIGNA_SCALE:
      return Object.assign({}, state, {signature:action.signature, scale:action.scale});
    case types.CLEAR_ALL_NOTES:
      return Object.assign({}, state, {notes:[{},{},{},{}], markNotes:[]});
    case types.NOTE_CLICK:
      return Object.assign({}, state, {markNotes: updateMarkNote([...state.markNotes], action.markNote)});
    case types.NOTE_DRAG:
      return Object.assign({}, state, {dragInfo: action.dragInfo});
    case types.SHOW_FREQLINE:
      return Object.assign({}, state, {freqLineVal: action.freqLineVal});
    case types.SET_SCORE_NAME:
    {
      let scoreName = action.scoreName;
      let score = getScoreByName(scoreName);
      if (score){
        // find the score
        let musicInfo = {title:score.title, author:score.author};
        let {signature, scale} = score;
        return Object.assign({}, state, {scoreName, musicInfo, notes:score.notes, signature, scale});
      } else {
        // no score
        return Object.assign({}, state, {scoreName});
      }
    }
    case types.SET_SCORE_LIST:
      return Object.assign({}, state, {scoreList:action.scoreList});
    default:
      return state;
  }
};

export default musicReducer;
