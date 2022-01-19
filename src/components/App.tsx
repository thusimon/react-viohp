import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './common/Header';
import HomePage from './home/HomePage';
import AboutPage from './about/AboutPage';
import MusicAudioPage from './page/MusicAudioPage';
import MusicEditorPage from './page/MusicEditorPage';
import MusicAnalyticsPage from './page/MusicAnalyticsPage';
import AccountPage from './account/account-page';
import { fetchDataWithAccessToken } from '../api/utils';
import * as authActions from '../actions/authActions';
import * as wsActions from '../actions/wsActions';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSpinner, faPlay, faPause, faBackward, faForward, faVolumeUp, faVolumeMute
  , faUserCircle } from '@fortawesome/free-solid-svg-icons';
import './App.scss';

library.add(faSpinner, faPlay, faPause, faBackward, faForward, faVolumeUp, faVolumeMute
  , faUserCircle);

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    
    (async () => {
      const {err, user} = await fetchDataWithAccessToken('/api/user/me', 'GET');
      if (err) {
        dispatch(authActions.setUser(null));
      } else {
        dispatch(authActions.setUser(user));
      }
      const host = window.location.host;
      const url = `ws://${host}/websockets`;
      dispatch(wsActions.getWebSocket(url));
    })()

    return () => {
      dispatch(wsActions.closeWebSocket());
    }
  }, []);
  return (
    <BrowserRouter>
      <div className='container-fluid' >
        <Header />
        <Routes>
          <Route index element={<HomePage />} />
          <Route path='/home' element={<HomePage />} />
          <Route path='/musicstaff' element={<MusicAudioPage />} />
          <Route path='/musicEditor' element={<MusicEditorPage />} />
          <Route path='/musicAnalytics' element={<MusicAnalyticsPage />} />
          <Route path='/account' element={<AccountPage />} />
          <Route path='/about' element={<AboutPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
