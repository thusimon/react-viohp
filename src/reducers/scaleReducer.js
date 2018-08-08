/**
 * Created by Lu on 8/7/2018.
 */
import * as types from '../actions/actionTypes';

export default function scaleReducer(state = [], action = {}){
  switch (action.type){
    case types.CREATE_COURSE:
      return [...state,
        Object.assign({},action.course)
      ];
    default:
      return state;
  }
}
