/**
 * Created by Lu on 8/12/2018.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import MusicStaff from './MusicStaff';
import MusicStaffPlayerArrow from './MusicStaffPlayerArrow';
import MusicStaffPlayerVolume from './MusicStaffPlayerVolume';
import * as Constants from './Constants';
import * as Utils from './Utils';
import * as musicActions from '../../actions/musicActions';
import MusicStaffHead from './MusicStaffHead';
import AudioOscillator from '../audio/AudioOscillator';

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
      scoreId:this.props.scoreId
    };
    this.staffPageRef = React.createRef();
    this.staffRef = React.createRef();
    this.audioOscillator = new AudioOscillator();
  }

  static getDerivedStateFromProps(nextProps, state){
    let {signature, scale, dragInfo, notes, musicInfo, scoreId} = nextProps;
    let staffNum = notes.length;
    if (signature != state.signature || scale != state.scale){
      // need to update the scaleHead
      return {signature, scale, dragInfo, staffNum, musicInfo, scoreId};
    } else {
      // signature and scale is not changed
      return {dragInfo, staffNum, musicInfo, scoreId};
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

  onMusicStaffPageMouseUp(){
    let {dragStatus, dragNoteName} = this.state.dragInfo;
    dragStatus = -1;
    this.props.dragStatusChange({dragStatus, dragNoteName, startOffSet:[0,0],noteShift:[0,0]});
  }

  render(){
    this.noteIter = Utils.getNextNoteInfo(this.props.notes);
    return (
      <div style={{position:'relative', width:"100%", height:"100%"}}
           ref={this.staffPageRef}
           onMouseMove={this.onMusicStaffPageMouseMove}
           onMouseUp={this.onMusicStaffPageMouseUp}>
        <MusicStaffHead musicInfo={this.state.musicInfo}/>
        <div style={{height:"1000px", width: Constants.STAFF_WIDTH+'px', overflowX:"auto", overflowY:"auto", position:"relative", borderTop:"1px solid black"}} ref={this.staffRef}>
          <MusicStaffPlayerArrow noteIter={this.noteIter} staffRef = {this.staffRef} audioOscillator = {this.audioOscillator}/>
          <MusicStaffPlayerVolume audioOscillator = {this.audioOscillator} />
          {Array.from(Array(this.state.staffNum).keys()).map(n =>
              <MusicStaff key={n.toString()} idx={n} />
          )}
        </div>
      </div>);
  }
}

MusicStaffPage.propTypes = {
  notes: PropTypes.array,
  scaleHead: PropTypes.array,
  signature: PropTypes.string,
  scale: PropTypes.string,
  dragInfo: PropTypes.object,
  musicInfo: PropTypes.object,
  scoreId: PropTypes.string,
  dragStatusChange: PropTypes.func
};

function mapStateToProps(state){
  return state.music;
}

function mapDispatchToProps(dispatch){
  return {
    dragStatusChange: (dragInfo) => {
      dispatch(musicActions.noteDrag(dragInfo));
    }
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(MusicStaffPage);
