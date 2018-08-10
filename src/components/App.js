/**
 * Created by Lu on 8/4/2018.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import Header from './common/Header';
import HomePage from './home/HomePage';
import AboutPage from './about/AboutPage';
import CoursesPage from './courses/CoursesPage';
import ManageCoursePage from './courses/ManageCoursePage';

class App extends React.Component {
  render() {
    return (
      <div className="container-fluid" >
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/home" component={HomePage} />
          <Route path="/courses" component={CoursesPage} />
          <Route path="/course/:id" component={ManageCoursePage} />
          <Route path="/course" component={ManageCoursePage} />
          <Route path="/about" component={AboutPage} />
        </Switch>
      </div>
    );
  }
}

/*
App.propTypes = {
  children: PropTypes.object.isRequired
};
*/
export default App;
