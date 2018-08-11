/**
 * Created by Lu on 8/9/2018.
 */
import AuthorApi from '../api/mockAuthorApi';
import * as types from './actionTypes';
import {beginAjaxCall} from './ajaxStatusActions';

export function loadAuthorsSuccess(authors){
  return {type: types.LOAD_AUTHORS_SUCCESS, authors};
}

export function loadAuthors(){
  return dispatch => {
    dispatch(beginAjaxCall());
    return AuthorApi.getAllAuthors().then(authors => {
      dispatch(loadAuthorsSuccess(authors));
    }).catch (err => {
      throw(err);
    });
  };
}
