/**
 * Created by Lu on 8/3/2018.
 */
import React from 'react';
import {Link} from 'react-router-dom';

class HomePage extends React.Component {
  render() {
    return (
      <div className="jumbotron">
        <h1>Vio Helper</h1>
        <p>A visual way to memorize the scales on violin.</p>
        <Link to="about" className="btn btn-primary btn-lg">Learn more</Link>
      </div>
    );
  }
}

export default HomePage;
