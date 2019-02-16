/**
 * Created by Lu on 8/12/2018.
 */
import React from 'react';
import * as Syms from './Symbols';
import PropTypes from 'prop-types';
import {getSvgClassName} from "./Utils";
import Note from './Note';

class NoteFlip extends Note {
  constructor(props, context){
    super(props, context);
    this.noteClick = this.noteClick.bind(this);
    this.center=[0, 55];
  }

  noteClick(event){
    let {mark,name,sfIdx} = this.state;
    mark = !mark;
    this.setState({mark});
    if (this.props.onNoteClicked) {
      this.props.onNoteClicked({mark, name, sfIdx});
    }
  }

  drawStaffline(){
    //the -1 line's sfIdx=10, the +1 line's sfIdx=-2
    //line space = 20, half line spce is 10
    const noteMarkClass = this.state.mark ? "noteSelected" : "";
    let staffLineOffset = [];
    let cursfIdx = this.state.sfIdx;
    let staffLineIdx = 0;
    if (cursfIdx>=10){
      staffLineIdx = 10 - cursfIdx;
      while(staffLineIdx<=0){
        staffLineOffset.push(staffLineIdx);
        staffLineIdx+=2;
      }
    } else if (cursfIdx<=-2){
      staffLineIdx = -2 - cursfIdx;
      while(staffLineIdx>=0){
        staffLineOffset.push(staffLineIdx);
        staffLineIdx-=2;
      }
    } else {
      //do nothing
    }
    // now staffLineOffset contains the segment of the staff line
    // like [0,2,4] or [-1, -3], meaning the offset from the Note center
    // 0 meaning the segment will accross the note center
    // 2 meaning the segment will be 2*10 px BELOW the note center
    // -1 meaning the segment will be 1*10 px ABOVE the note center
    return staffLineOffset.map(l=>{
      let lineSegPos = this.center[1]+l*10;
      let lineKey = "staffSeg"+l;
      return <div className='staffLineSeg staffLineSegFlipNote' key={lineKey} style={{top:lineSegPos}}></div>
    })
  }
  render(){
    let flipNoteClassName = getSvgClassName(this.props.type);
    if (this.state.mark){
      flipNoteClassName += " noteSelectedBg";
    }
    return (
      <div className="note">
        <div style={{position:"absolute", width:"20px", height:"60px", top:"45px", left:"0px"}} className={flipNoteClassName} onClick={this.noteClick}></div>
        {this.drawStaffline()}
        {this.props.showLabel && <span className="filpNoteLabel">{this.props.label}</span>}
      </div>
    );
  }
}

Note.propTypes = {
  code: PropTypes.string.isRequired,
  showLabel: PropTypes.bool,
  label: PropTypes.string,
  primary: PropTypes.bool,
  mark: PropTypes.bool,
  name: PropTypes.string,
  sfIdx: PropTypes.number,
  onNoteClicked: PropTypes.func,
  //this will define a bunch of properties, such as
  // 1. whether rotate
  // 2. flat or shart, on the note left side
  // 3. whether extend, on the note right side
  // 4. wheter show the staff segment line
  descriptors:PropTypes.object 
};

NoteFlip.center = [14, 70];
// hard code the certer point, maybe an issue on other browsers
NoteFlip.defaultProps  = {
  name:Syms.NOTE_QUARTER_TYPE,
  code:'\ud834\udd5f',
  showLabel: false,
  primary: true,
  label: 'C',
  onNoteClicked: null
};

export default NoteFlip;
