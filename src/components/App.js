/**
 * Created by Lu on 8/4/2018.
 */
import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { Route, Switch, withRouter } from 'react-router-dom';
import Header from './common/Header';
import HomePage from './home/HomePage';
import AboutPage from './about/AboutPage';
import CoursesPage from './courses/CoursesPage';
import ManageCoursePage from './courses/ManageCoursePage';

class App extends React.Component {
  render() {
    return (
      <div className="container-fluid" >
        <Header loading={this.props.loading}/>
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


App.propTypes = {
  loading: PropTypes.bool.isRequired
};


function mapStateToProps(state, ownProps){
  return {
    loading: state.ajaxCallsInProgress > 0
  };
}

export default withRouter(connect(mapStateToProps)(App));
