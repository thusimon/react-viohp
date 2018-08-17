/**
 * Created by Lu on 8/12/2018.
 */
import React from 'react';
import * as Syms from './Symbols';
import PropTypes from 'prop-types';

class Note extends React.Component {
  constructor(props, context){
    super(props, context);
  }
  render(){
    return (
      <div className="note">
        <span>{this.props.code}</span>
        {this.props.showLabel && <span className="noteLabel">{this.props.label}</span>}
      </div>
    );
  }
}

Note.propTypes = {
  code: PropTypes.string.isRequired,
  showLabel: PropTypes.bool,
  label: PropTypes.string
};

Note.center = [14, 70];
// hard code the certer point, maybe an issue on other browsers
Note.defaultProps  = {
  code:'\ud834\udd5f',
  showLabel: false
};

export default Note;
