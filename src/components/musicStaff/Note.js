/**
 * Created by Lu on 8/12/2018.
 */
import React from 'react';
import * as Syms from './Symbols';
import PropTypes from 'prop-types';
import {connect} from 'redux';
import * as musicActions from '../../actions/musicActions';

class Note extends React.Component {
  constructor(props, context){
    super(props, context);
    this.noteClick = this.noteClick.bind(this);
    let {mark,name,sfIdx} = this.props;
    this.state = {mark,name,sfIdx};
  }

  noteClick(event){
    let {mark,name,sfIdx} = this.state;
    mark = !mark;
    this.setState({mark});
    this.props.onNoteClicked({mark,name,sfIdx});
  }
  render(){
    const noteMarkClass = this.state.mark ? "noteSelected" : ""
    return (
      <div className="note">
        <span onClick={this.noteClick} className={noteMarkClass}>{this.props.code}</span>
        {this.props.showLabel && <span className="noteLabel">{this.props.label}</span>}
      </div>
    );
  }
}

Note.propTypes = {
  code: PropTypes.string.isRequired,
  showLabel: PropTypes.bool,
  label: PropTypes.string,
  primary: PropTypes.bool,
  onNoteClicked: PropTypes.func.isRequired
};

Note.center = [14, 70];
// hard code the certer point, maybe an issue on other browsers
Note.defaultProps  = {
  code:'\ud834\udd5f',
  showLabel: false,
  primary: true,
  label: 'C'
};

export default Note;
