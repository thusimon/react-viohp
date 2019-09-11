/**
 * Created by Lu on 8/7/2018.
 */
import {combineReducers} from 'redux';
import musicReducer from './musicReducer';
import audioReducer from './audioReducer';
import playerReducer from './playerReducer';

const rootReducer = combineReducers({
  music: musicReducer,
  audio: audioReducer,
  player: playerReducer
});

export default rootReducer;
