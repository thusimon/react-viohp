import React from 'react';
import ReactDOM from 'react-dom';
import "regenerator-runtime";
import configureStore from './store/configureStore';
import {Provider} from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './components/App';
import './styles/styles.css';
import './index.scss';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/toastr/build/toastr.min.css';

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App store={store}/>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('app')
);
