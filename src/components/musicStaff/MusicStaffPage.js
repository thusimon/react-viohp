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
import Violin from './Violin';
import AudioAnalyzer from '../audio/AudioAnalyzer';
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
    this.positionNoteOnStaff = this.positionNoteOnStaff.bind(this);
    //hard code music staff height as 280px
    this.staffHeight = 280;
    // init state
    this.state = {
      signature:this.props.signature,
      scale:this.props.scale,
      scaleHead:this.props.scaleHead,
      notes:this.props.notes,
      dragInfo:this.props.dragInfo
    };
    this.staffPageRef = React.createRef();
    this.staffRef = React.createRef();
  }

  componentWillReceiveProps(nextProps){
    let {signature, scale, scaleHead, notes, dragInfo} = nextProps;
    this.setState({signature, scale, scaleHead, notes, dragInfo});
  }

  positionNoteOnStaff(noteName, noteCords){
    let shiftNoise = 5;
    //staff line space is 20px, only allow Y [40-5, 240+5] = [35,245]
    let [x, y] = noteCords;
    if(y<35 || y>245){
      return;
    }
    // calculate sfIdx
    let sfIdx = Math.floor((y-35)/10)-6;
    // find the note by signature and scale
    console.log(this.state);
    console.log(this.props);
    let noteFound = Utils.getNoteFromPosition(this.state.signature, this.state.scale, sfIdx);
    let newNote = {type:noteName, sfIdx:sfIdx, xCord:Math.round(x), name:noteFound.name, label:noteFound.label};

    this.props.addNote(newNote);
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
    let staffRef = this.staffRef.current.getWrappedInstance();
    let staffDom = staffRef.staffRef.current;
    // calculate the staff client rect
    let staffDomRect = staffDom.getBoundingClientRect();
    let noteCoordOnStaff = [event.clientX-staffDomRect.x-startOffSet[0]+Note.center[0],
      event.clientY-staffDomRect.y-startOffSet[1]+Note.center[1]
    ];
    if (dragStatus ==1 && noteCoordOnStaff[1]>0 && noteCoordOnStaff[1]<this.staffHeight){
      console.log("note dropped");
      this.positionNoteOnStaff(dragNoteName, noteCoordOnStaff);

    }
    dragStatus = -1;
    this.props.dragStatusChange({dragStatus, dragNoteName, startOffSet:[0,0],noteShift:[0,0]});
  }

  render(){
    let {dragStatus, dragNoteName, startOffSet, noteShift} = this.state.dragInfo;
    let dragNotePos = [noteShift[0]-startOffSet[0], noteShift[1]-startOffSet[1]];
    return (
      <div style={{position:'relative'}} ref={this.staffPageRef} onMouseMove={this.onMusicStaffPageMouseMove} onMouseUp={this.onMusicStaffPageMouseUp}>
        <div style={{marginTop:'30px'}}>
          <TopControls />
        </div>
        {
          dragStatus == 1 &&
          <span name={dragNoteName} style={{position:"absolute", top:dragNotePos[1]+"px", left:dragNotePos[0]+"px", fontSize:"72px"}}>
            {Symbols[dragNoteName]}
          </span>
        }
        <br />
        <div style={{marginTop:'30px', marginBottom: '30px'}}>
          <MusicStaff ref={this.staffRef} notes={this.state.notes} scaleHead={this.state.scaleHead} name="MusicStaff"/>
        </div>
        <div style={{display:"flex", flexDirection: "row"}}>
          <div style={{textAlign:'center', width:"400px", flex:"auto"}}>
            <span className="badge badge-info" style={{fontSize:'18px', marginBottom:"10px"}}>Your beautiful violin</span>
            <Violin />
          </div>
          <div style={{textAlign:'center', flex:"auto"}}>
            <span className="badge badge-info" style={{fontSize:'18px', marginBottom:"10px"}}>Audio Analyse</span>
            <div>
              <AudioAnalyzer />
            </div>
          </div>
        </div>
      </div>);
  }
}

MusicStaffPage.propTypes = {
  notes: PropTypes.object,
  scaleHead: PropTypes.array
};

function mapStateToProps(state, ownProps){
  return state.music;
}

function mapDispatchToProps(dispatch){
  return {
    dragStatusChange: (dragInfo) => {
      dispatch(musicActions.noteDrag(dragInfo));
    },
    addNote:(note)=>{
      dispatch(musicActions.addNote(note));
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(MusicStaffPage);
