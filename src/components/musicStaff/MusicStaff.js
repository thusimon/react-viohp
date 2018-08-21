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
    let staffLayout = this.generateFullStaffIndex();
    this.staffStart = staffLayout.visibleStaffIdxStart;
  }

  generateFullStaffIndex(){
    //generate full staff index according the props.LineLayout
    let fullIndex = [];
    let layout = this.props.LineLayout;
    for (let i=0; i<layout.length; i++){
      fullIndex = fullIndex.concat([i*2, i*2+1]);
    }
    let visibleStaffIdxStart = layout.indexOf(1)*2;
    let visibleStaffIdxEnd = (layout.lastIndexOf(1)+1)*2;
    return {fullIndex, visibleStaffIdxStart, visibleStaffIdxEnd};
  }

  displayScaleHead(){
    const xOffSet = this.props.headStart;
    const xStep = 12;
    const res = [];
    const symCenter = NoteKey.center;
    const halfSpace = this.props.LineSpace / 2;
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

  displayNotesOnStaff(){
    const xOffSet = 180;
    const xStep = 40;
    const res = [];
    const symCenter = Note.center;
    const halfSpace = this.props.LineSpace / 2;
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

  render(){
    // return table with 10 cells, 4 visible cells form five lines with a clef at left
    let staffLineKey = 0;
    return (
      <div className="staffLines">
        <div className="staffLinesContent">
          <table>
            <tbody>
              {this.props.LineLayout.map(line=>{
                let tdClass = line >0 ? 'show':'hide';
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
  LineSpace: PropTypes.number,
  LineLayout: PropTypes.array,
  notes: PropTypes.array,
  scaleHead: PropTypes.array,
  headStart: PropTypes.number,
  onNoteClicked: PropTypes.func.isRequired
};
//define some static properties, config of the class
MusicStaff.defaultProps = {
  LineSpace : 20,
  LineLayout: [0,0,0,1,1,1,1,0,0,0],
  notes: [],
  scaleHead:[],
  headStart: 70
};

function mapDispatchToProps(dispatch) {
  return {
    onNoteClicked: (markNote) => {
      dispatch(musicActions.clickNote(markNote));
    }
  };
}
export default connect(null, mapDispatchToProps)(MusicStaff);
