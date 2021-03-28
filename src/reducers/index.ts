/**
 * Created by Lu on 8/7/2018.
 */
import {combineReducers} from 'redux';
import scoreReducer from './scoreReducer';
import staffReducer from './staffReducer';
import audioReducer from './audioReducer';
import playerReducer from './playerReducer';
import modalReducer from './modalReducer';
import authReducer from './authReducer';
import wsReducer from './wsReducer';

const rootReducer = combineReducers({
  score: scoreReducer,
  staff: staffReducer,
  audio: audioReducer,
  player: playerReducer,
  modal: modalReducer,
  auth: authReducer,
  ws: wsReducer
});

export default rootReducer;
