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
import MngCoursePage from './courses/ManageCoursePage';
import MusicAudioPage from './musicStaff/MusicAudioPage';

class App extends React.Component {
  render() {
    return (
      <div className="container-fluid" >
        <Header loading={this.props.loading}/>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/home" component={HomePage} />
          <Route path="/courses" component={CoursesPage} />
          <Route path="/course/:id" component={MngCoursePage} />
          <Route path="/course" component={MngCoursePage} />
          <Route path="/musicstaff" component={MusicAudioPage} />
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
