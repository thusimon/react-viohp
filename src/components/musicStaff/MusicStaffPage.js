/**
 * Created by Lu on 8/12/2018.
 */
/*eslint import/namespace: ['error', { allowComputed: true }]*/
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import MusicStaff from './MusicStaff';
import * as Constants from './Constants';
import * as Utils from './Utils';
import TopControls from './TopControls';
import Note from './Note';
import * as musicActions from '../../actions/musicActions';
import * as Symbols from './Symbols';
import MusicStaffHead from './MusicStaffHead';

class MusicStaffPage extends React.Component {
  constructor(props, context){
    super(props, context);
    this.signatureTypes = Constants.SIGNATURES.map(signature =>
      ({value:signature.name, text:signature.name}));
    this.scaleTypes = Utils.getAllScaleNames();
    this.onMusicStaffPageMouseMove = this.onMusicStaffPageMouseMove.bind(this);
    this.onMusicStaffPageMouseUp = this.onMusicStaffPageMouseUp.bind(this);
    // init state
    this.state = {
      signature:this.props.signature,
      scale:this.props.scale,
      dragInfo:this.props.dragInfo,
      activeStaff:0,
      staffNum:this.props.notes.length,
      musicInfo:this.props.musicInfo,
      scoreName:this.props.scoreName
    };
    this.staffPageRef = React.createRef();
  }

  static getDerivedStateFromProps(nextProps, state){
    let {signature, scale, dragInfo, notes, musicInfo, scoreName} = nextProps;
    let staffNum = notes.length;
    if (signature != state.signature || scale != state.scale){
      // need to update the scaleHead
      return {signature, scale, dragInfo, staffNum, musicInfo,scoreName};
    } else {
      // signature and scale is not changed
      return {dragInfo, staffNum, musicInfo,scoreName};
    }
  }

  onMusicStaffPageMouseMove(event){
    let {dragStatus, dragNoteName, startOffSet} = this.state.dragInfo;
    if (dragStatus>-1){
      //calculate the entire staff page client rect
      let staffPageRect = this.staffPageRef.current.getBoundingClientRect();
      let noteShift = [event.clientX-staffPageRect.x, event.clientY-staffPageRect.y];
      dragStatus = 1; // during dragging
      this.props.dragStatusChange({dragStatus, dragNoteName, startOffSet, noteShift});
    }
  }

  onMusicStaffPageMouseUp(event){
    let {dragStatus, dragNoteName, startOffSet} = this.state.dragInfo;
    dragStatus = -1;
    this.props.dragStatusChange({dragStatus, dragNoteName, startOffSet:[0,0],noteShift:[0,0]});
  }

  render(){
    let {dragStatus, dragNoteName, startOffSet, noteShift} = this.state.dragInfo;
    let dragNotePos = [noteShift[0]-startOffSet[0], noteShift[1]-startOffSet[1]];
    return (
      <div style={{position:'relative', width:"100%", height:"100%"}}
           ref={this.staffPageRef}
           onMouseMove={this.onMusicStaffPageMouseMove}
           onMouseUp={this.onMusicStaffPageMouseUp}>
        <div>
          <TopControls />
        </div>
        {
          dragStatus == 1 &&
          <span name={dragNoteName} style={{position:"absolute", top:dragNotePos[1]+"px", left:dragNotePos[0]+"px", fontSize:"72px"}}>
            {Symbols[dragNoteName]}
          </span>
        }
        <MusicStaffHead musicInfo={this.state.musicInfo}/>
        <div style={{height:"900px", overflowX:"hidden", overflowY:"auto"}}>
          {Array.from(Array(this.state.staffNum).keys()).map(n =>
              <MusicStaff key={n.toString()} idx={n}>
              </MusicStaff>
          )}
        </div>
      </div>);
  }
}

MusicStaffPage.propTypes = {
  notes: PropTypes.array,
  scaleHead: PropTypes.array
};

function mapStateToProps(state, ownProps){
  return state.music;
}

function mapDispatchToProps(dispatch){
  return {
    dragStatusChange: (dragInfo) => {
      dispatch(musicActions.noteDrag(dragInfo));
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(MusicStaffPage);
