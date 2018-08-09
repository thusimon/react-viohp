/**
 * Created by Lu on 8/7/2018.
 */
import * as types from './actionTypes';
import courseApi from '../api/mockCourseApi';

export function createCourse(course) {
  return {type:types.CREATE_COURSE, course};
}

export function loadCourseSuccess(courses) {
  return {type:types.LOAD_COURSE_SUCCESS, courses};
}

export function loadCourses() {
  return function(dispatch) {
    return courseApi.getAllCourses().then(courses => {
      dispatch(loadCourseSuccess(courses));
    }).catch(err => {
      throw(err);
    });
  };
}
