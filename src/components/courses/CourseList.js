/**
 * Created by Lu on 8/8/2018.
 */
import React from 'react';
import {PropTypes} from 'prop-types';
import CourseListRow from './CourseListRow';

const CourseList = ({courses}) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <td>&nbsp;</td>
          <td>Title</td>
          <td>Author</td>
          <td>Category</td>
          <td>Length</td>
        </tr>
      </thead>
      <tbody>
        {courses.map(course=>
          <CourseListRow key={course.id} course={course} />
        )}
      </tbody>
    </table>
  );
};

CourseList.propTypes = {
  courses: PropTypes.array.isRequired
};

export default CourseList;
