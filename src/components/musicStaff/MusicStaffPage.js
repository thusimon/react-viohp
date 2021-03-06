/**
 * Created by Lu on 8/12/2018.
 */
import React from 'react';
import {connect} from 'react-redux';
import * as Constants from './Constants';
import * as Utils from './Utils';
import * as musicActions from '../../actions/musicActions';
import MusicStaffHead from './MusicStaffHead';
import './music-staff-page.scss';
import {Staff} from '../../music-editor/staff/staff'
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
      scoreInfo:this.props.scoreInfo,
      scoreId:this.props.scoreId
    };
    this.staffPageRef = React.createRef();
    this.staffRef = React.createRef();
  }

  static getDerivedStateFromProps(nextProps, state){
    let {signature, scale, dragInfo, notes, scoreInfo, scoreId} = nextProps;
    let staffNum = notes.length;
    if (signature != state.signature || scale != state.scale){
      // need to update the scaleHead
      return {signature, scale, dragInfo, staffNum, scoreInfo, scoreId};
    } else {
      // signature and scale is not changed
      return {dragInfo, staffNum, scoreInfo, scoreId};
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
    return (
      <div className='music-staff-page'
           ref={this.staffPageRef}
           onMouseMove={this.onMusicStaffPageMouseMove}
           onMouseUp={this.onMusicStaffPageMouseUp}>
        <MusicStaffHead scoreInfo={this.state.scoreInfo}/>
        <div className='music-staff-section' ref={this.staffRef}>
          <Staff sectionRef={this.staffRef} />
        </div>
      </div>);
  }
}

function mapStateToProps(state){
  return state.score;
}

function mapDispatchToProps(dispatch){
  return {
    dragStatusChange: (dragInfo) => {
      dispatch(musicActions.noteDrag(dragInfo));
    }
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(MusicStaffPage);
