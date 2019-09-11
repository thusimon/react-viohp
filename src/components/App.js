/**
 * Created by Lu on 8/4/2018.
 */
import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Header from './common/Header';
import HomePage from './home/HomePage';
import AboutPage from './about/AboutPage';
import MusicAudioPage from './musicStaff/MusicAudioPage';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSpinner, faPlay, faPause, faBackward, faForward } from '@fortawesome/free-solid-svg-icons';

library.add(faSpinner, faPlay, faPause, faBackward, faForward);

class App extends React.Component {
  render() {
    return (
      <div className="container-fluid" >
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/home" component={HomePage} />
          <Route path="/musicstaff" component={MusicAudioPage} />
          <Route path="/about" component={AboutPage} />
        </Switch>
      </div>
    );
  }
}


App.propTypes = {
};


export default withRouter(App);
