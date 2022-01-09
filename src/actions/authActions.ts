import * as types from './actionTypes';

export const setUser = (user) => {
  return {type: types.SET_USER, user};
}