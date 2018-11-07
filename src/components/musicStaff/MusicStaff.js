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
import {NotesFullArr} from './Constants';

class MusicStaff extends React.Component {
  constructor(props, context){
    super(props, context);
    this.displayScaleHead = this.displayScaleHead.bind(this);
    this.displayNotesOnStaff = this.displayNotesOnStaff.bind(this);
    this.displayFreqLine = this.displayFreqLine.bind(this);
    this.generateFullStaffIndex = this.generateFullStaffIndex.bind(this);
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
    let {scale, signature, freqLineVal} = this.props;
    let fullScaleNotes = Utils.getSetOfNoteFromSignatureScale(signature, scale);
    this.state = {scale, signature, freqLineVal, fullScaleNotes};
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
    const res = [];
    const symCenter = Note.center;
    const halfSpace = this.LineSpace / 2;
    for (let keyi in this.props.notes){
      const curSym = this.props.notes[keyi];
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
    let {scale, signature, freqLineVal} = nextProps;
    if (scale !=this.state.scale || signature!=this.state.signature){
      let fullScaleNotes = Utils.getSetOfNoteFromSignatureScale(signature, scale);
      this.setState({scale, signature, freqLineVal, fullScaleNotes});
    } else {
      this.setState({freqLineVal});
    }
  }
  displayFreqLine(){
    let newsfIdx = Utils.getSFIdxFromFreq(this.state.fullScaleNotes, this.state.freqLineVal);
    const freqLineSfIdx = newsfIdx + this.staffStart;
    const halfSpace = this.LineSpace / 2;
    const freqLineYPos = (freqLineSfIdx*halfSpace).toFixed(2);
    return (
      <hr style={{position:'absolute', top: freqLineYPos+'px', left:"80px", width:"90%",border:"1px solid #0000FF", margin:"0px"}} />
    )

  }
  render(){
    // return table with 10 cells, 4 visible cells form five lines with a clef at left
    let staffLineKey = 0;
    let staffWholeHeight = this.LineLayout.length * this.LineSpace + 2*this.staffVerticalMargin;
    let freqLine = this.state.freqLineVal>0 ? this.displayFreqLine():null;
    return (
      <div ref={this.staffRef} className="staffLines" style={{height:staffWholeHeight+'px'}}>
        <div className="staffLinesContent">
          <table>
            <tbody>
              {this.LineLayout.map(line=>{
                let tdClass = line >0 ? 'show':'halfshow';
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
  notes: PropTypes.object,
  scaleHead: PropTypes.array,
  onNoteClicked: PropTypes.func.isRequired
};
//define some static properties, config of the class
MusicStaff.defaultProps = {
  notes: {},
  scaleHead:[],
  freqLineVal:-1
};

function mapStateToProps(state){
  return {freqLineVal:state.music.freqLineVal,signature:state.music.signature,scale:state.music.scale};
}
function mapDispatchToProps(dispatch) {
  return {
    onNoteClicked: (markNote) => {
      dispatch(musicActions.clickNote(markNote));
    }
  };
}
export default connect(mapStateToProps, mapDispatchToProps,null,{withRef:true})(MusicStaff);
