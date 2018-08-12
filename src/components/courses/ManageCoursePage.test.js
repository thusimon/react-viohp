/**
 * Created by Lu on 8/11/2018.
 */
import expect from 'expect';
import React from 'react';
import Enzyme, {mount, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {ManageCoursePage} from './ManageCoursePage';

Enzyme.configure({ adapter: new Adapter() });

describe('Manage Course Page', () => {
  it('sets error message when saving empty title', ()=>{
    const props = {
      authors:[],
      actions:{saveCourse: ()=> {return Promise.resolve();}},
      course:{id:"", watchHref:"", title:"", authorId:"", length:"", cagetory:""}
    };
    const wrapper = mount(<ManageCoursePage {...props} />);
    const saveButton = wrapper.find('input').last();
    expect(saveButton.prop('type')).toBe('submit');
    saveButton.simulate('click');

  });
});
