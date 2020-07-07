/**
 * Created by Lu on 8/7/2018.
 */
import {combineReducers} from 'redux';
import musicReducer from './musicReducer';
import audioReducer from './audioReducer';
import playerReducer from './playerReducer';
import modalReducer from './modalReducer';
import authReducer from './authReducer';
import wsReducer from './wsReducer';

const rootReducer = combineReducers({
  music: musicReducer,
  audio: audioReducer,
  player: playerReducer,
  modal: modalReducer,
  auth: authReducer,
  ws: wsReducer
});

export default rootReducer;
