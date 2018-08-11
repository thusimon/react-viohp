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

class CoursesPage extends React.Component {
  constructor(props, context){
    super(props, context);
    this.redirectAddCoursePage = this.redirectAddCoursePage.bind(this);
  }

  redirectAddCoursePage() {
    this.props.history.push('/course');
  }
  render() {
    const {courses} = this.props;
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
  return {
    courses:state.courses
  };
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
