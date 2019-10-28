/**
 * Created by Lu on 8/4/2018.
 */
import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Header from './common/Header';
import HomePage from './home/HomePage';
import AboutPage from './about/AboutPage';
import MusicAudioPage from './page/MusicAudioPage';
import MusicEditorPage from './page/MusicEditorPage';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSpinner, faPlay, faPause, faBackward, faForward, faVolumeUp, faVolumeMute
  , faUserCircle } from '@fortawesome/free-solid-svg-icons';

library.add(faSpinner, faPlay, faPause, faBackward, faForward, faVolumeUp, faVolumeMute
  , faUserCircle);

class App extends React.Component {
  render() {
    return (
      <div className="container-fluid" >
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/home" component={HomePage} />
          <Route path="/musicstaff" component={MusicAudioPage} />
          <Route path="/musicEditor" component={MusicEditorPage} />
          <Route path="/about" component={AboutPage} />
        </Switch>
      </div>
    );
  }
}


App.propTypes = {
};


export default withRouter(App);
