import * as types from '../actions/actionTypes';
import {scoreInitState as initState} from './initialState';
import {updateMarkNote} from '../components/musicStaff/Utils';
import Score from '../data/scores/Score';
import {newScore} from '../data/scores/Score_template';

export interface ScoreState {
  type?: string;
  idx?: string;
  note?: string;
  scale?: string;
  signature?: string;
  scoreInfo?: any;
  notes?: any[];
  originalNotes?: any[];
  markNote?: boolean;
  dragInfo?: any;
  freqLineVal?: number;
  score?: any;
  id?: string;
  category?: string;
  scoreList?: any[];
  name?: string;
  value?: string;
}

const scoreReducer = (state=initState, action: ScoreState = {}) => {
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
      let {scale, signature, scoreInfo, notes} = action;
      return Object.assign({}, state, {scale, signature, scoreInfo, notes});
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
      let scoreInfo = {title:score.title, author:score.author, signature: score.signature, scale: score.scale};
      return Object.assign({}, state, {id: score.id, scoreInfo, notes:score.notes, originalNotes:score.originalNotes});
    }
    case types.SET_SCORE_ID:
    {
      let {category, id} = action;
      const scoreList = state.scoreList ? state.scoreList[category] : [];
      const scoreData = scoreList.filter(score=>score._id==id)[0];
      if (scoreData){
        const score = new Score(scoreData);
        let scoreInfo = {title:score.title, author:score.author, signature: score.signature, scale: score.scale};
        return Object.assign({}, state, {id, scoreInfo, notes:score.notes, originalNotes: score.originalNotes});
      } else {
        // no score
        return Object.assign({}, state, {id});
      }
    }
    case types.RESET_SCORE: {
      const score = new Score(newScore);
      let scoreInfo = {title:score.title, author:score.author, signature: score.signature, scale: score.scale};
      return Object.assign({}, state, {id: null, scoreInfo, notes:score.notes, originalNotes: score.originalNotes});
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
      let scoreInfo = Object.assign({}, state.scoreInfo, {[name]: value});
      return Object.assign({}, state, {scoreInfo});  
    }
    case types.UPDATE_SCORE_NOTES:
    {
      const {notes} = action;
      const {signature, scale, author, title} = state.scoreInfo;
      const score = new Score({signature, scale, author, title, notes});
      return Object.assign({}, state, {notes: score.notes, notesToSave: score.originalNotes});
    }
    default:
      return state;
  }
};

export default scoreReducer;
