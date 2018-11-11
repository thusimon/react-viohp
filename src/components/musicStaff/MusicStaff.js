/**
 * Created by Lu on 8/13/2018.
 */
/*eslint import/namespace: ['error', { allowComputed: true }]*/
import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import * as Symbols from './Symbols';
import * as Utils from './Utils';
import Note from './Note';
import NoteKey from './NoteKey';
import * as musicActions from '../../actions/musicActions';
import {NotesFullArr, SHARPFLATIDX} from './Constants';

class MusicStaff extends React.Component {
  constructor(props, context){
    super(props, context);
    this.displayScaleHead = this.displayScaleHead.bind(this);
    this.displayNotesOnStaff = this.displayNotesOnStaff.bind(this);
    this.displayFreqLine = this.displayFreqLine.bind(this);
    this.generateFullStaffIndex = this.generateFullStaffIndex.bind(this);
    this.onMusicStaffMouseUp = this.onMusicStaffMouseUp.bind(this);
    this.positionNoteOnStaff = this.positionNoteOnStaff.bind(this);
    this.staffRef = React.createRef();
    // class fixed constants
    this.LineSpace = 20;
    this.LineLayout = [0,0,0,1,1,1,1,0,0,0];
    this.headStart = 70;
    let staffLayout = this.generateFullStaffIndex();
    this.staffStart = staffLayout.visibleStaffIdxStart;
    this.staffHeight = this.LineLayout.length*this.LineSpace;
    let {scale, signature, freqLineVal, notes, dragInfo} = this.props;
    let fullScaleNotes = Utils.getSetOfNoteFromSignatureScale(signature, scale);
    let scaleHead = SHARPFLATIDX[signature][scale];
    this.state = {scale, signature, freqLineVal, fullScaleNotes, notes, scaleHead,dragInfo};
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

  positionNoteOnStaff(noteName, noteCords){
    let shiftNoise = 5;
    //staff line space is 20px, only allow Y [0, 200]
    let [x, y] = noteCords;
    // calculate sfIdx
    let sfIdx = Math.floor((y+5)/10)-6;
    // find the note by signature and scale
    let noteFound = Utils.getNoteFromPosition(this.state.fullScaleNotes, sfIdx);
    if(noteFound){
      let newNote = {type:noteName, sfIdx:sfIdx, xCord:Math.round(x), name:noteFound.name, label:noteFound.label};
      console.log(newNote);
      this.props.addNote(newNote, this.props.idx);
    }
  }

  onMusicStaffMouseUp(event){
    let {dragStatus, dragNoteName, startOffSet} = this.state.dragInfo;
    if (dragStatus==1){
      //let staffRef = this.staffRef.current.getWrappedInstance();
      let staffDom = this.staffRef.current;
      // calculate the staff client rect
      let staffDomRect = staffDom.getBoundingClientRect();
      let noteCoordOnStaff = [
        event.clientX-staffDomRect.x-startOffSet[0]+Note.center[0],
        event.clientY-staffDomRect.y-startOffSet[1]+Note.center[1]
      ];
      if (noteCoordOnStaff[1]>0 && noteCoordOnStaff[1]<this.staffHeight){
        console.log("note dropped");
        //should add the note to music staff state.notes
        this.positionNoteOnStaff(dragNoteName, noteCoordOnStaff);
      }
    }
  }

  displayScaleHead(){
    const xOffSet = this.headStart;
    const xStep = 12;
    const res = [];
    const symCenter = NoteKey.center;
    const halfSpace = this.LineSpace / 2;
    for (let i=0; i<this.state.scaleHead.length; i++){
      const curSym = this.state.scaleHead[i];
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

  displayNotesOnStaff(){
    let curStaffNotes = this.state.notes[this.props.idx];
    const res = [];
    if (!curStaffNotes){
      return res;
    }
    const symCenter = Note.center;
    const halfSpace = this.LineSpace / 2;
    for (let keyi in curStaffNotes){
      const curSym = curStaffNotes[keyi];
      const curSymCode = Symbols[curSym.type];
      const isPrimary = curSym.primary;
      const curSymNames = curSym.label;
      const curSymYPos = curSym.sfIdx + this.staffStart;
      const curSymXPos = curSym.xCord;
      const initOffset = [curSymXPos,curSymYPos*halfSpace]; //[x, y]
      const finalOffset = [initOffset[0]-symCenter[0], initOffset[1]-symCenter[1]];
      res.push(
        <div key={keyi} style={{position:'absolute', top: finalOffset[1]+'px', left:finalOffset[0]+'px'}}>
          <Note code={curSymCode} showLabel label={curSymNames} primary={isPrimary}
                sfIdx={curSym.sfIdx} name={curSym.name} mark={curSym.mark}
                onNoteClicked={this.props.onNoteClicked}
            />
        </div>
      );
    }
    return res;
  }

  componentWillReceiveProps(nextProps){
    let {scale, signature, freqLineVal, dragInfo, notes} = nextProps;
    if (scale !=this.state.scale || signature!=this.state.signature){
      let fullScaleNotes = Utils.getSetOfNoteFromSignatureScale(signature, scale);
      let scaleHead = SHARPFLATIDX[signature][scale];
      this.setState({scale, signature, freqLineVal, fullScaleNotes,scaleHead, dragInfo, notes});
    } else {
      this.setState({freqLineVal, dragInfo, notes});
    }
  }
  displayFreqLine(){
    let newsfIdx = Utils.getSFIdxFromFreq(this.state.fullScaleNotes, this.state.freqLineVal);
    const freqLineSfIdx = newsfIdx + this.staffStart;
    const halfSpace = this.LineSpace / 2;
    const freqLineYPos = (freqLineSfIdx*halfSpace).toFixed(2);
    return (
      <hr style={{position:'absolute', top: freqLineYPos+'px', left:"80px", width:"700px",border:"1px solid #0000FF", margin:"0px"}} />
    )
  }
  render(){
    // return table with 10 cells, 4 visible cells form five lines with a clef at left
    let staffLineKey = 0;
    let staffWholeHeight = this.LineLayout.length * this.LineSpace;
    let freqLine = this.state.freqLineVal>0 ? this.displayFreqLine():null;
    return (
      <div ref={this.staffRef}
           className="staffLines"
           style={{height:staffWholeHeight+'px',width:"800px"}}
           onMouseUp={this.onMusicStaffMouseUp}>
        <div className="staffLinesContent">
          <table>
            <tbody>
              {this.LineLayout.map(line=>{
                let tdClass = line >0 ? 'show':'hide';
                staffLineKey++;
                return (<tr key={staffLineKey}><td className={tdClass}>&nbsp;</td></tr>);
              })}
            </tbody>
          </table>
          <div className="clef">{Symbols.CLEF_G}</div>
          {this.displayScaleHead()}
          {this.displayNotesOnStaff()}
          {freqLine}
        </div>
      </div>
    );
  }
}

MusicStaff.propTypes = {
  notes: PropTypes.array,
  onNoteClicked: PropTypes.func.isRequired
};
//define some static properties, config of the class
MusicStaff.defaultProps = {
  notes: [],
  freqLineVal:-1
};

function mapStateToProps(state){
  return {
    freqLineVal:state.music.freqLineVal,
    signature:state.music.signature,
    scale:state.music.scale,
    notes:state.music.notes,
    dragInfo:state.music.dragInfo
  };
}
function mapDispatchToProps(dispatch) {
  return {
    onNoteClicked: (markNote) => {
      dispatch(musicActions.clickNote(markNote));
    },
    dragStatusChange: (dragInfo) => {
      dispatch(musicActions.noteDrag(dragInfo));
    },
    addNote:(note, idx)=>{
      dispatch(musicActions.addNote(note,idx));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps,null,{withRef:true})(MusicStaff);
