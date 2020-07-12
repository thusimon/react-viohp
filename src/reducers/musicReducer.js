/**
 * Created by Lu on 8/19/2018.
 */
import * as types from '../actions/actionTypes';
import {musicInitState as initState} from './initialState';
import {updateMarkNote} from '../components/musicStaff/Utils';
import Score from '../data/scores/Score';
import {newScore} from '../data/scores/Score_template';

const musicReducer = (state=initState, action={}) => {
  switch (action.type) {
    case types.ADD_NOTE:
    {
      let staffIdx = action.idx;
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
    {
      let markNotesUpdate = updateMarkNote([...state.markNotes], action.markNote);
      return Object.assign({}, state, {markNotes: markNotesUpdate});
    }
    case types.NOTE_DRAG:
      return Object.assign({}, state, {dragInfo: action.dragInfo});
    case types.SHOW_FREQLINE:
      return Object.assign({}, state, {freqLineVal: action.freqLineVal});
    case types.SET_SCORE: {
      let scoreData = action.score;
      const score = new Score(scoreData);
      let musicInfo = {title:score.title, author:score.author, signature: score.signature, scale: score.scale};
      return Object.assign({}, state, {id: score.id, musicInfo, notes:score.notes, originalNotes:score.originalNotes});
    }
    case types.SET_SCORE_ID:
    {
      let {category, id} = action;
      const scoreList = state.scoreList ? state.scoreList[category] : [];
      const scoreData = scoreList.filter(score=>score._id==id)[0];
      if (scoreData){
        const score = new Score(scoreData);
        let musicInfo = {title:score.title, author:score.author, signature: score.signature, scale: score.scale};
        return Object.assign({}, state, {id, musicInfo, notes:score.notes, originalNotes: score.originalNotes});
      } else {
        // no score
        return Object.assign({}, state, {id});
      }
    }
    case types.RESET_SCORE: {
      const score = new Score(newScore);
      let musicInfo = {title:score.title, author:score.author, signature: score.signature, scale: score.scale};
      return Object.assign({}, state, {id: null, musicInfo, notes:score.notes, originalNotes: score.originalNotes});
    }
    case types.SET_SCORE_LIST:
    {
      return Object.assign({}, state, {scoreList:{
        ...state.scoreList,
        ...action.scoreList
      }}); 
    }
    case types.UPDATE_SCORE_INFO:
    {
      let {name, value} = action;
      let musicInfo = Object.assign({}, state.musicInfo, {[name]: value});
      return Object.assign({}, state, {musicInfo});  
    }
    case types.UPDATE_SCORE_NOTES:
    {
      const {notes} = action;
      const {signature, scale, author, title} = state.musicInfo;
      const score = new Score({signature, scale, author, title, notes});
      return Object.assign({}, state, {notes: score.notes, notesToSave: score.originalNotes});
    }
    default:
      return state;
  }
};

export default musicReducer;
