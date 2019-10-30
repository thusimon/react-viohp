/**
 * Created by Lu on 8/11/2018.
 */
import expect from 'expect';
import courseReducer from './courseReducer';
import * as actions from '../actions/courseActions';

describe('Course Reducer Test', ()=>{
  it('should create course when receive create action', ()=>{
    const initCourses = [
      {title: 'Course A'},
      {title: 'Course B'}
    ];
    const newCourse = {title:'Course C'};
    const expectedCourses = [
      ...initCourses,
      Object.assign({},newCourse)
    ];
    const newCourses = courseReducer(initCourses, actions.createCourseSuccess(newCourse));
    expect(newCourses.length).toEqual(3);
    expect(newCourses).toEqual(expectedCourses);
  });

  it('should update course when receive create action', ()=>{
    const initCourses = [
      {id: 'A', title: 'Course A'},
      {id: 'B', title: 'Course B'},
      {id: 'C', title: 'Course C'}
    ];
    const updateCourse = {id: 'B', title:'new Course B'};
    const updatedCourses = courseReducer(initCourses, actions.updateCourseSuccess(updateCourse));
    expect(updatedCourses.length).toEqual(3);
    expect(updatedCourses.find(a=>a.id=='B').title).toEqual('new Course B');
  });

});
