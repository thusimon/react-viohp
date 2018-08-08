/**
 * Created by Lu on 8/7/2018.
 */
import {combineReducers} from 'redux';
import courses from './scaleReducer';

const rootReducer = combineReducers({
  courses
});

export default rootReducer;
