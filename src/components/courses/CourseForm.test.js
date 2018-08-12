/**
 * Created by Lu on 8/11/2018.
 */
import expect from 'expect';
import React from 'react';
import Enzyme, {mount, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CourseForm from './CourseForm';

Enzyme.configure({ adapter: new Adapter() });

function setup(saving){
  let props={
    course:{},
    saving: saving,
    errors: {},
    onSave: ()=>{},
    onChange: ()=>{}
  };
  return shallow(<CourseForm {...props} />);
}

describe('CourseForm test via Enzyme', ()=> {
  it('renders form', ()=> {
    const wrapper = setup(false);
    expect(wrapper.find('form').length).toBe(1);
  });
  it('save button is labeled "Save" when not saving', ()=>{
    const wrapper = setup(false);
    expect(wrapper.find('input').props().value).toBe('Save');
  });
  it('save button is labeled "Save..." when saving', ()=>{
    const wrapper = setup(true);
    expect(wrapper.find('input').props().value).toBe('Saving...');
  });
});
