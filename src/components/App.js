/**
 * Created by Lu on 8/4/2018.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './common/Header';
import HomePage from './home/HomePage';
import AboutPage from './about/AboutPage';
import ScalesPage from './scales/ScalesPage';
class App extends React.Component {
  render() {
    return (
      <div className="container-fluid" >
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/home" component={HomePage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/scales" component={ScalesPage} />
        </Switch>
      </div>
    );
  }
}

/*
App.propTypes = {
  children: PropTypes.object.isRequired
};
*/
export default App;
