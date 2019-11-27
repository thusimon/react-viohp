import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';

import configureStore from './store/configureStore';
import {Provider} from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './components/App';
import './styles/styles.css';
import './index.scss';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/toastr/build/toastr.min.css';

const store = configureStore();

render((
    <Provider store={store}>
      <Router>
        <App store={store}/>
      </Router>
    </Provider>
  ),
  document.getElementById('app')
);
