/**
 * Created by Lu on 8/7/2018.
 */
import * as types from '../actions/actionTypes';
import initState from './initialState';

export default function coursesReducer(state = initState.courses, action = {}){
  switch (action.type){
    case types.CREATE_COURSE:
      return [...state,
        Object.assign({},action.course)
      ];
    case types.LOAD_COURSES_SUCCESS:
      return action.courses;
    case types.CREATE_COURSE_SUCCESS:
      return [...state,
        Object.assign({},action.course)
      ];
    case types.UPDATE_COURSE_SUCCESS:
      return [...state.filter(course => course.id !== action.course.id),
        Object.assign({},action.course)
      ];
    default:
      return state;
  }
}
