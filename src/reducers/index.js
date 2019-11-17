/**
 * Created by Lu on 8/7/2018.
 */
import {combineReducers} from 'redux';
import musicReducer from './musicReducer';
import audioReducer from './audioReducer';
import playerReducer from './playerReducer';
import modalReducer from './modalReducer';

const rootReducer = combineReducers({
  music: musicReducer,
  audio: audioReducer,
  player: playerReducer,
  modal: modalReducer
});

export default rootReducer;
