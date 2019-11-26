import * as types from './actionTypes';

export const play = () => {
    return {type: types.PLAY};
};

export const pause = () => {
    return {type: types.PAUSE};
};

export const reset = () => {
    return {type: types.RESET};
};

export const backward = () => {
    return {type: types.BACKWARD};
};

export const forward = () => {
    return {type: types.FORWARD};
};

export const changeVolume = (vol) => {
    return {type: types.CHANGE_VOLUME, vol};
};

export const playNote = (sound, freq, time) => {
    return {type: types.PLAY_NOTE, sound, freq, time};
}