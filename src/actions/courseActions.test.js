/**
 * Created by Lu on 8/11/2018.
 */
import expect from 'expect';
import * as courseActions from './courseActions';
import * as types from './actionTypes';

import thunk from 'redux-thunk';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';


describe('Course Actions test', ()=>{
  describe('create course success', ()=>{
    it('should create a CREATE_COURSE_SUCCESS', ()=>{
      const course={id:'clean-code', title:"Clean Code"};
      const expectedAction = {
        type: types.CREATE_COURSE_SUCCESS,
        course
      };

      const action = courseActions.createCourseSuccess(course);

      expect(action).toEqual(expectedAction);
    });
  });
});

const middleWare = [thunk];
const mockStore = configureMockStore(middleWare);
describe('Async Actions', ()=>{
  afterEach(()=>{
    nock.cleanAll();
  });

  it('should create ajax call and load course success', (done)=>{
    // example call to nock
    nock('http://localhost:3000')
      .get('/courses')
      .reply(200, {body: {course:[{id:1, firstName:'Cory', lastName:'House'}]}});

    const expectedActions = [
      {type: types.BEGIN_AJAX_CALL},
      {type: types.LOAD_COURSES_SUCCESS, body:{courses:[{id:'clean-code', title:'Clean Code'}]}}
    ];

    const store = mockStore({courses:[]}, expectedActions);
    store.dispatch(courseActions.loadCourses()).then(()=>{
      const actions = store.getActions();
      expect(actions[0].type).toEqual(types.BEGIN_AJAX_CALL);
      expect(actions[1].type).toEqual(types.LOAD_COURSES_SUCCESS);
      done();
    });
  });
});
