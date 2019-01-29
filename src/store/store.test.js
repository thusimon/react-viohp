/**
 * Created by Lu on 8/12/2018.
 */
import expect from 'expect';
import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../reducers';
import {courseInitState as initState} from '../reducers/initialState';
import * as courseActions from '../actions/courseActions';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';

describe('Store test', ()=>{
  it('Store should handle creating courses', (done) => {
    const store = createStore(
      rootReducer,
      initState,
      applyMiddleware(thunk, reduxImmutableStateInvariant())
    );

    const newCourse = {
      title:"new course 1"
    };
    const action = courseActions.saveCourse(newCourse);

    store.dispatch(action).then(()=>{
      const actualState = store.getState();
      expect(actualState.courses[0].title).toEqual('new course 1');
      done();
    });
  }).timeout(10000);
});
