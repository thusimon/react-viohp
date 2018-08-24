/**
 * Created by Lu on 8/12/2018.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import MusicStaff from './MusicStaff';
import * as Constants from './Constants';
import * as Utils from './Utils';
import TopControls from './TopControls';
import Violin from './Violin';
import Note from './Note';
import * as musicActions from '../../actions/musicActions';
import * as Symbols from './Symbols';

class MusicStaffPage extends React.Component {
  constructor(props, context){
    super(props, context);
    this.signatureTypes = Constants.SIGNATURES.map(signature =>
      ({value:signature.name, text:signature.name}));
    this.scaleTypes = Utils.getAllScaleNames();
    this.onMusicStaffPageMouseMove = this.onMusicStaffPageMouseMove.bind(this);
    this.onMusicStaffPageMouseUp = this.onMusicStaffPageMouseUp.bind(this);
    this.onMusicStaffPageMouseDown = this.onMusicStaffPageMouseDown.bind(this);
    // init state
    this.dragNoteRef = null;
    //this.dragStatus = -1;
    const signature = 'Major';
    const scale = 'C';
    const notes = [];
    const dragFlag = false;
    this.state = {signature, scale, notes, dragFlag};
    this.staffPageRef = React.createRef();
  }

  onMusicStaffPageMouseMove(event){
    //console.log(event.clientX+", " + event.clientY);
    let {dragStatus, dragNoteName, startOffSet} = this.props.dragInfo;
    if (dragStatus>-1){
      let staffPageRect = this.staffPageRef.current.getBoundingClientRect();
      let noteShift = [event.clientX-staffPageRect.x, event.clientY-staffPageRect.y];
      console.log(noteShift);
      console.log(startOffSet);
      dragStatus = 1;
      this.props.dragStatusChange({dragStatus, dragNoteName, startOffSet, noteShift});
    }
  }

  onMusicStaffPageMouseUp(event){
    this.dragStatus = -1;
    let {dragStatus, dragNoteName, startOffSet} = this.props.dragInfo;
    dragStatus = -1;
    this.props.dragStatusChange({dragStatus, dragNoteName, startOffSet});
  }

  onMusicStaffPageMouseDown(event){
    //console.log("DSDSDSD");
    //console.log(event.target);
    let dragTarget = event.target;
    //console.log(event);
    this.dragStatus = 0;
  }
  render(){
    let dragInfo = this.props.dragInfo;
    let dragOffset = dragInfo.noteShift;
    //console.log(dragOffset);
    return (
      <div style={{position:'relative'}} ref={this.staffPageRef} onMouseDown={this.onMusicStaffPageMouseDown} onMouseMove={this.onMusicStaffPageMouseMove} onMouseUp={this.onMusicStaffPageMouseUp}>
        <div style={{marginTop:'30px'}}>
          <TopControls />
        </div>
        {dragInfo.dragStatus==1 && <span name={Symbols.NOTE_QUARTER_TYPE} style={{position:"absolute", top:dragOffset[1]+"px", left:dragOffset[0]+"px", fontSize:"72px"}}>{Symbols.NOTE_QUARTER}</span>}
        <br />
        <div style={{marginTop:'30px', marginBottom: '30px'}}>
          <MusicStaff notes={this.props.notes} scaleHead={this.props.scaleHead} />
        </div>
        <div style={{textAlign:'center', width:"400px"}}>
          <span className="badge badge-info" style={{fontSize:'18px', marginBottom:"10px"}}>Your beautiful violin</span>
          <Violin />
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
