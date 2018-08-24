/**
 * Created by Lu on 8/13/2018.
 */
import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import * as Symbols from './Symbols';
import * as Utils from './Utils';
import Note from './Note';
import NoteKey from './NoteKey';
import * as musicActions from '../../actions/musicActions';

class MusicStaff extends React.Component {
  constructor(props, context){
    super(props, context);
    this.displayScaleHead = this.displayScaleHead.bind(this);
    this.displayNotesOnStaff = this.displayNotesOnStaff.bind(this);
    this.generateFullStaffIndex = this.generateFullStaffIndex.bind(this);
    this.ondrop = this.ondrop.bind(this);
    this.ondragover = this.ondragover.bind(this);
    this.ondragenter = this.ondragenter.bind(this);
    this.calculateSfIdxByCoordinates = this.calculateSfIdxByCoordinates.bind(this);
    this.staffRef = React.createRef();
    // class fixed constants
    this.LineSpace = 20;
    this.LineLayout = [0,0,0,1,1,1,1,0,0,0];
    this.headStart = 70;
    this.headEnd = 160;
    this.staffVerticalMargin = 40;
    let staffLayout = this.generateFullStaffIndex();
    this.staffStart = staffLayout.visibleStaffIdxStart;
  }

  generateFullStaffIndex(){
    //generate full staff index according the props.LineLayout
    let fullIndex = [];
    let layout = this.LineLayout;
    for (let i=0; i<layout.length; i++){
      fullIndex = fullIndex.concat([i*2, i*2+1]);
    }
    let visibleStaffIdxStart = layout.indexOf(1)*2;
    let visibleStaffIdxEnd = (layout.lastIndexOf(1)+1)*2;
    return {fullIndex, visibleStaffIdxStart, visibleStaffIdxEnd};
  }

  displayScaleHead(){
    const xOffSet = this.headStart;
    const xStep = 12;
    const res = [];
    const symCenter = NoteKey.center;
    const halfSpace = this.LineSpace / 2;
    for (let i=0; i<this.props.scaleHead.length; i++){
      const curSym = this.props.scaleHead[i];
      const curSymNames = curSym.name;
      const curSymYPos = curSym.sfIdx + this.staffStart;
      const curSymXPos = xOffSet+xStep*i;
      const initOffset = [curSymXPos,curSymYPos*halfSpace]; //[x, y]
      const finalOffset = [initOffset[0]-symCenter[0], initOffset[1]-symCenter[1]];
      res.push(
        <div key={i} style={{position:'absolute', top: finalOffset[1]+'px', left:finalOffset[0]+'px'}}>
          <NoteKey name={curSymNames} />
        </div>
      );
    }
    return res;
  }

  calculateSfIdxByCoordinates(x, y){
    //console.log(x+', ' +y);
    let sfIdx = Math.round(y/10)-this.staffStart;
    return {x,sfIdx};
  }

  displayNotesOnStaff(){
    const xOffSet = this.headEnd;
    const xStep = 40;
    const res = [];
    const symCenter = Note.center;
    const halfSpace = this.LineSpace / 2;
    for (let i=0; i<this.props.notes.length; i++){
      const curSym = this.props.notes[i];
      const isPrimary = curSym.primary;
      const curSymNames = curSym.label;
      const curSymYPos = curSym.sfIdx + this.staffStart;
      const curSymXPos = xOffSet+xStep*i;
      const initOffset = [curSymXPos,curSymYPos*halfSpace]; //[x, y]
      const finalOffset = [initOffset[0]-symCenter[0], initOffset[1]-symCenter[1]];
      res.push(
        <div key={i} style={{position:'absolute', top: finalOffset[1]+'px', left:finalOffset[0]+'px'}}>
          <Note code={Symbols.NOTE_QUARTER} showLabel label={curSymNames} primary={isPrimary}
                sfIdx={curSym.sfIdx} name={curSym.name} mark={curSym.mark}
                onNoteClicked={this.props.onNoteClicked}
            />
        </div>
      );
    }
    return res;
  }

  ondrop(event){
    event.preventDefault();
    let staffRect = this.staffRef.current.getBoundingClientRect();
    let dropNoteX = event.clientX-staffRect.x;
    let dropNoteY = event.clientY-staffRect.y;
    if (dropNoteX<this.headEnd){
      // the note is dropped inside the scale head zone
      return;
    }
    let dropData = JSON.parse(event.dataTransfer.getData("NOTE_DRAG_INIT_DATA"));
    //console.log(dropData);
    console.log(dropData.dragP);
    console.log([dropNoteX, dropNoteY]);
    let centerY = dropNoteY - dropData.dragP[1] //+ Note.center[1];
    let centerX = dropNoteX - dropData.dragP[0] //+ Note.center[0];
    console.log(centerY);
    let noteCords = this.calculateSfIdxByCoordinates(dropNoteX, dropNoteY);
  }


  ondragover(event){
    //console.log(">>>: " + event.clientX + ", " + event.clientY);
    event.preventDefault();
    // Set the dropEffect to move
    //event.dataTransfer.dropEffect = "copy"
  }

  ondragenter(event){
    console.log("dragenter");
    console.log(event.clientY);
    console.log(event.target);
  }
  render(){
    // return table with 10 cells, 4 visible cells form five lines with a clef at left
    let staffLineKey = 0;
    let staffWholeHeight = this.LineLayout.length * this.LineSpace + 2*this.staffVerticalMargin;
    return (
      <div ref={this.staffRef} className="staffLines" style={{height:staffWholeHeight+'px'}} onDrop={this.ondrop} onDragOver={this.ondragover} onDragEnter={this.ondragenter}>
        <div className="staffLinesContent">
          <table>
            <tbody>
              {this.LineLayout.map(line=>{
                let tdClass = line >0 ? 'show':'show';
                staffLineKey++;
                return (<tr key={staffLineKey}><td className={tdClass}>&nbsp;</td></tr>);
              })}
            </tbody>
          </table>
          <div className="clef">{Symbols.CLEF_G}</div>
          {this.displayScaleHead()}
          {this.displayNotesOnStaff()}
        </div>
      </div>
    );
  }
}

MusicStaff.propTypes = {
  notes: PropTypes.array,
  scaleHead: PropTypes.array,
  onNoteClicked: PropTypes.func.isRequired
};
//define some static properties, config of the class
MusicStaff.defaultProps = {
  notes: [],
  scaleHead:[]
};

function mapDispatchToProps(dispatch) {
  return {
    onNoteClicked: (markNote) => {
      dispatch(musicActions.clickNote(markNote));
    }
  };
}
export default connect(null, mapDispatchToProps)(MusicStaff);
