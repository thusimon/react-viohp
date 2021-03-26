/**
 * Created by Lu on 8/13/2018.
 */
import React from 'react';
import {connect} from 'react-redux';
import {SymbolType as Symbols} from '../../music-editor/types';
import {CLEF_G_SYM} from '../../music-editor/symbols/symbol-unicode'
import * as Utils from './Utils';
import Note from './Note';
import NoteKey from './NoteKey';
import * as musicActions from '../../actions/musicActions';
import {SHARPFLATIDX} from './Constants';

interface StaffProps {
  scale: string,
  signature: string,
  freqLineVal: number,
  notes: any[],
  dragInfo: any,
  fullScaleNotes: any,
  staffWidth: number,
  idx?: string,
  scaleHead: any
  addNote?: (any, string) => {}
}

class MusicStaff extends React.Component<StaffProps, StaffProps> {
  staffRef: React.RefObject<HTMLDivElement>;
  LineSpace: number;
  LineLayout: number[];
  headStart: number;
  staffStart: number;
  staffHeight: number;
  constructor(props, context){
    super(props, context);
    this.displayScaleHead = this.displayScaleHead.bind(this);
    this.displaySymsOnStaff = this.displaySymsOnStaff.bind(this);
    this.displayFreqLine = this.displayFreqLine.bind(this);
    this.generateFullStaffIndex = this.generateFullStaffIndex.bind(this);
    this.onMusicStaffMouseUp = this.onMusicStaffMouseUp.bind(this);
    this.positionNoteOnStaff = this.positionNoteOnStaff.bind(this);
    this.getSymByProperties = this.getSymByProperties.bind(this);
    this.staffRef = React.createRef();
    // class fixed constants
    this.LineSpace = 20;
    this.LineLayout = [0,0,0,1,1,1,1,0,0,0];
    this.headStart = 70;
    let staffLayout = this.generateFullStaffIndex();
    this.staffStart = staffLayout.visibleStaffIdxStart;
    this.staffHeight = this.LineLayout.length*this.LineSpace;
    let {scale, signature, freqLineVal, notes, dragInfo} = this.props;
    let fullScaleNotes = Utils.getSetOfNoteFromSignatureScale(signature, scale);
    let scaleHead = SHARPFLATIDX[signature][scale];
    this.state = {staffWidth: 0, scale, signature, freqLineVal, fullScaleNotes, notes, scaleHead, dragInfo};
  }

