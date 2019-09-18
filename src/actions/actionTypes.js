/**
 * Created by Lu on 8/7/2018.
 */
//course action types
export const CREATE_COURSE = 'CREATE_COURSE';
export const CREATE_COURSE_SUCCESS = 'CREATE_COURSE_SUCCESS';
export const UPDATE_COURSE_SUCCESS = 'UPDATE_COURSE_SUCCESS';
export const LOAD_COURSES_SUCCESS = 'LOAD_COURSES_SUCCESS';
export const LOAD_AUTHORS_SUCCESS = 'LOAD_AUTHORS_SUCCESS';

//ajax action types
export const BEGIN_AJAX_CALL = 'BEGIN_AJAX_CALL';
export const AJAX_CALL_ERROR = 'AJAX_CALL_ERROR';

//music action types
export const SET_SIGNA_SCALE = 'SET_SIGNA_SCALE';
export const ADD_NOTE = 'ADD_NOTE';
export const LOAD_SCORE = 'LOAD_SCORE';
export const CLEAR_ALL_NOTES = 'CLEAR_ALL_NOTES';
export const NOTE_CLICK = 'NOTE_CLICK';
export const NOTE_DRAG = 'NOTE_DRAG';
export const SHOW_FREQLINE = "SHOW_FREQLINE";
export const SET_SCORE_NAME = 'SET_SCORE_NAME';
export const SET_SCORE_LIST = 'SET_SCORE_LIST';

//audio action types
export const DISPLAY_INFO = 'DISPLAY_INFO';
export const SAVE_SETTINGS = 'SAVE_SETTINGS';
export const SET_AUDIO_PARAM = 'SET_AUDIO_PARAM';

export const LOAD_FILTER_SUCCESS = 'LOAD_FILTER_SUCCESS';
export const ADD_FILTER_POINT = 'ADD_FILTER_POINT';
export const REMOVE_FILTER_POINT = 'REMOVE_FILTER_POINT';
export const SAVE_FILTER_POINTS = 'SAVE_FILTER_POINTS';
export const APPLY_FILTER = 'APPLY_FILTER';

//player action types
export const PLAY = 'PLAY';
export const BACKWARD = 'BACKWARD';
export const FORWARD = 'FORWARD';
export const RESET_SEEK = 'RESET_SEEK';
export const PAUSE = 'PAUSE';
export const CHANGE_VOLUME = 'CHANGE_VOLUME';