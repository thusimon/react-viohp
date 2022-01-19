import * as types from '../actions/actionTypes';
import {authInitState as initState} from './initialState';

export interface AuthState {
  type?: string;
  user?: {
    _id: string;
  };
}

export default function authReducer(state=initState, action: AuthState = {}){
  switch (action.type){
    case types.SET_USER:
    {
      return Object.assign({}, state, {user: action.user});
    }
    default:
      return state;
  }
}
