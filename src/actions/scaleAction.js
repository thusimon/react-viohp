/**
 * Created by Lu on 8/7/2018.
 */
import * as types from './actionTypes';

export function createCourse(course) {
  return {type:types.CREATE_COURSE, course};
}
