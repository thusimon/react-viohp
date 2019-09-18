import * as types from './actionTypes';

export const play = () => {
    return {type: types.PLAY};
};

export const pause = () => {
    return {type: types.PAUSE};
};

export const backward = () => {
    return {type: types.BACKWARD};
};

export const forward = () => {
    return {type: types.FORWARD};
};

export const resetSeek = () => {
    return {type: types.RESET_SEEK};
};

export const changeVolume = (vol) => {
    return {type: types.CHANGE_VOLUME, vol};
};