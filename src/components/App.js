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
import AccountPage from './account/account-page';
import {fetchDataWithAccessToken} from '../api/utils';
import * as authActions from '../actions/authActions';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSpinner, faPlay, faPause, faBackward, faForward, faVolumeUp, faVolumeMute
  , faUserCircle } from '@fortawesome/free-solid-svg-icons';
import './App.scss';

library.add(faSpinner, faPlay, faPause, faBackward, faForward, faVolumeUp, faVolumeMute
  , faUserCircle);

class App extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.store = props.store;
  }
  async componentDidMount() {
    // should try to get authentication status
    const {err, user} = await fetchDataWithAccessToken('/api/user/me', 'GET');
    if (err) {
      this.store.dispatch(authActions.setUser(null));
    } else {
      this.store.dispatch(authActions.setUser(user));
    }
  }
  render() {
    return (
      <div className="container-fluid" >
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/home" component={HomePage} />
          <Route path="/musicstaff" component={MusicAudioPage} />
          <Route path="/musicEditor" component={MusicEditorPage} />
          <Route path="/account" component={AccountPage} />
          <Route path="/about" component={AboutPage} />
        </Switch>
      </div>
    );
  }
}


App.propTypes = {
};


export default withRouter(App);
