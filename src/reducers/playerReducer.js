import * as types from '../actions/actionTypes';
import {playerInitState as initState} from './initialState';
import AudioGenerator from '../components/audio/AudioGenerator';

const audioGenerator = new AudioGenerator();

export default function playerReducer(state=initState, action={}){
  switch (action.type){
    case types.PLAY:
    {
      return Object.assign({}, state, {playing: 1});
    }
    case types.PAUSE:
    {
      return Object.assign({}, state, {playing: 0});
    }
    case types.BACKWARD:
    {
      return Object.assign({}, state, {playing: -2});
    }
    case types.FORWARD:
    {
      return Object.assign({}, state, {playing: 2});
    }
    case types.RESET:
    {
      return Object.assign({}, state, {playing: -1});  
    }
    case types.CHANGE_VOLUME:
    {
      const {vol} = action;
      audioGenerator.setVolume(vol);
      return Object.assign({}, state, {vol});
    }
    case types.PLAY_NOTE: {
      const {sound, freq, time} = action;
      audioGenerator.play(sound, freq, time);
      return state;
    }
    default:
      return state;
  }
}
