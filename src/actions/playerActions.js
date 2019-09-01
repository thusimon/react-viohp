import * as types from './actionTypes';

export const initScore = (scoreName)=>{
    return {type: types.INIT_SCORE, scoreName}
}