/**
 * Created by Lu on 8/4/2018.
 */
import React from 'react';
import { Route, Switch, withRouter, RouteComponentProps } from 'react-router-dom';
import Header from './common/Header';
import HomePage from './home/HomePage';
import AboutPage from './about/AboutPage';
import MusicAudioPage from './page/MusicAudioPage';
import MusicEditorPage from './page/MusicEditorPage';
import MusicAnalyticsPage from './page/MusicAnalyticsPage';
import AccountPage from './account/account-page';
import {fetchDataWithAccessToken} from '../api/utils';
import * as authActions from '../actions/authActions';
import * as wsActions from '../actions/wsActions';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSpinner, faPlay, faPause, faBackward, faForward, faVolumeUp, faVolumeMute
  , faUserCircle } from '@fortawesome/free-solid-svg-icons';
import './App.scss';

library.add(faSpinner, faPlay, faPause, faBackward, faForward, faVolumeUp, faVolumeMute
  , faUserCircle);

interface AppPropsType {
  store:any
}

class App extends React.Component<RouteComponentProps> {
  private store:any;
  constructor(props:AppPropsType | any) {
    super(props);
    this.store = props.store;
    this.unload = this.unload.bind(this);
  }
  unload() {
    this.store.dispatch(wsActions.closeWebSocket());
  }
  async componentDidMount() {
    // should try to get authentication status
    const {err, user} = await fetchDataWithAccessToken('/api/user/me', 'GET');
    if (err) {
      this.store.dispatch(authActions.setUser(null));
    } else {
      this.store.dispatch(authActions.setUser(user));
    }
    const host = window.location.host
    const url = `ws://${host}/websockets`;
    this.store.dispatch(wsActions.getWebSocket(url));
    window.addEventListener("beforeunload", this.unload);
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
          <Route path="/musicAnalytics" component={MusicAnalyticsPage} />
          <Route path="/account" component={AccountPage} />
          <Route path="/about" component={AboutPage} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
