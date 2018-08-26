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
    this.onNoteMouseMove = this.onNoteMouseMove.bind(this);
    this.onNoteMouseUp = this.onNoteMouseUp.bind(this);
    let copyNoteX = null;
    let copyNoteY = null;
    let dragFlag = false;
    this.mouseDown = false;
    this.mouseDrag = false;
    this.draggingNote = null;
    this.noteRef = React.createRef();
    console.log(this.props);
  }
  onNoteMouseDown(event){
    console.log("mouse down!");
    this.mouseDown = true;
    let mouseX = event.clientX;
    let mouseY = event.clientY;
    let originNoteRect = this.noteRef.current.getBoundingClientRect();
    let offSets = [mouseX - originNoteRect.x, mouseY-originNoteRect.y];
    let dragInfo = {dragStatus:0, dragNoteName:this.props.name, startOffSet:offSets};
    this.props.updateDragStatus(dragInfo);
  }
  onNoteMouseMove(event){
    if (this.mouseDown){
      if (!this.draggingNote){
        this.draggingNote = React.createRef();
      }
      let mouseX = event.clientX;
      let mouseY = event.clientY;
      let originNoteRect = this.noteRef.current.getBoundingClientRect();
      let [offsetX, offsetY] = [mouseX - originNoteRect.x, mouseY-originNoteRect.y];
      console.log(offsetX+", "+offsetY);
      this.setState({copyNoteX:offsetX, copyNoteY:offsetY, dragFlag:true});
    }
    if (this.mouseDrag){
      //we should copy the note at the current place

    }
  }
  onNoteMouseUp(event){
    this.mouseDown = false;
    this.mouseDrag = false;
    this.draggingNote = null;
    this.setState({dragFlag:false});
    // should remove the copied note from document
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
