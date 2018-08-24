/**
 * Created by Lu on 8/12/2018.
 */
import React from 'react';
import * as Syms from './Symbols';
import PropTypes from 'prop-types';

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
    if (this.props.onNoteClicked) {
      this.props.onNoteClicked({mark, name, sfIdx});
    }
  }

  render(){
    const noteMarkClass = this.state.mark ? "noteSelected" : "";

    return (
      <div className="note">
        <span onClick={this.noteClick} name={this.props.name} className={noteMarkClass}>{this.props.code}</span>
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
  mark: PropTypes.bool,
  name: PropTypes.string,
  sfIdx: PropTypes.number,
  onNoteClicked: PropTypes.func
};

Note.center = [14, 70];
// hard code the certer point, maybe an issue on other browsers
Note.defaultProps  = {
  name:Syms.NOTE_QUARTER_TYPE,
  code:'\ud834\udd5f',
  showLabel: false,
  primary: true,
  label: 'C',
  onNoteClicked: null
};

export default Note;
