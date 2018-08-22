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
    this.drag = this.drag.bind(this);
    let {mark,name,sfIdx} = this.props;
    this.state = {mark,name,sfIdx};
    console.log(this.props);
  }

  noteClick(event){
    if (this.props.draggable){
      return;
    }
    let {mark,name,sfIdx} = this.state;
    mark = !mark;
    this.setState({mark});
    if (this.props.onNoteClicked) {
      this.props.onNoteClicked({mark, name, sfIdx});
    }
  }

  drag(event){
    if (this.props.draggable){
      event.dataTransfer.dropEffect = "copy";
      event.dataTransfer.setData("NOTE_TYPE", this.props.name);
    }
  }

  render(){
    const noteMarkClass = this.state.mark ? "noteSelected" : "";

    return (
      <div className="note" draggable={this.props.draggable} onDragStart={this.drag}>
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
  mark: PropTypes.bool,
  name: PropTypes.string,
  sfIdx: PropTypes.number,
  onNoteClicked: PropTypes.func,
  draggable: PropTypes.bool
};

Note.center = [14, 70];
// hard code the certer point, maybe an issue on other browsers
Note.defaultProps  = {
  name:Syms.NOTE_QUARTER_TYPE,
  code:'\ud834\udd5f',
  showLabel: false,
  primary: true,
  label: 'C',
  draggable: false,
  onNoteClicked: null
};

export default Note;
