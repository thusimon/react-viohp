/* eslint-enable no-console */
/* eslint-disable import/default */
import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import configureStore from './store/configureStore.dev';
import {Provider} from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './components/App';
import {setScoreList, setScore} from './actions/musicActions';
import './styles/styles.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/toastr/build/toastr.min.css';
import {getAllScoreList, getScoreByName} from './data/scores/Utils';

const store = configureStore();
let scoreList = getAllScoreList();
store.dispatch(setScoreList(scoreList));
let firstScore = scoreList[0];
if (firstScore){
  let scoreName = firstScore.name;
  store.dispatch(setScore(scoreName));
}

render((
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  ),
  document.getElementById('app')
);
