/**
 * Created by Lu on 8/4/2018.
 */
import React from 'react';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import * as courseActions from '../../actions/scaleAction';
import CourseList from './ScaleList';

class ScalesPage extends React.Component {
  constructor(props, context){
    super(props, context);
  }

  render() {
    const {courses} = this.props;
    return (
      <div>
        <h1>Scales</h1>
        <CourseList courses={courses} />
      </div>
    );
  }
}

ScalesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

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
export default connect(mapStateToProps, mapDispatchToProps)(ScalesPage);
