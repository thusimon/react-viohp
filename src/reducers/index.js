/**
 * Created by Lu on 8/7/2018.
 */
import {combineReducers} from 'redux';
import courses from './courseReducer';
import authors from './authorReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';
import musicReducer from './musicReducer';
import audioReducer from './audioReducer';
import playerReducer from './playerReducer';

const rootReducer = combineReducers({
  courses,
  authors,
  ajaxCallsInProgress,
  music: musicReducer,
  audio: audioReducer,
  player: playerReducer
});

export default rootReducer;
