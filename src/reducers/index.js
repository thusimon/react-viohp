/**
 * Created by Lu on 8/7/2018.
 */
import {combineReducers} from 'redux';
import courses from './courseReducer';
import authors from './authorReducer';

const rootReducer = combineReducers({
  courses,
  authors
});

export default rootReducer;
