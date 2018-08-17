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
    const labels = this.props.label;
    const labelText = this.props.primary ? labels[0] : labels[0]+'\r\n'+labels[1];
    return (
      <div className="note">
        <span>{this.props.code}</span>
        {this.props.showLabel && <span className="noteLabel">{labelText}</span>}
      </div>
    );
  }
}

Note.propTypes = {
  code: PropTypes.string.isRequired,
  showLabel: PropTypes.bool,
  label: PropTypes.array,
  primary: PropTypes.bool
};

Note.center = [14, 70];
// hard code the certer point, maybe an issue on other browsers
Note.defaultProps  = {
  code:'\ud834\udd5f',
  showLabel: false,
  primary: true,
  label: ['C','C']
};

export default Note;