  static getDerivedStateFromProps(nextProps, state) {
    let {scale, signature, freqLineVal, dragInfo, notes, staffRef} = nextProps;
    let staffWidth = 1200;
    if (staffRef && staffRef.current && Number.isInteger(staffRef.current.offsetWidth)) {
      staffWidth = staffRef.current.offsetWidth;
    }
    if (scale !=state.scale || signature!=state.signature){
      let fullScaleNotes = Utils.getSetOfNoteFromSignatureScale(signature, scale);
      let scaleHead = SHARPFLATIDX[signature][scale];
      return {scale, signature, freqLineVal, fullScaleNotes,scaleHead, dragInfo, notes, staffWidth};
    } else {
      return {freqLineVal, dragInfo, notes, staffWidth};
    }
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

  positionNoteOnStaff(noteName, noteCords){
    //staff line space is 20px, only allow Y [0, 200]
    let [x, y] = noteCords;
    // calculate sfIdx
    let sfIdx = Math.floor((y+5)/10)-6;
    // find the note by signature and scale
    let noteFound = Utils.getNoteFromPosition(this.state.fullScaleNotes, sfIdx);
    if(noteFound){
      let newNote = {type:noteName, sfIdx:sfIdx, x:Math.round(x), name:noteFound.name, label:noteFound.label};
      this.props.addNote(newNote, this.props.idx);
    }
  }

  onMusicStaffMouseUp(event){
    let {dragStatus, dragNoteName, startOffSet} = this.state.dragInfo;
    if (dragStatus==1){
      //let staffRef = this.staffRef.current.getWrappedInstance();
      let staffDom = this.staffRef.current;
      // calculate the staff client rect
      let staffDomRect = staffDom.getBoundingClientRect();
      let noteCoordOnStaff = [
        event.clientX-staffDomRect.x-startOffSet[0]+Note.center[0],
        event.clientY-staffDomRect.y-startOffSet[1]+Note.center[1]
      ];
      if (noteCoordOnStaff[1]>0 && noteCoordOnStaff[1]<this.staffHeight){
        //should add the note to music staff state.notes
        this.positionNoteOnStaff(dragNoteName, noteCoordOnStaff);
      }
    }
  }

  displayScaleHead(){
    const xOffSet = this.headStart;
    const xStep = 12;
    const res = [];
    const symCenter = NoteKey.center;
    const halfSpace = this.LineSpace / 2;
    for (let i=0; i<this.state.scaleHead.length; i++){
      const curSym = this.state.scaleHead[i];
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
  getSymByProperties(rawSym, idx, width){
    let {type, name, label, sfIdx, x, mark, descriptor={}} = rawSym;
    x = Math.round(x*width);
    const halfSpace = this.LineSpace / 2;
    const symCenter = Note.center;
    let sym;
    switch (type){
      case Symbols.BAR:
      {
        sym = (<div key={"BL_"+idx} style={{position:'absolute', top: "60px", left:x+"px"}}>
          <div style={{borderLeft: "2px solid black", height:"80px"}} />
        </div>);
        break;
      }
      case Symbols.WHOLEREST:
      {
        sym = (<div key={"RW_"+idx} style={{position:'absolute', top: "63px", left:x+"px"}}>
          <span style={{fontSize:"40px"}}>{Symbols.WHOLEREST}</span>
        </div>);
        break;
      }
      case Symbols.HALFREST:
      {
        sym = (<div key={"RH_"+idx} style={{position:'absolute', top: "75px", left:x+"px"}}>
          <span style={{fontSize:"40px"}}>{Symbols.HALFREST}</span>
        </div>);
        break;
      }
      case Symbols.QUARTERREST:
      {
        sym = (<div key={"RQ_"+idx} style={{position:'absolute', top: "75px", left:x+"px"}}>
          <span style={{fontSize:"40px"}}>{Symbols.QUARTERREST}</span>
        </div>);
        break;
      }
      case Symbols.EIGTHREST:
      {
        sym = (<div key={"RE_"+idx} style={{position:'absolute', top: "75px", left:x+"px"}}>
          <span style={{fontSize:"40px"}}>{Symbols.EIGTHREST}</span>
        </div>);
        break;
      }
      default:
      {
        // here they are all notes by default:
        if (!type) {
          // type is not defined
          sym = null;
        } else {
          const curSymYPos = sfIdx + this.staffStart;
          const initOffset = [x,curSymYPos*halfSpace]; //[x, y]
          const adjustedOffset = [initOffset[0]-symCenter[0], initOffset[1]];
          let curNote = <Note type={type} showLabel label={label} sfIdx={sfIdx} name={name} mark={mark} descriptor={descriptor} />;
          sym = (<div key={"NT_"+idx} style={{position:'absolute', top: adjustedOffset[1]+'px', left:adjustedOffset[0]+'px'}}>
            {curNote}
            </div>);
        }
        break;
      }
    }
    return sym;
  }
  displaySymsOnStaff(){
    let curStaffNotes = this.state.notes[this.props.idx];
    const res = [];
    if (!curStaffNotes){
      return res;
    }
    for (let keyi in curStaffNotes){
      const curSym = curStaffNotes[keyi];
      let staffSym = this.getSymByProperties(curSym, keyi, this.state.staffWidth);
      res.push(staffSym);
    }
    return res;
  }

  displayFreqLine(){
    let newsfIdx = Utils.getSFIdxFromFreq(this.state.fullScaleNotes, this.state.freqLineVal);
    const freqLineSfIdx = newsfIdx + this.staffStart;
    const halfSpace = this.LineSpace / 2;
    const freqLineYPos = (freqLineSfIdx*halfSpace).toFixed(2);
    return <hr style={{position:'absolute', top: freqLineYPos+'px', left:"80px", width:"90%",border:"1px solid #0000FF", margin:"0px"}} />;
  }
  render(){
    // return table with 10 cells, 4 visible cells form five lines with a clef at left
    let staffLineKey = 0;
    let staffWholeHeight = this.LineLayout.length * this.LineSpace;
    return (
      <div ref={this.staffRef}
           className="staffLines"
           style={{height:staffWholeHeight+'px',width:"99.8%"}}
           onMouseUp={this.onMusicStaffMouseUp}>
        <div className="staffLinesContent">
          <table>
            <tbody>
              {this.LineLayout.map(line=>{
                let tdClass = line >0 ? 'show':'hide';
                staffLineKey++;
                return (<tr key={staffLineKey}><td className={tdClass}>&nbsp;</td></tr>);
              })}
            </tbody>
          </table>
          <div className="clef">{CLEF_G_SYM}</div>
          {this.displayScaleHead()}
          {this.displaySymsOnStaff()}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    freqLineVal:state.music.freqLineVal,
    signature:state.music.musicInfo.signature,
    scale:state.music.musicInfo.scale,
    notes:state.music.notes,
    dragInfo:state.music.dragInfo
  };
}
function mapDispatchToProps(dispatch) {
  return {
    dragStatusChange: (dragInfo) => {
      dispatch(musicActions.noteDrag(dragInfo));
    },
    addNote:(note, idx)=>{
      dispatch(musicActions.addNote(note,idx));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps,null,{forwardRef:true})(MusicStaff);
