/**
 * Created by Lu on 8/12/2018.
 */
import React from 'react';
import * as Syms from './Symbols';
import PropTypes from 'prop-types';

class Note extends React.Component {
  constructor(props, context){
    super(props, context);
    this.noteClick = this.noteClick.bind(this);
    this.drawAugment = this.drawAugment.bind(this);
    this.drawScale = this.drawScale.bind(this);
    let {mark,name,sfIdx} = this.props;
    this.state = {mark,name,sfIdx};
    this.descriptor = this.props.descriptor || {};
    // by default center is (14, 70), but if rotate, the center would change
    this.center=[14, 70];
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
        console.log("not even", this.props.sfIdx);
        augmentPosY -= 10;
      } else {
        augmentPosY -= 5;
      }
      return <div className="noteAugmentDot" style={{top:augmentPosY+"px", left:augmentPosX+"px"}}>{Syms.AUGMENTDOT}</div>
    } else {
      return null;
    }
  }
  drawScale(){

  }
  render(){
    let noteSpanClass = this.state.mark ? "noteSelected" : "";
    return (
      <div className="note">
        <span onClick={this.noteClick} name={this.props.name} className={noteSpanClass}>{this.props.code}</span>
        {this.drawStaffline()}
        {this.drawAugment()}
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
  onNoteClicked: PropTypes.func,
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
  label: 'C',
  onNoteClicked: null
};

export default Note;
