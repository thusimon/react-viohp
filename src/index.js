/* eslint-enable no-console */
// import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import App from './components/App';
import './styles/styles.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
render((
    <Router>
      <App />
    </Router>
  ),
  document.getElementById('app')
);
