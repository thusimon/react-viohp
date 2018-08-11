/**
 * Created by Lu on 8/4/2018.
 */
import React from 'react';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
//import {browserHistory} from 'react-router-dom';
import * as courseActions from '../../actions/courseActions';
import CourseList from './CourseList';
import LoadingDots from '../common/LoadingDots';

class CoursesPage extends React.Component {
  constructor(props, context){
    console.log("course page constructor before super");
    super(props, context);
    this.redirectAddCoursePage = this.redirectAddCoursePage.bind(this);
    console.log("course page constructor");
    console.log(this.props);
  }

  redirectAddCoursePage() {
    this.props.history.push('/course');
  }
  render() {
    const {courses} = this.props;
    console.log("render course page");
    console.log(this.props.courses);
    return (
      <div>
        <h1>Courses</h1>
        <input type="submit"
               value="Add Course"
               className="btn btn-primary"
               onClick={this.redirectAddCoursePage} />
        <CourseList courses={courses} />
      </div>
    );
  }
}

CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  history: PropTypes.object
};

// mapStateToProps and mapDispatchToProps: earlier before constructor
function mapStateToProps(state, ownProps){
  console.log("mapStateToProps in course page");
  console.log(state);
  console.log(ownProps);
  return {
    courses:state.courses
  };
}

function mapDispatchToProps(dispatch){
  console.log("mapDispatchToProps in course page");
  console.log(dispatch);
  console.log(bindActionCreators(courseActions, dispatch));
  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
