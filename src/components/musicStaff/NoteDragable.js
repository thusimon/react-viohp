/**
 * Created by Lu on 8/23/2018.
 */
import React from 'react';
import {connect} from 'react-redux';
import * as Syms from './Symbols';
import PropTypes from 'prop-types';
import Note from './Note';
import * as musicActions from '../../actions/musicActions';

class NoteDragable extends Note{
  constructor(props, context){
    super(props, context);
    this.onNoteMouseDown = this.onNoteMouseDown.bind(this);
    this.noteRef = React.createRef();
  }
  onNoteMouseDown(event){
    let mouseX = event.clientX;
    let mouseY = event.clientY;
    let originNoteRect = this.noteRef.current.getBoundingClientRect();
    let offSets = [mouseX - originNoteRect.x, mouseY-originNoteRect.y];
    let dragInfo = {dragStatus:0, dragNoteName:this.props.name, startOffSet:offSets, noteShift:[0,0]};
    this.props.updateDragStatus(dragInfo);
  }
  render(){
    return (
      <div className="note">
        <span ref={this.noteRef} onClick={this.noteClick} onMouseDown={this.onNoteMouseDown}>{this.props.code}</span>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch){
  return ({
    updateDragStatus: (dragInfo) => {
      dispatch(musicActions.noteDrag(dragInfo));
    }
  });
}

export default connect(null, mapDispatchToProps)(NoteDragable);
