/**
 * Created by Lu on 8/9/2018.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseActions';
import {connect} from 'react-redux';
import CourseForm from './CourseForm';
import {authorsFormatted} from '../../selectors/selectors';
import toastr from 'toastr';

export class ManageCoursePage extends React.Component {
  constructor(props, context){
    super(props, context);

    this.state = {
      course: Object.assign({}, this.props.course),
      errors: {},
      saving: false
    };

    this.updateCourseState = this.updateCourseState.bind(this);
    this.courseFormIsValid = this.courseFormIsValid.bind(this);
    this.saveCourse = this.saveCourse.bind(this);
    this.redirectOnSaveSuccess = this.redirectOnSaveSuccess.bind(this);
  }

  static getDerivedStateFromProps(nextProps){
    if(this.props.course.id != nextProps.course.id){
      //necessary to populate form when existing course is loaded
      return {course:Object.assign({}, nextProps.course)};
    }
  }

  updateCourseState(event){
    const field = event.target.name;
    let course = this.state.course;
    course[field] = event.target.value;
    return this.setState({course});
  }

  courseFormIsValid() {
    let formIsValid = true;
    let errors = {};

    if (this.state.course.title.length<5){
      errors.title = "Title must be at least 5 characters.";
      formIsValid = false;
    }
    this.setState({errors:errors});
    return formIsValid;
  }
  saveCourse(event){
    event.preventDefault();
    if (!this.courseFormIsValid()){
      return;
    }
    this.setState({saving: true});
    this.props.actions.saveCourse(this.state.course)
      .then(()=> this.redirectOnSaveSuccess())
      .catch(err => {
        toastr.error(err);
        this.setState({saving: false});
      });
  }

  redirectOnSaveSuccess() {
    this.setState({saving: false});
    toastr.success('Course Saved');
    this.props.history.push('/courses');
  }

  render(){
    return (
      <div>
        <h1>Manage Course</h1>
        <CourseForm
          allAuthors={this.props.authors}
          onChange={this.updateCourseState}
          onSave={this.saveCourse}
          course={this.state.course}
          errors={this.state.errors}
          saving={this.state.saving}
          />
      </div>
    );
  }
}

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  history: PropTypes.object
};

function getCourseById(courses, id){
  const course = courses.filter(course => course.id == id);
  if (course){
    return course[0];
  } else {
    return null;
  }
}

function mapStateToProps(state, ownProps){
  const courseId = ownProps.match.params.id;
  let course = {title:"", category:"", length:""};
  if (courseId && state.courses.length > 0){
    course = getCourseById(state.courses, courseId);
  }

  return {
    course: course,
    authors: authorsFormatted(state.authors)
  };
}

function mapDispatchToProps(dispatch){
  return {
    actions:bindActionCreators(courseActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);



