/**
 * Created by Lu on 8/31/2019.
 */
import React from 'react';
import * as Syms from './Symbols';
import PropTypes from 'prop-types';
import {getNoteClassByType} from './Utils';
import Notes from './notes/Notes';

class Note extends React.Component {
  constructor(props, context){
    super(props, context);
    this.drawAugment = this.drawAugment.bind(this);
    this.drawScale = this.drawScale.bind(this);
    let {mark,name,sfIdx} = this.props;
    this.state = {mark,name,sfIdx};
    this.descriptor = this.props.descriptor || {};
    // by default center is (14, 70), but if rotate, the center would change
    this.center=[14, 70];
    this.noteClass = getNoteClassByType(this.props.type);
  }

  drawStaffline(){
    //the -1 line's sfIdx=10, the +1 line's sfIdx=-2
    //line space = 20, half line spce is 10
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
      return <div className='staffLineSeg' key={lineKey} style={{top:lineSegPos}}></div>
    })
  }
  drawAugment(){
    // find sfIdx value if it is even, meaning it lies on the staff line, the augment dot should be higher
    if (this.descriptor.augment){
      let sfIdxEven = this.props.sfIdx % 2 == 0;
      let augmentPosY = this.center[1];
      let augmentPosX = this.center[0]+14;
      if (sfIdxEven){
        augmentPosY -= 10;
      } else {
        augmentPosY -= 5;
      }
      return <div className="noteAugmentDot" style={{top:augmentPosY+"px", left:augmentPosX+"px"}}></div>
    } else {
      return null;
    }
  }
  drawScale(){
    if(this.descriptor.scale){
      let augmentPosY = this.center[1]-3;
      let augmentPosX = this.center[0]-20;
      if (this.descriptor.scale==Syms.FLAT_TYPE){
        return <div className="noteScaleLeft" style={{top:augmentPosY+"px", left:augmentPosX+"px"}}>{Syms.FLAT}</div>
      } else if(this.descriptor.scale==Syms.SHARP_TYPE)
      {
        return <div className="noteScaleLeft" style={{top:augmentPosY+"px", left:augmentPosX+"px"}}>{Syms.SHARP}</div>
      } else if(this.descriptor.scale==Syms.NATURAL_TYPE){
        return <div className="noteScaleLeft" style={{top:augmentPosY+"px", left:augmentPosX+"px"}}>{Syms.NATURAL}</div>
      } else {
        return null;
      }
    } else{
      return null;
    }
  }
  render(){
    const Note = Notes[this.noteClass]
    this.center = Note.center;
    return (
      <div className="note" style={{top: -this.center[1]+'px'}}>
        <Note mark={this.props.mark} name={this.props.name} sfIdx={this.props.sfIdx} />
        {this.drawStaffline()}
        {this.drawAugment()}
        {this.drawScale()}
        {this.props.showLabel && <span className="noteLabel">{this.props.label}</span>}
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
  //this will define a bunch of properties, such as
  // 1. whether rotate
  // 2. flat or shart, on the note left side
  // 3. whether extend, on the note right side
  // 4. wheter show the staff segment line
  descriptors:PropTypes.object 
};

Note.center = [14, 70];
// hard code the certer point, maybe an issue on other browsers
Note.defaultProps  = {
  name:Syms.NOTE_QUARTER_TYPE,
  code:'\ud834\udd5f',
  showLabel: false,
  primary: true,
  label: 'C'
};

export default Note;
